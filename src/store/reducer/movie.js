import {
	IS_LOADING,
	GET_MOVIE_SUCCESS,
	FILTER_MOVIE,
	SELECTED_MOVIE,
	SELECTED_MOVIE_TIMING,
	MOVIE_SEAT_COUNT,
	THEATRE_LAYOUT_SUCCESS,
	UPDATE_SEAT_PREFRENCE,
} from "../constant";

const initState = {
	movies: localStorage.getItem("movies")
		? JSON.parse(localStorage.getItem("movies"))
		: [],
	allMovies: [],
	selectedMovie: localStorage.getItem("selectedMovie")
		? JSON.parse(localStorage.getItem("selectedMovie"))
		: {},
	isLoading: false,
	theatreLayout: [],
	selectedSeats: [],
	totalPrice: 0,
};

const MovieReducer = (store = initState, action) => {
	switch (action.type) {
		case IS_LOADING: {
			return {
				...store,
				isLoading: true,
			};
		}
		case GET_MOVIE_SUCCESS: {
			localStorage.setItem("movies", JSON.stringify(action.response));
			return {
				...store,
				movies: action.response,
				allMovies: action.response,
				isLoading: false,
			};
		}
		case FILTER_MOVIE: {
			const { allMovies } = store;
			const filteredList = allMovies.filter((movie) => {
				if (movie.title.toLowerCase().indexOf(action.payload) !== -1) {
					return movie;
				}
				return false;
			});
			return {
				...store,
				movies: filteredList,
			};
		}
		case SELECTED_MOVIE: {
			const { movies } = store;
			const movieId = action.payload || localStorage.getItem("selectedMovieId");
			const selectedMovie = movies.find(
				(mov) => parseInt(mov.id, 10) === parseInt(movieId, 10),
			);
			localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
			return {
				...store,
				selectedMovie,
				selectedSeats: [],
				totalPrice: 0,
			};
		}
		case SELECTED_MOVIE_TIMING: {
			const { selectedMovie } = store;
			selectedMovie.userMovieTime = action.payload;
			return {
				...store,
				selectedMovie,
			};
		}
		case MOVIE_SEAT_COUNT: {
			const { selectedMovie } = store;
			selectedMovie.userSeatCount = action.payload;
			localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
			return {
				...store,
				selectedMovie,
			};
		}
		case THEATRE_LAYOUT_SUCCESS: {
			const theatreLayout = action.response;
			return {
				...store,
				theatreLayout,
			};
		}
		case UPDATE_SEAT_PREFRENCE: {
			const { price, seatrow, seatno } = action.payload;
			const { selectedSeats, totalPrice } = store;
			const seat = seatrow + seatno;
			let updatedPrice = 0;
			if (selectedSeats.indexOf(seat) === -1) {
				selectedSeats.push(seat);
				updatedPrice = totalPrice + price;
			} else {
				const updatedSeatSel = selectedSeats.filter((i) => i !== seat);
				selectedSeats.push([...updatedSeatSel]);
				updatedPrice = totalPrice - price;
			}
			return {
				...store,
				selectedSeats,
				totalPrice: updatedPrice,
			};
		}
		default:
			return store;
	}
};

export default MovieReducer;
