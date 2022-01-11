import { useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useGotoMenu } from "../util";
import "./Summary.scss";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  Link,
  View,
} from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";

import { Link as Lonk } from "react-router-dom";
import useLogGameEvent from "../hooks/useLogGameEvent";
import { DecisionPoint } from "../hooks/useGameData";
import { defineMessages } from "@formatjs/intl";

const INTL_MESSAGES = defineMessages({
  results: {
    id: "Summary.results",
    defaultMessage:
      "You have completed the game by answering {question_count} questions.",
    description: "summary results",
  },
  bestResult: {
    id: "Summary.best-result",
    defaultMessage:
      "You've demonstrated the best possible result! Now play it one more time to make sure it wasn't mere luck :)",
    description: "best result sentence",
  },
  incorrectOne: {
    id: "Summary.incorrect-one",
    defaultMessage:
      "However, if you give only correct answers it should only take",
    description: "not the best result part one",
  },
  incorrectTwo: {
    id: "Summary.incorrect-two",
    defaultMessage:
      "questions to complete the scenario. See if you can improve your results next time!",
    description: "not the best result part two",
  },
  debriefOne: {
    id: "Summary.debrief-one",
    defaultMessage:
      "If not attending an organized debrief, make sure you download and complete the",
    description: "debrief sentence part one",
  },
  debriefTwo: {
    id: "Summary.debrief-two",
    defaultMessage: "self-debriefing questions",
    description: "debrief sentence part two",
  },
  debriefThree: {
    id: "Summary.debrief-three",
    defaultMessage:
      "to optimise your learning experience. Scroll down to view results.",
    description: "debrief sentence part three",
  },
  gameReport: {
    id: "Summary.game-report",
    defaultMessage: "Game Report",
    description: "game report title",
  },
  summary: {
    id: "Summary.summary",
    defaultMessage: "Summary",
    description: "summary header",
  },
  yourAnswers: {
    id: "Summary.your-answers",
    defaultMessage: "Your Responses",
    description: "your answers header title",
  },
  inProgressResults: {
    id: "Summary.inProgressResults",
    defaultMessage:
      "You have answered {question_count} questions. To finish the game go to menu and resume the gameplay.",
    description:
      "The message to show players arriving at the summary page while their game isn't finished",
  },
  downloadProgress: {
    id: "Summary.downloadProgress",
    defaultMessage: "Download Progress Report",
    description: "link to download progress report",
  },
  materialsLink: {
    id: "Summary.materialsLink",
    defaultMessage: "Practice Materials",
    description: "link to download materials page",
  },
});

const Roboto = require("../fnt/Roboto-Regular.ttf").default as string;

Font.register({
  family: "Roboto",
  format: "truetype",
  src: Roboto,
});

interface iProps {
  decisionPoints: DecisionPoint[];
  gameProgress: { id: number; label: string; option: number }[];
  completed: boolean;
}

