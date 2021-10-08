import { useHistory } from "react-router";
import useLogGameEvent from "./useLogGameEvent";

export default () => {
  const history = useHistory();
  const logGameEvent = useLogGameEvent();

  return {};
};
