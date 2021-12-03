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
                <Link to="./games/post_partum">
                  <FormattedMessage
                    id="Home.postPartum_fr"
                    defaultMessage="Post Partum FR"
                    description="Post Partum Francais game name"
                  />
                </Link>
              </li>
              <li>
                <Link to="./games/labor_delivery">
                  <FormattedMessage
                    id="Home.labor_delivery_fr"
                    defaultMessage="Labor and Delivery FR"
                    description="Labor and Delivery Francais game name"
                  />
                </Link>
              </li>
              <li>
                <Link to="./games/teen_pregnancy">
                  <FormattedMessage
                    id="Home.teen_pregnancy_fr"
                    defaultMessage="Teen Pregnancy FR"
                    description="Teen Pregnancy Francais game name"
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
