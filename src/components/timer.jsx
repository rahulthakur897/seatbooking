/* eslint-disable no-unused-vars */
import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from "react";
import { useNavigate } from "react-router-dom";

function Timer(props, ref) {
	const { initialMinute = 0, initialSeconds = 0 } = props;
	const [minutes, setMinutes] = useState(initialMinute);
	const [seconds, setSeconds] = useState(initialSeconds);
	const navigate = useNavigate();

	useImperativeHandle(ref, () => ({
		childMethod() {
			return { minutes, seconds };
		},
	}));

	useEffect(() => {
		const myInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(myInterval);
					alert("Timout error");
					navigate(`/home`);
				} else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	});

	return (
		<div>
			{minutes === 0 && seconds === 0 ? null : (
				<h1>
					{" "}
					{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
				</h1>
			)}
		</div>
	);
}

export default forwardRef(Timer);
