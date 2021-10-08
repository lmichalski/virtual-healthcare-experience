import { useContext, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useHistory } from "react-router-dom";
import RootScopeContext from "../controllers/RootScopeContext";
import useLogGameEvent from "../hooks/useLogGameEvent";
import { getBrowser } from "../util";
import "./Menu.scss";

const Menu: React.FC<{}> = () => {
  const history = useHistory();

  const rootScope = useContext(RootScopeContext);
  const logGameEvent = useLogGameEvent();

  const startNewGame = useCallback(() => {
    rootScope.sg.gamesaved = false;
    rootScope.sg.current = 0;
    rootScope.sg.completed = false;
    rootScope.sg.videoposition = 0;
    rootScope.sg.progress = [];

    history.push("/intro/");
    rootScope.saveState();

    logGameEvent("", "start", "game", getBrowser(), "");
  }, [rootScope, history, logGameEvent]);

  const resumeGame = useCallback(() => {
    var dp = rootScope.dataProvider.find(
      ({ id }) => id === rootScope.sg.current
    );

    if (
      dp &&
      rootScope.dataProvider.indexOf(dp) === rootScope.dataProvider.length - 1
    ) {
      history.push("/summary/");
    } else if (rootScope.sg.videoposition > 0.1) {
      history.push("/video/");
    } else {
      history.push("/decision/");
    }

    logGameEvent("", "resume", "game", "", "");
    rootScope.sg.progress = [];
  }, [history, logGameEvent, rootScope]);

  return (
    <div className="container">
      <div className="panel menu">
        <header>
          <FormattedMessage
            id="Main.title"
            defaultMessage="ER Virtual Simulation Game"
            description="Menu page title"
            tagName="h1"
          />
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
                  className={`Link ${
                    rootScope.sg.gamesaved ? "active" : "disabled"
                  }`}
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
