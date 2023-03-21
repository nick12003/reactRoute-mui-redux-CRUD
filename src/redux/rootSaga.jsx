import { all } from "redux-saga/effects";
import { listSaga } from "./list";
import { editSaga } from "./edit";

function* rootSaga() {
  yield all([listSaga(), editSaga()]);
}

export default rootSaga;
