import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./Objectives.scss";

const Objectives: React.FC<{}> = () => {
  return (
    <div className="container">
      <div className="panel info">
        <header>
          <h1>
            <Link to="/" aria-label="Return to menu">
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
            <FormattedMessage
              id="objectives.paragraph"
              defaultMessage="The game promotes the application of knowledge and skills related to the assessment of a prenatal woman."
              description="Game objectives intro paragraph"
              tagName="p"
            />

            <FormattedMessage
              id="objectives.paragraph2"
              defaultMessage="The learning objectives of this simulation game are to: "
              description="Game objectives second paragraph"
              tagName="p"
            />
            <ul>
              <li>
                Apply knowledge of physical and psychosocial prenatal nursing
                assessment.
              </li>
              <li>
                Identify normal findings, abnormal variations and potential
                complications during a prenatal visit.
              </li>
              <li>
                Demonstrate therapeutic interventions when caring for a pregnant
                woman.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Objectives;
