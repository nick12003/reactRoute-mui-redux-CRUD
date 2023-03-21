import { createSlice, createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import { getList, remove } from "../services";

const listSlice = createSlice({
  name: "list",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    setList: (state, { payload }) => {
      return { ...state, list: payload.list };
    },
    setLoading: (state, { payload }) => {
      return { ...state, loading: payload.loading };
    },
    resetList: (state) => {
      return {
        ...state,
        list: [],
      };
    },
  },
});

const { setLoading, setList, resetList } = listSlice.actions;

export const listAction = {
  fetchList: createAction("list/fetchList"),
  deleteOne: createAction("list/deleteOne"),
  setLoading,
  setList,
  resetList,
};

function* fetchList() {
  yield put(setLoading({ loading: true }));
  const result = yield call(getList);
  yield put(setList({ list: result.items }));
  yield put(setLoading({ loading: false }));
}

function* deleteOne({ payload: { id } }) {
  yield put(setLoading({ loading: true }));
  yield call(remove, id);
  yield put(listAction.fetchList());
  yield put(setLoading({ loading: false }));
}

function* listSaga() {
  yield takeLatest("list/fetchList", fetchList);
  yield takeLatest("list/deleteOne", deleteOne);
}

export { listSaga };

export const listReducer = listSlice.reducer;
