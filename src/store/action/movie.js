import {
	GET_MOVIE,
	FILTER_MOVIE,
	SELECTED_MOVIE,
	SELECTED_MOVIE_TIMING,
	MOVIE_SEAT_COUNT,
	THEATRE_LAYOUT,
	UPDATE_SEAT_PREFRENCE,
} from "../constant";

export const getMovies = () => ({
	type: GET_MOVIE,
});

export const filterMovies = (text) => ({
	type: FILTER_MOVIE,
	payload: text,
});

export const getSelectedMovie = (movieId) => {
	localStorage.setItem("selectedMovieId", movieId);
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
