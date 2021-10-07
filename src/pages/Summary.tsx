import { useContext, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import RootScopeContext from "../controllers/RootScopeContext";
import { useGotoMenu } from "../util";
import "./Summary.scss";
  View,
} from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";


const Roboto = require("../fnt/Roboto-Regular.ttf").default as string;

Font.register({
  family: "Roboto",
  format: "truetype",
  src: Roboto,
});

const Summary: React.FC<{}> = () => {
  const rootScope = useContext(RootScopeContext);

  // const [progress, setProgress] = useState([])

  const goToMenu = useGotoMenu();

  let progress: { question: string; answer: string; correct: boolean }[] =
    useMemo(() => {
      let progress = [];
      var i;
      for (i = 0; i < rootScope.sg.progress.length; i++) {
        const dp = rootScope.sg.progress[i];
        const current = rootScope.dataProvider.find(({ id }) => id === dp.id)!;
        const next = rootScope.dataProvider.find(({ id }) => id === dp.option)!;

        progress.push({
          question: current.message,
          answer: dp.label,
          correct: next.correct,
        });
      }
      return progress;
    }, [rootScope.dataProvider, rootScope.sg.progress]);

  let message: JSX.Element;

  if (rootScope.sg.completed) {
    const correct_ratio = (
      progress.filter(({ correct }) => correct).length / progress.length
    ).toFixed(2);

    rootScope.logGameEvent("", "complete", "game", "", correct_ratio);

    message = (
      <>
        <Text>
          You have completed the game by answering{" "}
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            {progress.length} questions
          </Text>
          .
        </Text>
        {progress.length === rootScope.correctOptions.length ? (
          <Text>
            You've demonstrated the best possible result! Now play it one more
            time to make sure it wasn't mere luck :)
          </Text>
        ) : (
          <Text>
            {" "}
            However, if you give only correct answers it should only take 9
            questions to complete the scenario. See if you can improve your
            results next time!{" "}
          </Text>
        )}
        <Text>
          Document this encounter by clicking on the practice documentation
          icon. There you will find a blank documentation form. Once you are
          done, compare your documentation to the sample provided.{" "}
        </Text>
        <Text>
          If not attending an organized debrief, make sure you download and
          complete the{" "}
          <Link src="/docs/self-assessment.pdf">self-debriefing questions</Link>{" "}
          to optimise your learning experience. Scroll down to view results.
        </Text>
      </>
    );
  } else {
    message = (
      <Text>
        You have answered{" "}
        <Text style={{ fontWeight: "bold" }}> {progress.length} questions</Text>
        . To finish the game go to menu and resume the gameplay.
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
              Emergency Game Report
            </Text>
            <Text style={{ fontSize: 24 }}>Summary</Text>
            <View>{message}</View>
            <Text style={{ fontSize: 24 }}>Your Responses</Text>
            <View>{responses}</View>
          </View>
        </Page>
      </Document>
    );
    return html;
  }, [message, progress]);

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
            <h2 style={{ fontSize: 24 }}>Your Answers:</h2>
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
            fileName="emergency-progress.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download Progress Report"
            }
          </PDFDownloadLink>

          <Lonk to="/materials/">
            <FormattedMessage
              id="materials.link"
              defaultMessage="Practice Materials"
              description="Link to Practice Materials"
            />
          </Lonk>

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
