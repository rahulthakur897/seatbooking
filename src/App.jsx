"use client";

import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./layout/header";
import Router from "./routes/router";
import Footer from "./layout/footer";
import "./App.css";

function App() {
	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<Header />
			<main>
				<Router />
			</main>
			<Footer />
		</ErrorBoundary>
	);
}

export default App;
