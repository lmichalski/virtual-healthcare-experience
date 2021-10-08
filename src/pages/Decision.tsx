import { useCallback, useContext, useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import RootScopeContext from "../controllers/RootScopeContext";
import useLogGameEvent from "../hooks/useLogGameEvent";
import { useGotoMenu } from "../util";
import "./Decision.scss";

const Decision: React.FC<{}> = () => {
  const history = useHistory();

  const rootScope = useContext(RootScopeContext);
  const logGameEvent = useLogGameEvent();
  const gotoMenu = useGotoMenu();

  const dp = rootScope.dataProvider.find(
    ({ id }) => id === rootScope.sg.current
  )!;

  logGameEvent("", "show", "question", dp.message, "");

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

        logGameEvent(
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
        <li
          key={opt.label}
          className="option"
          ng-repeat="opt in randomizedOptions"
        >
          <button onClick={chooseOption}>{opt.label}</button>
        </li>
      );
    });
  }, [history, randomizedOptions, rootScope, logGameEvent]);

  const replayVideo = useCallback(() => {
    /*gtag('event', 'video_replayed', {
      'event_category': 'video',
      'event_label': $scope.dp.data,
      'value': $scope.dp.id
    });*/
    logGameEvent("", "replay", "video", dp.data, dp.id);
    history.push("/video/");
  }, [dp.data, dp.id, history, logGameEvent]);

  return (
    <div className="container">
      <div className="left controls">
        <button className="button button--menu" onClick={replayVideo}>
          <FormattedMessage
            id="General.replay"
            defaultMessage="Replay"
            description="Replay Video Button"
          />
        </button>
      </div>
      <div className="right controls">
        <button className="button button--menu" onClick={gotoMenu}>
          <FormattedMessage
            id="General.menu"
            defaultMessage="Menu"
            description="Go To Menu Button"
          />
        </button>
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
