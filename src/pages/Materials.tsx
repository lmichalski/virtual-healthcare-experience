import { FormattedMessage } from "react-intl";
import { useGotoMenu } from "../util";
import "./Materials.scss";

const Materials: React.FC<{}> = () => {
  const gotoMenu = useGotoMenu();

  return (
    <body className="documentation-container">
      <div className="panel feedback">
        <header>
          <FormattedMessage
            id="Materials.title"
            defaultMessage="Materials"
            description="Materials title"
            tagName="h1"
          />
        </header>
        <footer>
          <div className="content">
            <h2>Documentation</h2>
            <a
              href="/docs/Integrated_Patient_Record.pdf"
              className="button"
              download
            >
              Download Template
            </a>
            <a
              href="/docs/Integrated_Patient_Record_Sample.pdf"
              className="button"
              download
            >
              Download Sample
            </a>
            <br />
            <h2>Self-Debrief</h2>
            <a href="/docs/self-assessment.pdf" className="button" download>
              Download
            </a>
          </div>
        </footer>
      </div>
    </body>
  );
};

export default Materials;
