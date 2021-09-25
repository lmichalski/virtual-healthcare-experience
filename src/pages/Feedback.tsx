import { FormattedMessage } from "react-intl";
import "./Feedback.scss";

const Feedback: React.FC<{}> = () => {
  return (
    <div className="container">
      <div className="panel feedback" role="alert">
        <header>
          <FormattedMessage
            id="Feedback.title"
            defaultMessage="Feedback"
            description="feedback title"
            tagName="h1"
          />
        </header>
        <div className="main" ng-bind-html="dp.feedback"></div>
        <footer>
          <p className="controls">
            <a href="javascript:void(0)" className="button" ng-click="goNext()">
              <FormattedMessage
                id="General.resume"
                defaultMessage="Resume Game"
                description="resume game button"
              />
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Feedback;
