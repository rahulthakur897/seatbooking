import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import "wicg-inert";
import { userSeatCount } from "../../store/action/movie";

import Portal from "../portal";

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(51, 51, 51, 0.3);
	backdrop-filter: blur(1px);
	opacity: 0;
	transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
	transition-delay: 200ms;
	display: flex;
	align-items: center;
	justify-content: center;

	& .modal-content {
		transform: translateY(100px);
		transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
		opacity: 0;
	}

	&.active {
		transition-duration: 250ms;
		transition-delay: 0ms;
		opacity: 1;

		& .modal-content {
			transform: translateY(0);
			opacity: 1;
			transition-delay: 150ms;
			transition-duration: 350ms;
		}
	}
`;

const Content = styled.div`
	position: relative;
	padding: 20px;
	box-sizing: border-box;
	height: 90%;
	width: 30%;
	box-shadow:
		0 3px 6px rgba(0, 0, 0, 0.16),
		0 3px 6px rgba(0, 0, 0, 0.23);
	background-color: white;
	border-radius: 8px;
`;

export default function Modal(props) {
	const [active, setActive] = useState(false);
	const navigate = useNavigate();
	const { movieId, open, onClose, locked } = props;
	const backdrop = React.useRef(null);
	const dispatch = useDispatch();

	const [selectedSeats, setSelectedSeats] = useState({});
	const [noSeatsReq, setNoSeatsReq] = useState([
		{
			id: 1,
			value: 1,
			img: "cycle.png",
			selected: false,
		},
		{
			id: 2,
			value: 2,
			img: "scooter.png",
			selected: true,
		},
		{
			id: 3,
			value: 3,
			img: "auto.png",
			selected: false,
		},
		{
			id: 4,
			value: 4,
			img: "2seater.png",
			selected: false,
		},
		{
			id: 5,
			value: 5,
			img: "car.png",
			selected: false,
		},
		{
			id: 6,
			value: 6,
			img: "car.png",
			selected: false,
		},
		{
			id: 7,
			value: 7,
			img: "van.png",
			selected: false,
		},
		{
			id: 8,
			value: 8,
			img: "van.png",
			selected: false,
		},
		{
			id: 9,
			value: 9,
			img: "van.png",
			selected: false,
		},
		{
			id: 10,
			value: 10,
			img: "van.png",
			selected: false,
		},
	]);

	const setDefaultSeats = useCallback(() => {
		const selected = noSeatsReq.find((seat) => seat.selected);
		setSelectedSeats(selected);
	}, [noSeatsReq]);

	useEffect(() => {
		const { current } = backdrop;

		const transitionEnd = () => setActive(open);

		const keyHandler = (e) =>
			!locked && [27].indexOf(e.which) >= 0 && onClose();

		const clickHandler = (e) => !locked && e.target === current && onClose();

		if (current) {
			current.addEventListener("transitionend", transitionEnd);
			current.addEventListener("click", clickHandler);
			window.addEventListener("keyup", keyHandler);
		}

		if (open) {
			window.setTimeout(() => {
				document.activeElement.blur();
				setActive(open);
				setDefaultSeats();
				document.querySelector("#root").setAttribute("inert", "true");
			}, 10);
		}

		return () => {
			if (current) {
				current.removeEventListener("transitionend", transitionEnd);
				current.removeEventListener("click", clickHandler);
			}

			document.querySelector("#root").removeAttribute("inert");
			window.removeEventListener("keyup", keyHandler);
		};
	}, [open, locked, onClose, setDefaultSeats]);

	const chooseNoOfSeat = (seatObj) => {
		const choosenSeat = noSeatsReq.map((seat) => {
			const newseat = { ...seat };
			if (newseat.id === seatObj.id) {
				newseat.selected = true;
			} else {
				newseat.selected = false;
			}
			return newseat;
		});
		setNoSeatsReq(choosenSeat);
		setSelectedSeats(seatObj);
		dispatch(userSeatCount(seatObj.value));
	};

	const gotoseatselection = () => {
		navigate(`/seatselection/${movieId}`);
	};

	return open || active ? (
		<Portal className="modal-portal">
			<Backdrop ref={backdrop} className={active && open && "active"}>
				<Content className="modal-content">
					<section style={{ textAlign: "center" }}>
						<p>How many Seat?</p>
						{selectedSeats?.img && (
							<img
								style={{
									height: 200,
									width: 200,
									textAlign: "center",
								}}
								src={`../assets/images/seats/${selectedSeats.img}`}
								alt=""
							/>
						)}
						<div className="seatcountcontainer">
							{noSeatsReq?.map((seatObj) => (
								<button
									key={seatObj?.id}
									type="button"
									className={
										seatObj?.selected ? "activeSeatCount" : "defaultSeatCount"
									}
									onClick={() => {
										chooseNoOfSeat(seatObj);
									}}
								>
									{seatObj?.value}
								</button>
							))}
						</div>
						<button
							type="button"
							onClick={() => gotoseatselection()}
							className="seatselectionbtn"
						>
							Go to seat selection
						</button>
					</section>
				</Content>
			</Backdrop>
		</Portal>
	) : null;
}
