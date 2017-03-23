import dispatcher from "../dispatcher";

export function createClient(text) {
  dispatcher.dispatch({
    type: "CREATE_CLIENT",
    text,
  });
}