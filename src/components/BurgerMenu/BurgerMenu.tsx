import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BurgerMenu.css";

export default function BurgerMenu() {
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!target.closest(".burger-container")) {
				setOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	return (
		<div className="burger-container">
			<button
				type="button"
				className="burger-icon"
				onClick={() => setOpen((prev) => !prev)}
				aria-label="Menu"
			>
				<span />
				<span />
				<span />
			</button>

			<nav className={`burger-menu ${open ? "open" : ""}`}>
				<ul>
					<li>
						<Link to="/" onClick={() => setOpen(false)}>
							Accueil
						</Link>
					</li>
					<li>
						<Link to="/Rooms" onClick={() => setOpen(false)}>
							Chambres
						</Link>
					</li>
					<li>
						<Link to="/Services" onClick={() => setOpen(false)}>
							Services
						</Link>
					</li>
					<li>
						<Link to="/Tourism" onClick={() => setOpen(false)}>
							Tourisme
						</Link>
					</li>
					<li>
						<Link to="/Contact" onClick={() => setOpen(false)}>
							Contact
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
