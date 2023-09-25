import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import MovieDetail from "../pages/moviedetail";
import SeatSelection from "../pages/seatselection";
import Payment from "../pages/payment";

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/home" element={<Home />} />
			<Route path="/movies/:id" element={<MovieDetail />} />
			<Route path="/seatselection/:id" element={<SeatSelection />} />
			<Route path="/payment/:id" element={<Payment />} />
		</Routes>
	);
}

export default Router;
