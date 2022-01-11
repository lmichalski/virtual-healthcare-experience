import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import AnimatedClock from "../clock/AnimatedClock";
import { useGotoMenu } from "../util";
import "./Clock.scss";

interface iProps {}

const Clock: React.FC<iProps> = () => {
  const history = useHistory();
  const { game_id } = useParams<{ game_id: string }>();

  const gotoMenu = useGotoMenu();
  const gotoDecision = () => history.push(`/games/${game_id}/decision/`);

  return (
    <div className="container Clock">
      <div className="panel menu">
        <div className="main">
          <FormattedMessage
            id="Clock.header"
            defaultMessage="Take pulse and press Continue."
            description="take pulse message"
            tagName="h2"
          />
          <p className="warning">
            <FormattedMessage
              id="Clock.warning"
              defaultMessage="Please note that for technical reasons this learning object can not
              be made accessible. Contact your instructor if you need help."
              description="warning about accesibility"
            />
          </p>
        </div>
        <footer>
          <p className="controls">
            <button onClick={gotoDecision} className="button">
            <FormattedMessage
              id="Clock.continue"
              defaultMessage="Continue"
              description="continue button"
            />
            </button>
          </p>
        </footer>
      </div>
      <div className="left controls">
        <button className="button button--menu">
          <FormattedMessage
            id="General.replay"
            defaultMessage="Replay"
            description="Replay Video Button"
          />
        </button>
      </div>
      <div className="right controls">
        <button className="button button--menu" onClick={gotoMenu}>
          <FormattedMessage
            id="General.menu"
            defaultMessage="Menu"
            description="Go To Menu Button"
          />
        </button>
      </div>
      <audio autoPlay loop src="/media/heart-beat.mp3"></audio>
      <AnimatedClock></AnimatedClock>
    </div>
  );
};

export default Clock;
