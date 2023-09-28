import {
	GET_MOVIE,
	FILTER_MOVIE,
	GET_MOVIE_BY_ID,
	SELECTED_MOVIE,
	SELECTED_MOVIE_TIMING,
	MOVIE_SEAT_COUNT,
	THEATRE_LAYOUT,
	UPDATE_SEAT_PREFRENCE,
	RESET_SEAT_SELECTION,
} from "../constant";

export const getMovies = () => ({
	type: GET_MOVIE,
});

export const getMovieDetailById = (movieId) => ({
	type: GET_MOVIE_BY_ID,
	payload: movieId,
});

export const filterMovies = (text) => ({
	type: FILTER_MOVIE,
	payload: text,
});

export const getSelectedMovie = (movieId) => {
	return {
		type: SELECTED_MOVIE,
		payload: movieId,
	};
};

export const userSelectedTiming = (movieTime) => ({
	type: SELECTED_MOVIE_TIMING,
	payload: movieTime,
});

export const userSeatCount = (seatCount) => ({
	type: MOVIE_SEAT_COUNT,
	payload: seatCount,
});

export const getTheatreLayout = () => ({
	type: THEATRE_LAYOUT,
});

export const updateSelectedSeats = (price, seatrow, seatno) => ({
	type: UPDATE_SEAT_PREFRENCE,
	payload: { price, seatrow, seatno },
});

export const resetSelectedSeats = () => ({
	type: RESET_SEAT_SELECTION,
});
