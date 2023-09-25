import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "@itseasy21/react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../store/action/movie";

function Home() {
	const dispatch = useDispatch();
	const { isLoading, movies } = useSelector((state) => state.movie);

	useEffect(() => {
		dispatch(getMovies());
	}, [dispatch]);

	const breakPoints = [
		{ width: 1, itemsToShow: 1 },
		{ width: 350, itemsToShow: 2 },
		{ width: 600, itemsToShow: 3 },
		{ width: 850, itemsToShow: 4 },
		{ width: 1050, itemsToShow: 5 },
	];

	return (
		<article className="maincontainer">
			<h2 style={{ marginLeft: "75px" }}>Latest Movies</h2>
			<section className="recommended">
				<Carousel breakPoints={breakPoints}>
					{isLoading ? (
						<p>Loading...</p>
					) : (
						movies?.map((movie) => {
							return (
								<Link
									className="movielink"
									to={`/movies/${movie.id}`}
									key={movie.id}
								>
									<img
										className="movieposter"
										src={`../assets/images/${movie.titleId}Poster.jpeg`}
										alt="movieposter"
									/>
									<h4 style={{ textAlign: "center" }}>{movie.title}</h4>
									<p style={{ color: "gray" }}>{movie.type}</p>
								</Link>
							);
						})
					)}
				</Carousel>
			</section>
		</article>
	);
}

export default Home;
