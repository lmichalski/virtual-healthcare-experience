import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./Objectives.scss";

interface iProps {
  strings: {
    paragraph1: string;
    paragraph2: string;
    bullet_list: string[];
  };
}

const Objectives: React.FC<iProps> = ({ strings }) => {
  return (
    <div className="container">
      <div className="panel info">
        <header>
          <h1>
            <Link to="../" aria-label="Return to menu">
              <span className="icon-arrow-left"></span>
            </Link>
            <FormattedMessage
              id="Objectives.title"
              defaultMessage="Learning Objectives"
              description="Learning Objectives title"
            />
          </h1>
        </header>
        <div className="main">
          <div className="content cf">
            <p>{strings.paragraph1}</p>
            <p>{strings.paragraph2}</p>
            <ul>
              {strings.bullet_list.map((list_item) => (
                <li>{list_item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Objectives;
