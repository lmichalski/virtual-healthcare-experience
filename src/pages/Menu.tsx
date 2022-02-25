import { FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import "./Menu.scss";

interface iProps {
  startNewGame: () => void;
  resumeGame: () => void;
  gamesaved: boolean;
  strings: {
    title: string;
  };
  pagesToShow: {
    principles: boolean;
  };
}

const Menu: React.FC<iProps> = ({
  startNewGame,
  resumeGame,
  gamesaved,
  strings,
  pagesToShow: { principles: showPrinciples },
}) => {
  const { game_id } = useParams<{ game_id: string }>();

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
                <Link to={`/games/${game_id}/objectives/`}>
                  <FormattedMessage
                    id="Menu.objectives"
                    defaultMessage="Learning Objectives"
                    description="Objectives Button"
                  />
                </Link>
              </li>
              {showPrinciples ? (
                <li>
                  <Link to={`/games/${game_id}/principles/`}>
                    <FormattedMessage
                      id="Menu.principles"
                      defaultMessage="Essential Principles"
                      description="Principles Button"
                    />
                  </Link>
                </li>
              ) : null}
              <li>
                <Link to={`/games/${game_id}/settings/`}>
                  <FormattedMessage
                    id="Menu.gameOptions"
                    defaultMessage="Settings"
                    description="Settings Button"
                  />
                </Link>
              </li>
              <li>
                <Link to={`/games/${game_id}/instructions/`}>
                  <FormattedMessage
                    id="Menu.instructions"
                    defaultMessage="How to Play"
                    description="How to Play Button"
                  />
                </Link>
              </li>
              {/* <li>
                <Link to={`/games/${game_id}/materials/`}>
                  <FormattedMessage
                    id="Menu.materials"
                    defaultMessage="Self-Assessment"
                    description="Link to self-assessment materials"
                  />
                </Link>
              </li> */}
              <li>
                <Link to={`/games/${game_id}/credits/`}>
                  <FormattedMessage
                    id="Menu.credits"
                    defaultMessage="Credits"
                    description="Credits Button"
                  />
                </Link>
              </li>
              <li>
                <Link to={`/games/`}>
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
      <footer>
        <img
          src="/images/cc_icon_white.png"
          alt="white cc icon"
          width="20"
          height="20"
        ></img>{" "}
        <img
          src="/images/attribution_icon_white.png"
          alt="white attribution icon"
          width="20"
          height="20"
        ></img>{" "}
        <img
          src="/images/nc_icon_white.png"
          alt="white non-commercial icon"
          width="20"
          height="20"
        ></img>{" "}
        <p className="cc">
          <FormattedMessage
            id="Menu.copyright"
            defaultMessage="Unless otherwise noted this resource is available for public use under"
            description="copyright disclaimer"
          />{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc/4.0/"
            className="cc-link"
          >
            Creative Commons Attribution 4.0 International (CC BY-NC 4.0)
          </a>
          .
        </p>
        <p className="cc">
          <FormattedMessage
            id="Menu.copyright-share"
            defaultMessage="SHARE: copy and redistribute the material in any medium or format"
            description="copyright share disclaimer"
          />{" "}</p>
      </footer>
    </div>
  );
};

export default Menu;
