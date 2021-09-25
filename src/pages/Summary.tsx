import { FormattedMessage } from "react-intl";
import "./Summary.scss";

const Summary: React.FC<{}> = () => {
  return (
    <div className="container">
      <div className="right controls">
        <a href="" className="button menu" ng-click="gotoMenu();">
          Menu
        </a>
      </div>
      <div className="panel info">
        <header>
          <FormattedMessage
            id="Summary.title"
            defaultMessage="Congratulations!"
            description="Summary title"
            tagName="h1"
          />
        </header>
        <div className="main summary">
          <div className="content">
            <div ng-bind-html="message"></div>
            <h2>Your Answers:</h2>
            <ol className="responses">
              <li ng-repeat="dp in progress">
                {/* <div>{{ dp.question }}</div>
						<div ng-className="dp.correct ? 'correct' : 'wrong'">
							<strong>{{ dp.answer }} ({{ dp.correct ? 'Correct' : 'Incorrect' }})</strong>
						</div> */}
              </li>
            </ol>
          </div>
        </div>
        <footer>
          <a className="button" ng-click="downloadPDF()" target="_blank">
            Download Progress Report (PDF)
          </a>
          <a href="/module/_/ui/game/tpl/materials.html" className="button">
            {" "}
            Practice Documentation{" "}
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Summary;
