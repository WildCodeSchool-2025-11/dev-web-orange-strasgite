import { Link } from "react-router-dom";
import "../styles/global.css";

export default function Header() {
	return (
		<header>
			<nav className="navbar">
				<h1>Gîte Strasbourg</h1>
				<div className="nav-links">
					<Link to="/">Accueil</Link>
					<Link to="/rooms">Chambres</Link>
					<Link to="/services">Services</Link>
					<Link to="/tourism">Tourisme</Link>
					<Link to="/contact">Contact</Link>
				</div>
			</nav>
		</header>
	);
}
