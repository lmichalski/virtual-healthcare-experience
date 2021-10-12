import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Intro.scss";

const Intro: React.FC = () => {
  const history = useHistory();
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
  }, [currentMessage, history, intro.length]);

  const text = intro[currentMessage];

  return (
    <div className="container">
      <div className="panel intro">
        <div className="main">
          <div className="content">{text}</div>
        </div>
        <footer>
          <p className="controls">
            <button className="button" onClick={skipToNext}>
              {label}
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Intro;
