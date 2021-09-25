import { FormattedMessage } from "react-intl";
import "./Menu.scss";

const Menu: React.FC<{}> = () => {
  return (
    <div className="container">
      <div className="panel menu">
        <header>
          <FormattedMessage
            id="Main.title"
            defaultMessage="Emergency Room Care"
            description="Menu page title"
            tagName="h1"
          />
        </header>
        <div className="main">
          <div className="content">
            <ul className="controls">
              <li>
                <a href="javascript:void(0)" ng-click="startNewGame()">
                  <FormattedMessage
                    id="Menu.newGame"
                    defaultMessage="New Game"
                    description="New Game Button"
                  />
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  ng-class="sg.gamesaved ? 'active' : 'disabled'"
                  ng-click="resumeGame()"
                >
                  <FormattedMessage
                    id="Menu.resumeGame"
                    defaultMessage="Resume Game"
                    description="Resume Game Button"
                  />
                </a>
              </li>
              <li>
                <a href="#/objectives/">
                  <FormattedMessage
                    id="Menu.objectives"
                    defaultMessage="Learning Objectives"
                    description="Objectives Button"
                  />
                </a>
              </li>
              <li>
                <a href="#/settings/">
                  <FormattedMessage
                    id="Menu.gameOptions"
                    defaultMessage="Game Options"
                    description="Options Button"
                  />
                </a>
              </li>
              <li>
                <a href="#/instructions/">
                  <FormattedMessage
                    id="Menu.instructions"
                    defaultMessage="How to Play"
                    description="How to Play Button"
                  />
                </a>
              </li>
              <li>
                <a href="#/credits/">
                  <FormattedMessage
                    id="Menu.credits"
                    defaultMessage="Credits"
                    description="Credits Button"
                  />
                </a>
              </li>
              <li>
                <a href="../">
                  <FormattedMessage
                    id="Menu.exit"
                    defaultMessage="Exit Game"
                    description="Exit Game Button"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
