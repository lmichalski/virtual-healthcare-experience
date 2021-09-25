import { FormattedMessage } from "react-intl";
import "./Transition.scss";

const Transition: React.FC<{}> = () => {
  return (
    <div className="container">
      <div className="panel feedback">
        <header>
          <FormattedMessage
            id="Transition.title"
            defaultMessage="Game Paused"
            description="game paused transition title"
            tagName="h1"
          />
        </header>
        <div className="main" ng-bind-html="dp.feedback"></div>
        <footer>
          <p className="controls">
            <a href="javascript:void(0)" ng-click="playNextVideo()">
              Resume Game
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Transition;
