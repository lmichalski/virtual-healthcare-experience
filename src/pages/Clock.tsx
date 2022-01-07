import { useCallback, useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import { DecisionPoint } from "../hooks/useGameData";
import useLogGameEvent from "../hooks/useLogGameEvent";
import { shuffleArray, useGotoMenu } from "../util";
import "./Decision.scss";

interface iProps {
  decisionPoint: DecisionPoint;
  onOptionChosen: (option: number, label: string) => void;
}

const Clock: React.FC<iProps> = ({ decisionPoint, onOptionChosen }) => {
  const history = useHistory();
  const { game_id } = useParams<{ game_id: string }>();

  const logGameEvent = useLogGameEvent();
  const gotoMenu = useGotoMenu();

  const dp = decisionPoint;

  logGameEvent("", "show", "question", dp.message, "");

  const [randomizedOptions] = useState(shuffleArray(dp.options)); // TODO shuffle these

  const optionBoxes = useMemo(() => {
    return randomizedOptions.map((opt) => {
      const chooseOption = () => onOptionChosen(opt.next, opt.label);

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
  }, [randomizedOptions, onOptionChosen]);

  const replayVideo = useCallback(() => {
    /*gtag('event', 'video_replayed', {
      'event_category': 'video',
      'event_label': $scope.dp.data,
      'value': $scope.dp.id
    });*/
    logGameEvent("", "replay", "video", dp.data, dp.id);
    history.push(`/games/${game_id}/video`);
  }, [dp.data, dp.id, history, logGameEvent, game_id]);

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

export default Clock;
