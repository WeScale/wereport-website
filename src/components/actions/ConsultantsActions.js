import dispatcher from "../dispatcher";

export function createConsultant(text) {
  dispatcher.dispatch({
    type: "CREATE_CONSULTANT",
    text,
  });
}