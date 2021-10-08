import React, { useCallback, useContext } from "react";

interface Event {
  game: string;
  level: string;
  type: string;
  target: string;
  label?: string;
  data?: string | number;
  user?: string;
  datetime: Date;
}

const emptyLoggingContext = () => ({
  eventLog: [] as Event[],
  pushEvent(event: Event) {
    this.eventLog.push(event);
  },
});

const LoggingContext = React.createContext(emptyLoggingContext());

export const LoggingContextProvider: React.FC = (props) => {
  return <LoggingContext.Provider value={emptyLoggingContext()} {...props} />;
};

const useLogGameEvent = () => {
  const loggingContext = useContext(LoggingContext);
  const userUuid = undefined; // useUser().uuid

  function logGameEvent(
    level: string,
    type: string,
    target: string,
    label?: string,
    data?: string | number
  ) {
    loggingContext.pushEvent({
      game: "app.name",
      level: level,
      type: type,
      target: target,
      label: label,
      data: data,
      user: userUuid,
      datetime: new Date(),
    });

    console.log(loggingContext.eventLog);
  }

  return useCallback(logGameEvent, [loggingContext, userUuid]);
};

export default useLogGameEvent;
