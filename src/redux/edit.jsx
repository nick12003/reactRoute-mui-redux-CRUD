import { createSlice, createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import { getOne, update, create } from "../services";

export const editSlice = createSlice({
  name: "edit",
  initialState: {
    data: {
      title: "",
      completed: false,
    },
    loading: false,
    newId: "",
  },
  reducers: {
    setData: (state, { payload }) => {
      return { ...state, data: payload.data };
    },
    setLoading: (state, { payload }) => {
      return { ...state, loading: payload.loading };
    },
    setNewId: (state, { payload }) => {
      return { ...state, newId: payload.id };
    },
    resetData: (state) => {
      return {
        ...state,
        data: {
          title: "",
          completed: false,
        },
      };
    },
  },
});

const { setLoading, setData, resetData, setNewId } = editSlice.actions;
export const editAction = {
  fetchOne: createAction("edit/fetchOne"),
  updateOne: createAction("edit/updateOne"),
  createOne: createAction("edit/createOne"),
  setLoading,
  setData,
  resetData,
};

function* fetchOne({ payload: { id } }) {
  yield put(setLoading({ loading: true }));
  const data = yield call(getOne, id);
  yield put(setData({ data }));
  yield put(setLoading({ loading: false }));
}

function* updateOne({ payload: { id, data } }) {
  yield put(setLoading({ loading: true }));
  yield call(update, id, data);
  yield put(setData({ data }));
  yield put(setLoading({ loading: false }));
}

function* createOne({ payload: { data } }) {
  yield put(setLoading({ loading: true }));
  // yield call(create, [data]);
  const result = yield call(create, [data]);
  // yield put(setData({ data: result.items[0] }));
  yield put(setNewId({ id: result.items[0]._uuid }));
  yield put(setLoading({ loading: false }));
}

function* editSaga() {
  yield takeLatest("edit/fetchOne", fetchOne);
  yield takeLatest("edit/updateOne", updateOne);
  yield takeLatest("edit/createOne", createOne);
}

export { editSaga };

export const editReducer = editSlice.reducer;
