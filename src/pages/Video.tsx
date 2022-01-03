import { useEffect, useCallback, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import videojs from "video.js";
import Player from "@vimeo/player";

import { DecisionPoint } from "../hooks/useGameData";

import "./Video.scss";
import useLogGameEvent from "../hooks/useLogGameEvent";
import { FormattedMessage } from "react-intl";
import { useGotoMenu } from "../util";

interface iProps {
  decisionPoint: DecisionPoint;
  onVideoFinished: () => void;
  videoposition: number;
  setVideoposition: (t: number) => void;
  subtitlesLanguage: string | null;
  onSubtitlesLanguageSet: (lang: string | null) => void;
}

const Video: React.FC<iProps> = ({
  decisionPoint: dp,
  onVideoFinished,
  videoposition,
  setVideoposition,
  subtitlesLanguage,
  onSubtitlesLanguageSet,
}) => {
  const location = useLocation();
  const history = useHistory();
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
              history.push(`/`);
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
    }
  }, [dp, skipVideo, logGameEvent, setVideoposition, videoposition]);

  useEffect(() => {
    if (iframeRef.current) {
      console.log("Setting vimeo listeners");

      const player = new Player(iframeRef.current);
      player.on("loaded", () => {
        player.setCurrentTime(videoposition);
      });
      return () => player.off("loaded");
    }
    // Disable exhaustive deps so this hook only gets called on initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (iframeRef.current) {
      console.log("Setting vimeo listeners");

      const player = new Player(iframeRef.current);
      player.on("timeupdate", (data: { seconds: number }) => {
        console.log(`Progress ${data.seconds}`);
        setVideoposition(data.seconds);
      });

      player.on("ended", () => {
        console.log("vimeo ended");
        skipVideo();
        logGameEvent("", "finish", "video", dp.data, "");
      });

      player.on("texttrackchange", (data: { language: string | null }) => {
        onSubtitlesLanguageSet(data.language);
      });

      return () => {
        player.off("timeupdate");
        player.off("ended");
        player.off("texttrackchange");
      };
    }
  }, [
    setVideoposition,
    dp.data,
    logGameEvent,
    skipVideo,
    onSubtitlesLanguageSet,
  ]);

  useEffect(() => {
    const togggleTracks = async (iframe: HTMLIFrameElement) => {
      const player = new Player(iframe);
      if (subtitlesLanguage) {
        const tracks = await player.getTextTracks();
        const track =
          tracks.find(({ language }) => language === subtitlesLanguage) ??
          tracks[0];
        if (track) player.enableTextTrack(track.language, track.kind);
      } else {
        return player.disableTextTrack();
      }
    };

    if (iframeRef.current) {
      togggleTracks(iframeRef.current);
    }
  }, [subtitlesLanguage]);

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
            <iframe
              ref={iframeRef}
              // style={{height: (iframeRef.current?.scrollWidth ?? 600) * 9/16}}
              src={dp.video.vimeo_url + `?autoplay=1`}
              frameBorder={0}
              allow="autoplay; texttrack; fullscreen; picture-in-picture"
              allowFullScreen
              title="SG4_DP1_0"
            ></iframe>
          ) : (
            <video
              ref={videoRef}
              id="vid-player"
              className="video-js vjs-big-play-centered"
            >
              Please use a different browser
            </video>
          ))}
      </div>
    </div>
  );
};

export default Video;
