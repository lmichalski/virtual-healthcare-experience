import { useEffect, useCallback, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useHistory, useParams } from "react-router-dom";
import videojs from "video.js";
import Player from "@vimeo/player";

import { DecisionPoint } from "../hooks/useGameData";
import { useGotoMenu } from "../util";

import "./Video.scss";
import useLogGameEvent from "../hooks/useLogGameEvent";

interface iProps {
  decisionPoint: DecisionPoint;
  onVideoFinished: () => void;
  videoposition: number;
  setVideoposition: (t: number) => void;
}

const Video: React.FC<iProps> = ({
  decisionPoint: dp,
  onVideoFinished,
  videoposition,
  setVideoposition,
}) => {
  const location = useLocation();
  const history = useHistory();
  const { game_id } = useParams<{game_id: string}>();
  const logGameEvent = useLogGameEvent();

  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const gotoMenu = useGotoMenu();

  const skipVideo = useCallback(() => {
    let time = undefined;

    if (dp?.video?.vimeo_url) {
    } else if (videoRef.current) {
      var api = videojs(videoRef.current);
      api.dispose();
      time = api?.currentTime();
    }

    onVideoFinished();
    logGameEvent("", "skip", "video", dp?.data, time);
  }, [dp, logGameEvent, onVideoFinished]);

  useEffect(() => {
    if (dp && !dp?.video?.vimeo_url) skipVideo();
  }, [dp, skipVideo]);

  useEffect(() => {
    const handleUserKeyPress = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (video) {
        var api = videojs(video);
        switch (e.keyCode) {
          case 27:
            e.preventDefault();
            if (location.pathname !== "/") {
              if (api && typeof api.currentTime() != "undefined") {
                setVideoposition(api.currentTime());
              }
              history.push(`/games/${game_id}/`);
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
      }
    };
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [history, location.pathname, setVideoposition]);

  useEffect(() => {
    var iframe = iframeRef.current;

    if (videoRef.current && dp) {
      const api = videojs(videoRef.current);
      const clip = {
        bufferLength: 0,
        sources: [
          {
            type: "video/mp4",
            src: "_/vid/mp4/" + dp?.data + ".mp4",
          },
        ],
        subtitles: [
          {
            kind: "subtitles",
            srclang: "en",
            label: "English",
            src: "_/vid/vtt/en/" + dp?.data + ".vtt",
          },
        ],
      };
      console.log("video source", clip.sources[0].src);

      api.src(clip.sources[0].src);

      // @ts-ignore
      api.ready((api): void => {
        if (videoposition > 0) {
          api.currentTime(videoposition);
        }
        api?.play();
        logGameEvent("", "start", "video", dp?.data, "");
      });

      api.on("progress", function (e: unknown) {
        setVideoposition(api.currentTime());
      });

      api.on("pause", function (e: unknown) {
        if (api.duration() > api.currentTime() + 0.5) {
          logGameEvent("", "pause", "video", dp?.data, api.currentTime());
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

      //@ts-ignore
      api.on("ended", function (e) {
        skipVideo();
        logGameEvent("", "finish", "video", dp?.data, "");
      });

      //@ts-ignore
      api.on("error", function (e) {
        console.log(e);
        logGameEvent("", "error", "video", dp?.data, "");
      });

      api.load();
    } else if (dp && iframe) {
      var player = new Player(iframe);
      console.log("Setting vimeo listenera");
      player.on("ended", function () {
        console.log("vimeo ended");
        skipVideo();
        logGameEvent("", "finish", "video", dp.data, "");
      });

      player.getVideoTitle().then(function (title) {
        console.log("title:", title);
      });
    }
  }, [dp, skipVideo, logGameEvent, setVideoposition, videoposition]);

  return (
    <div className="video">
      <div className="right controls">
        <button className="button button--menu" onClick={gotoMenu}>
          <FormattedMessage
            id="General.menu"
            defaultMessage="Menu"
            description="Go To Menu Button"
          />
        </button>
      </div>
      <div id="player" className="videoplayer functional">
        {dp?.video &&
          (dp.video.vimeo_url ? (
            <div>
              <iframe
                ref={iframeRef}
                src={dp.video.vimeo_url + "?autoplay=1"}
                frameBorder={0}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="SG4_DP1_0"
              ></iframe>
            </div>
          ) : (
            <video
              ref={videoRef}
              id="vid-player"
              className="video-js vjs-big-play-centered"
            >
              Please use a different browser
            </video>
          ))}

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
