import { Link } from "react-router-dom";
import "./Instructions.scss";

interface iProps {
  minSteps: number;
  strings: {
    paragraph: string;
    bullet_list: string[];
  };
}

const Instructions: React.FC<iProps> = ({ minSteps, strings }) => {
  return (
    <div className="container">
      <div className="panel info">
        <header>
          <h2>How to Play</h2>
        </header>
        <div className="main">
          <div className="content cf">
            <p>{strings.paragraph}</p>
            <ul>
              {strings.bullet_list.map((list_item) => (
                <li>{list_item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
