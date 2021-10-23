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
      <header>
        <h1>Client Chart</h1>
      </header>
      <div>
        <img
          src="/images/chart_image.png"
          alt="Client's Chart with some background information for this visit"
        ></img>
      </div>
    </div>
  );
};

export default Chart;
