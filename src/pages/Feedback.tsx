import { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router";
import { DecisionPoint } from "../hooks/useGameData";
import "./Feedback.scss";

interface iProps {
  decisionPoint: DecisionPoint;
}

const Feedback: React.FC<iProps> = ({ decisionPoint: dp }) => {
  const history = useHistory();
  const { game_id } = useParams<{ game_id: string }>();

  const goNext = useCallback(() => {
    switch (dp?.type) {
      case "video":
        history.push(`/games/${game_id}/decision/`);
        break;
      case "lo":
        history.push(`/games/${game_id}/lo/`);
        break;
    }
  }, [dp?.type, history, game_id]);

  return (
    <div className="container">
      <div className="panel feedback" role="alert">
        <header>
          <FormattedMessage
            id="Feedback.title"
            defaultMessage="Feedback"
            description="feedback title"
            tagName="h1"
          />
        </header>
        <div className="main">{dp?.feedback}</div>
        <footer>
          <p className="controls">
            <button className="button" onClick={goNext}>
              <FormattedMessage
                id="General.resume"
                defaultMessage="Resume Game"
                description="resume game button"
              />
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Feedback;
