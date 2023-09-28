import {
	IS_LOADING,
	GET_MOVIE_SUCCESS,
	GET_MOVIE_BY_ID_SUCCESS,
	FILTER_MOVIE,
	SELECTED_MOVIE_TIMING,
	MOVIE_SEAT_COUNT,
	THEATRE_LAYOUT_SUCCESS,
	UPDATE_SEAT_PREFRENCE,
	RESET_SEAT_SELECTION,
} from "../constant";

const initState = {
	movies: [],
	allMovies: [],
	selectedMovie: {},
	isLoading: false,
	theatreLayout: [],
	selectedSeats: [],
	userMovieTime: "",
	userSeatCount: 0,
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
				if (
					movie.title.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
				) {
					return movie;
				}
				return false;
			});
			return {
				...store,
				movies: filteredList,
			};
		}
		case GET_MOVIE_BY_ID_SUCCESS:
			return {
				...store,
				selectedMovie: action.response,
			};
		case SELECTED_MOVIE_TIMING: {
			return {
				...store,
				userMovieTime: action.payload,
			};
		}
		case MOVIE_SEAT_COUNT: {
			return {
				...store,
				userSeatCount: action.payload,
			};
		}
		case THEATRE_LAYOUT_SUCCESS: {
			return {
				...store,
				theatreLayout: action.response,
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
		case RESET_SEAT_SELECTION:
			return {
				...store,
				selectedSeats: [],
				totalPrice: 0,
				userMovieTime: "",
				userSeatCount: 0,
			};
		default:
			return store;
	}
};

export default MovieReducer;
