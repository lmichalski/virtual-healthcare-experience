import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./Intro.scss";

const Intro: React.FC<{}> = () => {
  const label = "{{ label }}";
  return (
    <div className="container">
      <div className="panel intro">
        <div className="main">
          <div className="content" ng-bind-html="text"></div>
        </div>
        <footer>
          <p className="controls">
            <a href="" className="button" ng-click="skipToNext()">
              {label}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Intro;
