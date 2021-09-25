import { FormattedMessage } from "react-intl";
import "./Instructions.scss";

const Instructions: React.FC<{}> = () => {
  return (
    <div className="container">
      <div className="panel info">
        <header>
          <h1>
            <a href="#/" aria-label="Return to menu">
              <span className="icon-arrow-left"></span>
            </a>{" "}
            How to Play
          </h1>
        </header>
        <div className="main">
          <div className="content cf">
            <p>
              Watch the video story unfold. You will assume the role of a
              clinical nurse completing a client assessment.
            </p>
            <ul>
              <li>
                Occasionally, the video will pause, and you will be asked to
                respond to questions.{" "}
              </li>
              <li>
                Choose your responses carefully because your choices will affect
                how the story unfolds.{" "}
              </li>
              <li>
                The goal is to get to the end of the story, answering as few
                questions as possible.{" "}
              </li>
              <li>
                The best possible result is 9. You can play this game unlimited
                times to improve your result.{" "}
              </li>
              <li>
                Game play progresses forward only; there is no option to go back
                to a previous decision point.{" "}
              </li>
              <li>
                At the end of the game you will see a summary report of your
                answers. The summary can be downloaded and saved to your
                computer.
              </li>
              <li>
                At the end of the game you will have an opportunity to document
                your assessment and interventions. Once you have completed your
                documentation, compare your documentation to the one provided.
                Please note the date/time/names will be different depending on
                the time you play the game. But, the content should be similar
                even though the wording may vary.{" "}
              </li>
              <li>
                You can pause the game at any time by clicking on the video or
                pressing the spacebar.
              </li>
              <li>
                You can turn captions on or switch to full-screen, by selecting
                Game Options from the menu.
              </li>
              <li>
                The game uses high resolution videos, which require high-speed
                internet to upload easily.
              </li>
              <li>The game takes about 20–40 minutes to complete.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
