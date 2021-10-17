import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./Menu.scss";

interface iProps {
  startNewGame: () => void;
  resumeGame: () => void;
  gamesaved: boolean;
  strings: {
    title: string;
  };
}

const Menu: React.FC<iProps> = ({
  startNewGame,
  resumeGame,
  gamesaved,
  strings,
}) => {
  return (
    <div className="container">
      <div className="panel menu">
        <header>
          <h1>{strings.title}</h1>
        </header>
        <div className="main">
          <div className="content">
            <ul className="controls">
              <li>
                <button className="Link" onClick={startNewGame}>
                  <FormattedMessage
                    id="Menu.newGame"
                    defaultMessage="New Game"
                    description="New Game Button"
                  />
                </button>
              </li>
              <li>
                <button
                  className={`Link ${gamesaved ? "active" : "disabled"}`}
                  onClick={resumeGame}
                >
                  <FormattedMessage
                    id="Menu.resumeGame"
                    defaultMessage="Resume Game"
                    description="Resume Game Button"
                  />
                </button>
              </li>
              <li>
                <Link to="/objectives/">
                  <FormattedMessage
                    id="Menu.objectives"
                    defaultMessage="Learning Objectives"
                    description="Objectives Button"
                  />
                </Link>
              </li>
              <li>
                <Link to="/settings/">
                  <FormattedMessage
                    id="Menu.gameOptions"
                    defaultMessage="Game Options"
                    description="Options Button"
                  />
                </Link>
              </li>
              <li>
                <Link to="/instructions/">
                  <FormattedMessage
                    id="Menu.instructions"
                    defaultMessage="How to Play"
                    description="How to Play Button"
                  />
                </Link>
              </li>
              <li>
                <Link to="/materials/">
                  <FormattedMessage
                    id="Menu.materials"
                    defaultMessage="Self-Assessment"
                    description="Link to self-assessment materials"
                  />
                </Link>
              </li>
              <li>
                <Link to="/credits/">
                  <FormattedMessage
                    id="Menu.credits"
                    defaultMessage="Credits"
                    description="Credits Button"
                  />
                </Link>
              </li>
              <li>
                <Link to="../">
                  <FormattedMessage
                    id="Menu.exit"
                    defaultMessage="Exit Game"
                    description="Exit Game Button"
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

export default Menu;
