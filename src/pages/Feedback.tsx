import { useContext, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import RootScopeContext from "../controllers/RootScopeContext";
import "./Feedback.scss";

const Feedback: React.FC<{}> = () => {
  const history = useHistory();

  const rootScope = useContext(RootScopeContext);

  const dp = rootScope.dataProvider.find(({id}) => id == rootScope.sg.current ) 
		
		const goNext = useCallback( () => {
			switch(dp?.type) {
				case 'video':
					history.push('/decision/');
					break;
				case 'lo':
					history.push('/lo/');
					break;
			}
		}, ['dp.type'])


  return (
    <div className="container">
      <div className="panel feedback" role="alert">
        <header>
          <FormattedMessage
            id="Feedback.title"
            defaultMessage="Feedback"
            description="feedback title"
            tagName="h1"
          />
        </header>
        <div className="main">{dp?.feedback}</div>
        <footer>
          <p className="controls">
            <a href="javascript:void(0)" className="button" onClick={goNext}>
              <FormattedMessage
                id="General.resume"
                defaultMessage="Resume Game"
                description="resume game button"
              />
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Feedback;
