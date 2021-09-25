import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./Main.scss";

const Main: React.FC<{}> = () => {
  return (
    <div className="container splash">
      <div className="panel">
        <header>
          <FormattedMessage
            id="Main.title"
            defaultMessage="Emergency"
            description="Main page title"
            tagName="h1"
          />
        </header>
        <div className="main">
          <p>
            <Link to="/menu/" className="button">
              <FormattedMessage
                id="Main.playGameButton"
                defaultMessage="Play Game"
                description="Play game button text"
              />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
