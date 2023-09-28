/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Timer from "../components/timer";

function Payment() {
	const timerRef = useRef(null);
	const navigate = useNavigate();
	const { selectedMovie, userMovieTime, selectedSeats, totalPrice } =
		useSelector((state) => state.movie);

	const bookmovie = () => {
		const timer = timerRef.current.childMethod();
		if (timer.minutes !== 0 || timer.seconds !== 0) {
			// eslint-disable-next-line no-alert
			alert("Ticket Booked");
			navigate(`/home`);
		}
	};

	return (
		<section className="paymentcontainer">
			<p className="pagetitle">Booking Summary</p>
			<div className="bookingcontainer">
				<div className="timercontainer">
					<Timer ref={timerRef} initialMinute={2} />
				</div>
				<p className="moviedetail">
					Movie: {selectedMovie?.title} - ({selectedMovie?.movieType})
				</p>
				<p className="moviedetail">Time: {userMovieTime}</p>
				<p className="moviedetail">
					Selected Seats: {selectedSeats?.join(", ")} ({selectedSeats?.length}{" "}
					Tickets)
				</p>
				<p className="moviedetail">Sub Total: Rs. {totalPrice}</p>
				<p className="moviedetail">
					Convenience Fees: Rs. {totalPrice + (totalPrice * 18) / 100}
				</p>
				<button
					type="button"
					className="paymentbtn"
					onClick={() => bookmovie()}
				>
					Pay amount
				</button>
			</div>
			<div className="payfooter">
				<p>Note:</p>
				<p>1. You can not cancel the tickets after purchase.</p>
				<p>
					2.In case of Credit/Debit Card bookings, the Credit/Debit Card and
					Card holder must be present at the ticket counter while collecting the
					ticket(s).
				</p>
			</div>
		</section>
	);
}

export default Payment;
