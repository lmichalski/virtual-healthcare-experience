import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./Menu.scss";

interface iProps {}

const Home: React.FC<iProps> = () => {
  return (
    <div className="container">
      <div className="panel menu">
        <header>
          <FormattedMessage
            id="Home.title"
            defaultMessage="Virtual Healthcare Experence"
            description="Title for homepage"
            tagName="h1"
          />
        </header>
        <div className="main">
          <div className="content">
            <ul className="controls">
              <li>
                <Link to="/games/emergency">
                  <FormattedMessage
                    id="Home.emergency"
                    defaultMessage="Emergency Room"
                    description="Name for emergency game"
                  />
                </Link>
              </li>
              <li>
                <Link to="./games/crisis_intervention">
                  <FormattedMessage
                    id="Home.crisisIntervention"
                    defaultMessage="Crisis Intervention"
                    description="Crisis intervention game name"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
