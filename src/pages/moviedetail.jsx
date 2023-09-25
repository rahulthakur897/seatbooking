import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedMovie, userSelectedTiming } from "../store/action/movie";
import Modal from "../components/modal/confirmseat";

function MovieDetail() {
	const { id } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const { selectedMovie } = useSelector((state) => state.movie);

	useEffect(() => {
		dispatch(getSelectedMovie(id));
	}, []);

	const gotoseatselection = () => {
		setIsOpen(true);
	};

	return (
		<article>
			<section
				className="moviecover"
				style={{
					backgroundImage: `url(../assets/images/${selectedMovie?.titleId}Cover.jpeg)`,
				}}
			>
				<div className="leftsection">
					<img
						className="moviedetailposter"
						src={`../assets/images/${selectedMovie?.titleId}Poster.jpeg`}
						alt="movieposter"
					/>
				</div>
				<div className="rightsection">
					<h1 className="movietitle">{selectedMovie?.title}</h1>
					<div style={{ display: "flex", alignItems: "center" }}>
						<FontAwesomeIcon
							icon={faStar}
							style={{ color: "#eb4e62", fontSize: "30px" }}
						/>
						<span>&nbsp;</span>
						<h2 style={{ color: "#ffffff" }}>{selectedMovie?.stars} </h2>
						<span>&nbsp;</span>
						<h4 style={{ color: "#ffffff" }}>
							{" "}
							{selectedMovie?.ratings} Votes
						</h4>
					</div>
					<p className="moviedesc">{selectedMovie?.language}</p>
					<p className="moviedesc">{selectedMovie?.duration}</p>
					<p className="moviedesc">
						{selectedMovie?.type} - {selectedMovie?.movieType}
					</p>
					<p className="moviedesc">{selectedMovie?.release}</p>
					<div className="moviedesc">
						{selectedMovie?.timing?.map((tm) => (
							<button
								key={tm}
								type="button"
								onClick={() => dispatch(userSelectedTiming(tm))}
								className="movietimebtn"
							>
								{tm}
							</button>
						))}
					</div>
					<button
						type="button"
						disabled={!selectedMovie?.userMovieTime}
						onClick={() => gotoseatselection()}
						className="bookticketbtn"
					>
						Book Tickets
					</button>
				</div>
			</section>
			<section className="aboutmovie">
				<h2>About the Movie</h2>
				<p>{selectedMovie?.about}</p>
				<hr style={{ color: "gray" }} />
			</section>
			<section className="aboutmovie">
				<h2>Director</h2>
				<p>{selectedMovie?.director}</p>
				<hr style={{ color: "gray" }} />
			</section>
			<Modal
				movieId={id}
				open={isOpen}
				onClose={() => {
					setIsOpen(false);
				}}
			/>
		</article>
	);
}

export default MovieDetail;
