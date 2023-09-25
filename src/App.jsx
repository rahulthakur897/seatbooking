import React from "react";
import Header from "./layout/header";
import Router from "./routes/router";
import Footer from "./layout/footer";
import "./App.css";

function App() {
	return (
		<>
			<Header />
			<main>
				<Router />
			</main>
			<Footer />
		</>
	);
}

export default App;
