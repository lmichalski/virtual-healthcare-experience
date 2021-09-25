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
        <div>
          <iframe
            src="https://player.vimeo.com/video/614620744?h=22218688ac&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            frameBorder={0}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="SG4_DP1_0"
          ></iframe>
        </div>

        <div id="pause">
          <FormattedMessage
            id="General.pause"
            defaultMessage="pause"
            description="pause icon"
          />
          <script src="https://player.vimeo.com/api/player.js"></script>
        </div>
      </div>
    </div>
  );
};

export default Video;
