/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTheatreLayout, updateSelectedSeats } from "../store/action/movie";

function SeatSelection() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [selTempSeats, setSelTempSeats] = useState([]);
	const seatRef = useRef(null);
	const dispatch = useDispatch();
	const { theatreLayout, userSeatCount, selectedSeats } = useSelector(
		(state) => state.movie,
	);

	useEffect(() => {
		dispatch(getTheatreLayout());
	}, [dispatch, selTempSeats]);

	const selectSeats = (price, seatrow, seatno) => {
		const seat = seatrow + seatno;
		let alreadySelSeat = [...selTempSeats];
		if (alreadySelSeat.indexOf(seat) > -1) {
			alreadySelSeat = alreadySelSeat.filter((st) => st !== seat);
		} else if (userSeatCount === alreadySelSeat.length) {
			// eslint-disable-next-line no-alert
			alert("Error: Limit exceed");
			return;
		} else {
			alreadySelSeat.push(seat);
		}
		setSelTempSeats(alreadySelSeat);
		dispatch(updateSelectedSeats(price, seatrow, seatno));
	};

	const gotoPay = () => {
		navigate(`/payment/${id}`);
	};

	return (
		<section className="layoutcontainer">
			{theatreLayout?.map((theatre) => (
				<div key={theatre.id}>
					<p style={{ color: "#7f7a7a", marginBottom: 0 }}>
						{theatre.area}-{`Rs. ${theatre.price}.00`}
					</p>
					{theatre.seats.map((seat) => (
						<div key={seat.row} className="layoutrow">
							<p>{seat.row}</p>
							{seat.seats.map((st, idx) => {
								const sl = st.split(":");
								const isAvailable = sl[0];
								const isValidSeat = sl[1];
								let cssClass = "seatAvailable";
								const seatId = seat.row + (idx + 1);
								if (selTempSeats.indexOf(seatId) > -1) {
									cssClass = "seatAvailable seatselected";
								}
								if (parseInt(isValidSeat, 10) === 0) {
									return <p key={seat.row + idx}>&nbsp;</p>;
								}
								if (parseInt(isAvailable, 10) === 1) {
									return (
										<button
											key={seatId}
											ref={seatRef}
											type="button"
											onClick={() =>
												selectSeats(theatre.price, seat.row, idx + 1)
											}
											className={cssClass}
										>
											{idx + 1}
										</button>
									);
								}
								return (
									<p key={seat.row + idx} className="seatBooked">
										{idx + 1}
									</p>
								);
							})}
						</div>
					))}
				</div>
			))}
			<p className="displayscreen">Screen</p>
			{selectedSeats?.length > 0 && (
				<div className="paymentbtncontainer">
					<button
						type="button"
						className="paymentbtn"
						onClick={() => gotoPay()}
					>
						Proceed to Pay
					</button>
				</div>
			)}
		</section>
	);
}

export default SeatSelection;
