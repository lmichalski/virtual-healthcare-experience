import React, { useCallback, useEffect, useState } from "react";
import "./Settings.scss";

interface iProps {
  subtitlesEnabled: boolean;
  onSubtitlesToggled: (enabled: boolean) => void;
}

const Settings: React.FC<iProps> = ({
  subtitlesEnabled,
  onSubtitlesToggled,
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(
    !!document.fullscreenElement
  );

  const handleSubtitlesChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      onSubtitlesToggled(evt.target.value === "on");
    },
    [onSubtitlesToggled]
  );

  const handleFullscreenChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (!document.fullscreenElement && evt.target.value === "on") {
        document.documentElement
          .requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch((err) => {
            alert(
              `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
          });
      } else if (document.fullscreenElement && evt.target.value === "off") {
        if (document.exitFullscreen) {
          document.exitFullscreen().then(() => setIsFullscreen(false));
        }
      }
    },
    []
  );

  useEffect(() => {
    const handleFullscreenChange = () => {
      // document.fullscreenElement will point to the element that
      // is in fullscreen mode if there is one. If there isn't one,
      // the value of the property is null.
      setIsFullscreen(!!document.fullscreenElement);
      if (document.fullscreenElement) {
        console.log(
          `Element: ${document.fullscreenElement.id} entered full-screen mode.`
        );
      } else {
        console.log("Leaving full-screen mode.");
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="container">
      <div className="panel settings">
        <header>
        <h1>
            <Link to="/" aria-label="Return to menu">
              <span className="icon-arrow-left"></span>
            </Link>{" "}
            Game Options
          </h1>
        </header>
        <div className="main">
          <div className="content">
          <div className="cf">
              <h2>Display:</h2>
              <div className="radio">
                <div>
                  <input
                    type="radio"
                    name="display_mode"
                    id="mode_window"
                    value="off"
                    checked={!isFullscreen}
                    onChange={handleFullscreenChange}
                  />
                  <label htmlFor="mode_window" aria-checked={!isFullscreen}>
                    Window
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="display_mode"
                    id="mode_fullscreen"
                    value="on"
                    checked={isFullscreen}
                    onChange={handleFullscreenChange}
                  />
                  <label htmlFor="mode_fullscreen" aria-checked={isFullscreen}>
                    Fullscreen
                  </label>
                </div>
              </div>
            </div>
            <br />
            <div className="cf">
              <h2>Subtitles:</h2>
              <div className="radio">
                <div>
                  <input
                    type="radio"
                    name="subtitles"
                    id="subtitles_off"
                    value="off"
                    checked={!subtitlesEnabled}
                    onChange={handleSubtitlesChange}
                  />
                  <label
                    htmlFor="subtitles_off"
                    aria-checked={!subtitlesEnabled}
                  >
                    Off
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="subtitles"
                    id="subtitles_en"
                    value="on"
                    checked={subtitlesEnabled}
                    onChange={handleSubtitlesChange}
                  />
                  <label htmlFor="subtitles_en" aria-checked={subtitlesEnabled}>
                    On
                  </label>
                </div>
              </div>
            </div>
            {/* <!--<br>
				<div className="cf">
					<h2>Video Quality:</h2>
					<div className="radio">
						<div>
							<input type="radio" name="quality" id="quality_720p"
								ng-model="sg.quality"
								ng-value="'-720p'"
								ng-change="saveState()"/> 
							<label for="quality_720p">High (720p)</label>
						</div>
						<div>
							<input type="radio" name="quality" id="quality_360p"
								ng-model="sg.quality"
								ng-value="''"
								ng-change="saveState()"/> 
							<label for="quality_360p">Low (360p)</label>
						</div>
					</div>
				</div>--> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
