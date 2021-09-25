import { FormattedMessage } from "react-intl";
import "./Video.scss";

const Video: React.FC<{}> = () => {
  return (
    <div className="video">
      {/* <!--<div className="left controls"><a href="" className="button menu" ng-click="skipVideo();">Skip</a></div>--> */}
      <div className="right controls">
        <a href="" className="button menu" ng-click="gotoMenu();">
          <FormattedMessage
            id="General.menu"
            defaultMessage="Menu"
            description="Go To Menu Button"
          />
        </a>
      </div>
      <div id="player" className="videoplayer functional">
        <video id="vid-player" className="video-js vjs-big-play-centered">
          Please use a different browser
        </video>

        <div id="pause">
          <FormattedMessage
            id="General.pause"
            defaultMessage="pause"
            description="pause icon"
          />
        </div>
      </div>
    </div>
  );
};

export default Video;
