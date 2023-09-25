import { all } from "redux-saga/effects";
import getMovieSaga from "./movie";

function* rootSaga() {
	yield all([getMovieSaga()]);
}

export default rootSaga;
