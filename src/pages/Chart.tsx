import { Link } from "react-router-dom";
import { useGotoMenu } from "../util";
import { FormattedMessage } from "react-intl";
import "./Chart.scss";

interface iProps {
  image: string;
}

const Chart: React.FC<iProps> = ({ image }) => {

  const gotoMenu = useGotoMenu();

  return (
      <div>
              <div className="right controls">
        <button className="button button--menu" onClick={gotoMenu}>
          <FormattedMessage
            id="General.menu"
            defaultMessage="Menu"
            description="Go To Menu Button"
          />
        </button>
      </div>
        <header>
          <h1>
            Client Chart
          </h1>
        </header>
        <div>
            <img src="/images/chart_image.png" alt="Client's Chart with some background information for this visit"></img>
        </div>
      </div>
  );
};

export default Chart;
