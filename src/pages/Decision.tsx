import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./Decision.scss";

const Decision: React.FC<{}> = () => {
  const message = "{{ dp.message }}";
  return (
    <div className="container">
      <div className="left controls">
        <a href="" className="button menu" ng-click="replayVideo();">
          <FormattedMessage
            id="General.replay"
            defaultMessage="Replay"
            description="Replay Video Button"
          />
        </a>
      </div>
      <div className="right controls">
        <a href="" className="button menu" ng-click="gotoMenu();">
          <FormattedMessage
            id="General.menu"
            defaultMessage="Menu"
            description="Go To Menu Button"
          />
        </a>
      </div>
      <div className="question" tabIndex={0}>
        <div className="vertical_outer">
          <div className="vertical_inner">{message}</div>
        </div>
      </div>
      <ul className="option_box cf">
        <li className="option" ng-repeat="opt in randomizedOptions">
          <button
            ng-click="chooseOption(opt.next)"
            ng-bind-html="opt.label"
          ></button>
        </li>
      </ul>
    </div>
  );
};

export default Decision;
