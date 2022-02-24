import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import "./Credits.scss";

interface iProps {
  strings: {
    paragraphs: string[];
    credits_sections: {
      header: string;
      items: string[];
    }[];
    end_paragraphs: string[];
  };
}

const Credits: React.FC<iProps> = ({
  strings: { paragraphs, credits_sections, end_paragraphs },
}) => {
  return (
    <div className="container">
      <div className="panel credits">
        <header>
          <h1>
            <Link to="../" aria-label="Return to menu">
              <span className="icon-arrow-left"></span>
            </Link>
            <FormattedMessage
              id="Credits.title"
              defaultMessage="Credits"
              description="credits title"
            />
          </h1>
        </header>
        <div className="main">
          <div className="content cf">
            {paragraphs.map((paragraph) => (
              <p>{paragraph}</p>
            ))}
            {credits_sections.map(({ header, items }) => (
              <>
                <h2>{header}</h2>
                <ul>
                  {items.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </>
            ))}
            {end_paragraphs.map((end_paragraph) => (
              <p>{end_paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
