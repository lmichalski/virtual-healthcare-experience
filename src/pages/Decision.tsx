import { useCallback, useContext, useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useHistory } from "react-router-dom";
import RootScopeContext from "../controllers/RootScopeContext";
import { useGotoMenu } from "../util";
import "./Decision.scss";

const Decision: React.FC<{}> = () => {
  const history = useHistory();

  const rootScope = useContext(RootScopeContext);
  const gotoMenu = useGotoMenu();

  const message = "{{ dp.message }}";

  const dp = rootScope.dataProvider.find(
    ({ id }) => id == rootScope.sg.current
  )!;

  rootScope.logGameEvent("", "show", "question", dp.message, "");

  const [randomizedOptions] = useState(dp.options); // TODO shuffle these

  const optionBoxes = useMemo(() => {
    return randomizedOptions.map((opt) => {
      const chooseOption = function () {
        const next = rootScope.dataProvider.find(({ id }) => id === opt.next);

        rootScope.sg.progress.push({
          id: rootScope.sg.current,
          label: opt.label,
          option: opt.next,
        });
        rootScope.sg.current = opt.next;
        rootScope.saveState();

        rootScope.logGameEvent(
          "",
          "select",
          "answer",
          opt.label,
          next?.correct ? "correct" : "incorrect"
        );

        switch (next?.type) {
          case "video":
            history.push("/video/");
            break;
          case "lo":
            if (next.feedback > "") {
              history.push("/feedback/");
            } else {
              history.push("/lo/");
            }
            break;
        }

        // google analytics ???
      };

      return (
        <li key={opt.label} className="option" ng-repeat="opt in randomizedOptions">
          <button onClick={chooseOption}>{opt.label}</button>
        </li>
      );
    });
  }, []);

  const replayVideo = useCallback(() => {
    /*gtag('event', 'video_replayed', {
      'event_category': 'video',
      'event_label': $scope.dp.data,
      'value': $scope.dp.id
    });*/
    rootScope.logGameEvent("", "replay", "video", dp.data, dp.id);
    history.push("/video/");
  }, []);

  return (
    <div className="container">
      <div className="left controls">
        <a href="" className="button menu" onClick={replayVideo}>
          <FormattedMessage
            id="General.replay"
            defaultMessage="Replay"
            description="Replay Video Button"
          />
        </a>
      </div>
      <div className="right controls">
        <a href="" className="button menu" onClick={gotoMenu}>
          <FormattedMessage
            id="General.menu"
            defaultMessage="Menu"
            description="Go To Menu Button"
          />
        </a>
      </div>
      <div className="question" tabIndex={0}>
        <div className="vertical_outer">
          <div className="vertical_inner">{dp?.message}</div>
        </div>
      </div>
      <ul className="option_box cf">{optionBoxes}</ul>
    </div>
  );
};

export default Decision;
