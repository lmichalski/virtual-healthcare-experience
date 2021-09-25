import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./Materials.scss";

const Materials: React.FC<{}> = () => {
  return (
    <body className="documentation-container" ng-controller="mainCtrl">
      <div className="panel feedback" role="alert">
        <header>
          <FormattedMessage
            id="Materials.title"
            defaultMessage="Materials"
            description="Materials title"
            tagName="h1"
          />
        </header>

        <div className="right controls">
          <a href="/module/emergency/game/index.html" className="button menu">
            <FormattedMessage
              id="General.home"
              defaultMessage="Home"
              description="Home button"
            />
          </a>
        </div>

        <footer>
          <div className="content">
            <h2>Documentation</h2>
            <a
              href="/module/emergency/game/_/docs/Integrated_Patient_Record.pdf"
              className="button"
              download
            >
              Download Template
            </a>
            <a
              href="/module/emergency/game/_/docs/Integrated_Patient_Record_Sample.pdf"
              className="button"
              download
            >
              Download Sample
            </a>
            <br />
            <h2>Self-Debrief</h2>
            <a
              href="/module/emergency/game/_/docs/self-assessment.pdf"
              className="button"
              download
            >
              Download
            </a>
          </div>
        </footer>
      </div>
    </body>
  );
};

export default Materials;