const Summary: React.FC<iProps> = ({
  gameProgress,
  decisionPoints,
  completed,
}) => {
  const logGameEvent = useLogGameEvent();
  const { formatMessage: getFM } = useIntl();
  // const [progress, setProgress] = useState([])

  const goToMenu = useGotoMenu();

  let progress: { question: string; answer: string; correct: boolean }[] =
    useMemo(() => {
      let progress = [];
      var i;
      for (i = 0; i < gameProgress.length; i++) {
        const dp = gameProgress[i];
        const current = decisionPoints.find(({ id }) => id === dp.id)!;
        const next = decisionPoints.find(({ id }) => id === dp.option)!;

        progress.push({
          question: current.message,
          answer: dp.label,
          correct: next.correct,
        });
      }
      return progress;
    }, [decisionPoints, gameProgress]);

  let message: JSX.Element;

  if (completed) {
    const correct_ratio = (
      progress.filter(({ correct }) => correct).length / progress.length
    ).toFixed(2);

    logGameEvent("", "complete", "game", "", correct_ratio);

    message = (
      <>
        <Text>
          {getFM(INTL_MESSAGES.results, {
            question_count: (
              <Text style={{ fontWeight: "bold" }}>
                {" "}
                {progress.length - 2}{" "}
              </Text>
            ),
          })}{" "}
        </Text>
        {progress.length ===
        decisionPoints.filter(({ correct }) => correct).length ? (
          <Text> {getFM(INTL_MESSAGES.bestResult)} </Text>
        ) : (
          <Text>
            {" "}
            {getFM(INTL_MESSAGES.incorrectOne)}
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              {decisionPoints.filter(({ correct }) => correct).length - 2}
            </Text>{" "}
            {getFM(INTL_MESSAGES.incorrectTwo)}{" "}
          </Text>
        )}
        {/* <Text>
          Document this encounter by clicking on the practice documentation
          icon. There you will find a blank documentation form. Once you are
          done, compare your documentation to the sample provided.{" "}
        </Text> */}
        <Text>
          {getFM(INTL_MESSAGES.debriefOne)}{" "}
          <Link src={`${window.location.origin}/docs/self-assessment.pdf`}>
            {getFM(INTL_MESSAGES.debriefTwo)}
          </Link>{" "}
          {getFM(INTL_MESSAGES.debriefThree)}
        </Text>
      </>
    );
  } else {
    message = (
      <Text>
        {getFM(INTL_MESSAGES.inProgressResults, {
          question_count: (
            <Text style={{ fontWeight: "bold" }}> {progress.length} </Text>
          ),
        })}{" "}
      </Text>
    );
  }

  const pdfContent = useMemo(() => {
    let responses = progress.map((dp, i) => (
      <View key={i}>
        <View>
          <Text style={{ fontWeight: "bold" }}>Q: </Text>
          <Text>{dp.question}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>A: </Text>
          <Text
            style={dp.correct ? { color: "#009933" } : { color: "#cc0000" }}
          >
            {dp.answer} ({dp.correct ? "Correct" : "Incorrect"})
          </Text>
        </View>
      </View>
    ));
    const html = (
      <Document>
        <Page>
          {/* <style
            dangerouslySetInnerHTML={{
              __html: `html, body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 130%; background-color: #ffffff; color: #000;}
							h1, h2, p, ol { font-weight: normal; margin-top: 0.3em; margin-bottom: 0.3em; padding-top: 0; padding-bottom: 0; line-height: 130%; color: #000; }`,
            }}
          /> */}
          <View
            style={{
              fontFamily: "Roboto",
              fontSize: 14,
              lineHeight: "130%",
              backgroundColor: "#ffffff",
              color: "#000",
            }}
          >
            <Text
              style={{
                fontSize: 32,
                paddingBottom: "0.3em",
                borderBottom: "2px solid #000000",
              }}
            >
              {getFM(INTL_MESSAGES.gameReport)}
            </Text>
            <Text style={{ fontSize: 24 }}>{getFM(INTL_MESSAGES.summary)}</Text>
            <View>{message}</View>
            <Text style={{ fontSize: 24 }}>
              {getFM(INTL_MESSAGES.yourAnswers)}
            </Text>
            <View>{responses}</View>
          </View>
        </Page>
      </Document>
    );
    return html;
  }, [message, progress, getFM]);

  return (
    <div className="container">
      <div className="right controls">
        <button className="button button--menu" onClick={goToMenu}>
          Menu
        </button>
      </div>
      <div className="panel info">
        <header>
          <FormattedMessage
            id="Summary.title"
            defaultMessage="Congratulations!"
            description="Summary title"
            tagName="h1"
          />
        </header>
        <div className="main summary">
          <div className="content">
            <div>{message}</div>
            <h2 style={{ fontSize: 24 }}>
              {getFM(INTL_MESSAGES.yourAnswers)}:
            </h2>
            <ol className="responses">
              {progress.map((dp) => (
                <li>
                  <div>{dp.question}</div>
                  <div
                    className={dp.correct ? "correct" : "wrong"}
                    style={
                      dp.correct ? { color: "#009933" } : { color: "#cc0000" }
                    }
                  >
                    <strong>
                      {dp.answer} ({dp.correct ? "Correct" : "Incorrect"})
                    </strong>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <footer>
          <PDFDownloadLink
            className="button"
            document={pdfContent}
            fileName="progress-report.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading
                ? "Loading document..."
                : getFM(INTL_MESSAGES.downloadProgress)
            }
          </PDFDownloadLink>

          <Lonk to="../materials/">{getFM(INTL_MESSAGES.materialsLink)}</Lonk>

          {/* <a href="/module/_/ui/game/tpl/materials.html" className="button">
            {" "}
            Practice Documentation{" "}
          </a> */}
        </footer>
      </div>
    </div>
  );
};

export default Summary;
