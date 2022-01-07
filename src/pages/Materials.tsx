import { FormattedMessage } from "react-intl";
import { useGotoMenu } from "../util";
import "./Materials.scss";

interface iProps {
  strings: {
    template: string;
    example: string;
    debrief: string;
  };
}

const Materials: React.FC<iProps> = ({ strings }) => {
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

        <div className="right controls">
          <button className="button button--menu" onClick={gotoMenu}>
            <FormattedMessage
              id="General.menu"
              defaultMessage="Menu"
              description="Go To Menu Button"
            />
          </button>
        </div>

        <footer>
          <div className="content">
            <FormattedMessage
              id="Materials.documentation"
              defaultMessage="Documentation"
              description="documentation title"
              tagName="h2"
            />
            <a href={strings.template} className="button" download>
              <FormattedMessage
                id="Materials.downloadTemplate"
                defaultMessage="Download Template"
                description="template download link"
              />
            </a>
            <a href={strings.example} className="button" download>
              <FormattedMessage
                id="Materials.downloadSample"
                defaultMessage="Download Sample"
                description="sample download link"
              />
            </a>
            <br />
            <FormattedMessage
              id="Materials.debrief"
              defaultMessage="Self-Debrief"
              description="self-debrief title"
              tagName="h2"
            />
            <a href={strings.debrief} className="button" download>
              <FormattedMessage
                id="Materials.downloadDebrief"
                defaultMessage="Download"
                description="debrief download link"
              />
            </a>
          </div>
        </footer>
      </div>
    </body>
  );
};

export default Materials;
