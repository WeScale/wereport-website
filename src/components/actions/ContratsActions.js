import dispatcher from "../dispatcher";

export function createContrat(text) {
  dispatcher.dispatch({
    type: "CREATE_CONTRAT",
    text,
  });
}