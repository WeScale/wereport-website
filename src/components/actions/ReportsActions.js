import dispatcher from "../dispatcher";

export function createReport(text) {
  dispatcher.dispatch({
    type: "CREATE_REPORT",
    text,
  });
}