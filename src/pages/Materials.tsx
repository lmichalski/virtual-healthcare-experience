import { FormattedMessage } from "react-intl";
import { useGotoMenu } from "../util";
import "./Materials.scss";

interface iProps {
  strings: {
    content: {
      label: string;
      item: string;
    }[];
  };
}

const Materials: React.FC<iProps> = ({ strings: { content } }) => {
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
            {content.map(({ label, item }) => (
              <>
                <ul>
                  <a href={item} className="button" download>
                    {label}
                  </a>
                </ul>
              </>
            ))}
          </div>
        </footer>

      </div>
    </body>
  );
};

export default Materials;
