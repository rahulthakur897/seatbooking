import { put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
	IS_LOADING,
	GET_MOVIE,
	GET_MOVIE_SUCCESS,
	GET_MOVIE_BY_ID,
	GET_MOVIE_BY_ID_SUCCESS,
	THEATRE_LAYOUT,
	THEATRE_LAYOUT_SUCCESS,
	API_FAILURE,
} from "../constant";

async function loadMovies() {
	try {
		const response = await axios.get("../../assets/json/movies.json");
		return response?.data;
	} catch (err) {
		console.trace(err.message);
	}
	return null;
}

function* getMovies() {
	try {
		yield put({ type: IS_LOADING });
		const movResp = yield call(loadMovies);
		yield put({ type: GET_MOVIE_SUCCESS, response: movResp.movies });
	} catch (error) {
		yield put({ type: API_FAILURE, error: error.message });
	}
}

async function loadSeatLayout() {
	try {
		const response = await axios.get("../../assets/json/layout.json");
		return response?.data;
	} catch (err) {
		console.trace(err.message);
	}
	return null;
}

function* getTheatreLayout() {
	try {
		yield put({ type: IS_LOADING });
		const theatreResp = yield call(loadSeatLayout);
		yield put({ type: THEATRE_LAYOUT_SUCCESS, response: theatreResp.theatre });
	} catch (error) {
		yield put({ type: API_FAILURE, error: error.message });
	}
}

function* getMovieById(data) {
	try {
		yield put({ type: IS_LOADING });
		const movieId = data.payload;
		const movResp = yield call(loadMovies);
		const filteredMovie = movResp.movies.find(
			(mov) => parseInt(mov.id, 10) === parseInt(movieId, 10),
		);
		yield put({ type: GET_MOVIE_BY_ID_SUCCESS, response: filteredMovie });
	} catch (error) {
		yield put({ type: API_FAILURE, error: error.message });
	}
}

export default function* getMovieSaga() {
	yield takeLatest(GET_MOVIE, getMovies);
	yield takeLatest(GET_MOVIE_BY_ID, getMovieById);
	yield takeLatest(THEATRE_LAYOUT, getTheatreLayout);
}
