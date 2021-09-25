import { FormattedMessage } from "react-intl";
import "./Settings.scss";

const Settings: React.FC<{}> = () => {
  return (
    <div className="container">
      <div className="panel settings">
        <header>
          <h1>
            <a href="#/" aria-label="Return to menu">
              <span className="icon-arrow-left"></span>
            </a>{" "}
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
                    ng-model="sg.fullscreen"
                    ng-value="false"
                    ng-change="toggleFullScreen()"
                  />
                  <label
                    htmlFor="mode_window"
                    tabIndex={0}
                    role="radio"
                    ng-keydown="onFullscreenKeydown($event)"
                  >
                    Window
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="display_mode"
                    id="mode_fullscreen"
                    ng-model="sg.fullscreen"
                    ng-value="true"
                    ng-change="toggleFullScreen()"
                  />
                  <label
                    htmlFor="mode_fullscreen"
                    tabIndex={0}
                    role="radio"
                    ng-keydown="onFullscreenKeydown($event)"
                  >
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
                    ng-model="sg.subtitles"
                    ng-value="false"
                    ng-change="saveState()"
                  />
                  <label
                    htmlFor="subtitles_off"
                    tabIndex={0}
                    role="radio"
                    ng-keydown="onSubtitlesKeydown($event)"
                  >
                    Off
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="subtitles"
                    id="subtitles_en"
                    ng-model="sg.subtitles"
                    ng-value="true"
                    ng-change="saveState()"
                  />
                  <label
                    htmlFor="subtitles_en"
                    tabIndex={0}
                    role="radio"
                    ng-keydown="onSubtitlesKeydown($event)"
                  >
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
