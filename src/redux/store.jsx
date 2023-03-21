import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";

import { listReducer } from "./list";
import { editReducer } from "./edit";

import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    list: listReducer,
    edit: editReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
