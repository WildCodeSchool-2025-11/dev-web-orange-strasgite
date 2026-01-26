import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Services from "./pages/Services";
import Tourism from "./pages/Tourism";
import "./styles/global.css";

export default function App() {
	return (
		<div className="app">
			{/* Navigation */}
			<nav className="navbar">
				<h1>Gîte Strasbourg</h1>
				<div className="nav-links">
					<a href="/">Accueil</a>
					<a href="/rooms">Chambres</a>
					<a href="/services">Services</a>
					<a href="/tourism">Tourisme</a>
					<a href="/contact">Contact</a>
				</div>
			</nav>

			{/* Routes */}
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/rooms" element={<Rooms />} />
					<Route path="/services" element={<Services />} />
					<Route path="/tourism" element={<Tourism />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</main>

			{/* Footer */}
			<footer>
				<p>© {new Date().getFullYear()} Gîte Strasbourg</p>
			</footer>
		</div>
	);
}
