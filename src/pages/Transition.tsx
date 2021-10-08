import { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import { DecisionPoint } from "../controllers/RootScopeContext";
import "./Transition.scss";

interface iProps {
  decisionPoint: DecisionPoint;
}

const Transition: React.FC<iProps> = ({decisionPoint: dp}) => {
  const history = useHistory();

  const playNextVideo = useCallback(() => {
    history.push("/video/");
  }, [history]);

  return (
    <div className="container">
      <div className="panel feedback">
        <header>
          <FormattedMessage
            id="Transition.title"
            defaultMessage="Game Paused"
            description="game paused transition title"
            tagName="h1"
          />
        </header>
        <div className="main">{dp?.feedback}</div>
        <footer>
          <p className="controls">
            <button className="Link" onClick={playNextVideo}>
              Resume Game
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Transition;
