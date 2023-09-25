import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import MovieReducer from "./reducer/movie";

const rootreducer = combineReducers({
	movie: MovieReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware);

const store = createStore(rootreducer, middleware);

sagaMiddleware.run(rootSaga);

export default store;
