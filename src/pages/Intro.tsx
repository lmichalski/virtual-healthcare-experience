import { useCallback, useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useHistory } from "react-router-dom";
import RootScopeContext from "../controllers/RootScopeContext";
import { getBrowser } from "../util";
import "./Intro.scss";

const Intro: React.FC<{}> = () => {
  const history = useHistory();

  const rootScope = useContext(RootScopeContext);
  const label = "Next";

  const [currentMessage, setCurrentMessage] = useState(0);
  const intro = [
    "You are Nicola Sporoli, a nurse caring for patients in the ambulatory care setting of the ER. Your next patient is Jason, whose chief complaint is ankle pain. The triage nurse took Jason’s vitals 10 minute ago and they were: BP138/88 P 96 (reg) R 20",
  ];

  const skipToNext = useCallback(() => {
    if (currentMessage < intro.length - 1) {
      setCurrentMessage((n) => n + 1);
    } else {
      history.push("/video/");
    }
  }, []);

  const text = intro[currentMessage];

  rootScope.sg.gamesaved = true;
  rootScope.sg.videoposition = 0;
  rootScope.saveState();

  return (
    <div className="container">
      <div className="panel intro">
        <div className="main">
          <div className="content">{text}</div>
        </div>
        <footer>
          <p className="controls">
            <a className="button" onClick={skipToNext}>
              {label}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Intro;
