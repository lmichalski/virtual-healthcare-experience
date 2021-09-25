import { useEffect, useContext, useCallback, useState, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import videojs from "video.js";

import RootScopeContext from "../controllers/RootScopeContext";

import "./Video.scss";

const Video: React.FC<{}> = () => {
  const location = useLocation();
  const history = useHistory();

  const rootScope = useContext(RootScopeContext);
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false);


  const dp = rootScope.dataProvider.find(
    ({ id }) => id == rootScope.sg.current
  );

  const gotoMenu = useCallback(() => {
			rootScope.resumeURL = location.pathname
			rootScope.logGameEvent( "", "open", "menu", "", "");
			history.push("/")
  }, [rootScope])


  const skipVideo = useCallback(() => {
    var api = videojs("vid-player")
    api.dispose();

    rootScope.sg.videoposition = 0;
    rootScope.saveState();

    if (
      dp &&
      rootScope.dataProvider.indexOf(dp) ==
      rootScope.dataProvider.length - 1
    ) {
      rootScope.sg.completed = true;
      history.push("/summary/");
    } else if (dp && dp.options.length > 0) {
      if (dp && dp.feedback > "") {
        history.push("/feedback/");
      } else {
        history.push("/decision/");
      }
    } else if (dp?.next) {
      rootScope.sg.videoposition = 0;
      history.push("/lo/");
      rootScope.saveState();
      rootScope.sg.current++;
    } else {
      history.push("/transition/");
      rootScope.sg.current++;
    }
    rootScope.logGameEvent("", "skip", "video", dp?.data, api?.currentTime());
  }, [dp]);

  useEffect(() => {
    const handleUserKeyPress = function (e: KeyboardEvent) {
      var api = videojs('vid-player');
      switch (e.keyCode) {
        case 27:
          e.preventDefault();
          if (location.pathname !== "/") {
            if (api && typeof api.currentTime() != "undefined") {
              rootScope.sg.videoposition = api.currentTime();
              rootScope.saveState();
            }
            history.push("/");
          } else {
            history.goBack();
          }
          break;
        case 32:
          e.preventDefault();
          if (api) {
            if (api.paused()) {
              api.play();
            } else {
              api.pause();
            }
          }
          break;
        case 33:
          if (api) {
            api.currentTime(api.currentTime() - 10);
            api.play();
          }
          break;
        case 34:
          if (api) {
            api.currentTime(api.currentTime() + 10);
            api.play();
          }
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [history, location.pathname]);

  useEffect( () => {
    if(videoRef.current){


  const api = videojs("vid-player");

  // var Button = videojs.getComponent('Button');
  // var button = new Button(api, {
  // 		clickHandler: function(event) {
  // 			videojs.log('Clicked');
  // 		}
  // });
  // var button = api.addChild('BigPlayButton');


  const clip = {
      bufferLength: 0,
      sources: [
        { 
          'type': 'video/mp4', 
          'src': '_/vid/mp4/' + dp?.data + '.mp4'
        }
      ],
      subtitles: [
        { 
          'kind': 'subtitles', 
          'srclang': 'en', 
          'label': 'English',
          'src': '_/vid/vtt/en/' + dp?.data + '.vtt'
        }
      ]
    }

  

  // if (false) {

  // 	api.pause();
  // 	api.src (clip.sources[0].src);

  // } else {

  // api = flowplayer('#player', {
  // 	key: '$916323217063219',
  // 	clip:  clip,
  // 	tooltip: false,
  // 	keyboard: false,
  // 	autoBuffering: false,
  // 	analytics: 'UA-7906194-16',
  // 	volume: 0.8

  console.log("video source", clip.sources[0].src);

  api.src(clip.sources[0].src);

  // @ts-ignore
  api.ready((api): void => {

    // if($rootScope.sg.subtitles) {
    // 	if(api.video.subtitles.length > 0) {
    // 		api.loadSubtitles(0);
    // 	} else {
    // 		api.disableSubtitles();
    // 	}
    // } else {
    // 	api.disableSubtitles();
    // }

    if (rootScope.sg.videoposition > 0) {
      api.currentTime(rootScope.sg.videoposition);
    }
    // } else {
    // 	api.play().then((p) => { debugger }).catch((err) => { debugger });
    // }
    api?.play();

    /*gtag('event', 'video_started', {
        'event_category': 'video',
        'event_label': dp.data,
        'value': dp.id
      });*/
    rootScope.logGameEvent("", "start", "video", dp?.data, "");
  });

  api.on("progress", function (e: unknown) {
    rootScope.sg.videoposition = api.currentTime();
    setPlaying(true);
  });

  api.on("pause", function (e: unknown) {
    /*gtag('event', 'video_paused', {
        'event_category': 'video',
        'event_label': dp.data,
        'value': dp.id
      });*/
    if (api.duration() > api.currentTime() + 0.5) {
      rootScope.logGameEvent("", "pause", "video", dp?.data, api.currentTime());
    }
  });

  api.on("click", function togglePause() {
    var doc = document.getElementById("pause");

    if (api.paused()) {
      if (doc) {
        doc.style.display = "none";
      }
      api.play();
    } else {
      if (doc) {
        doc.style.display = "block";
      }
      api.pause();
    }
  });

  api.on("ended", function (e) {
    skipVideo();
    rootScope.saveState();
    /*gtag('event', 'video_finished', {
        'event_category': 'video',
        'event_label': dp.data,
        'value': dp.id
      });*/
    rootScope.logGameEvent("", "finish", "video", dp?.data, "");
  });

  api.on("error", function (e) {
    console.log(e);
    rootScope.logGameEvent("", "error", "video", dp?.data, "");
  });

  api.load();
}}, [videoRef.current])

  return (
    <div className="video">
      {/* <!--<div className="left controls"><a href="" className="button menu" ng-click="skipVideo();">Skip</a></div>--> */}
      <div className="right controls">
        <a href="" className="button menu" onClick={gotoMenu}>
          <FormattedMessage
            id="General.menu"
            defaultMessage="Menu"
            description="Go To Menu Button"
          />
        </a>
      </div>
      <div id="player" className="videoplayer functional">
        <video ref={videoRef} id="vid-player" className="video-js vjs-big-play-centered">
          Please use a different browser
        </video>

        <div id="pause">
          <FormattedMessage
            id="General.pause"
            defaultMessage="pause"
            description="pause icon"
          />
        </div>

        <div id="skip" onClick={skipVideo}>
          <FormattedMessage
            id="General.skip"
            defaultMessage="Skip"
            description="Skip Video button"
          />
        </div>
      </div>
    </div>
  );
};

export default Video;
