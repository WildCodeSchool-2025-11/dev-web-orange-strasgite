import { Facebook, Instagram, Twitter } from "@mui/icons-material";

import Newsletter from "./Newsletter";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footerContent">
				{/* Section 1: Logo et Contact */}
				<div className="footerSection">
					<h3>Strasgite</h3>
					123 Rue de la Paix
					<br />
					67000 Strasbourg
					<br />
					France
					<p className="footerContact">
						<strong>Tél :</strong> +33 1 23 45 67 89
						<br />
						<strong>Email :</strong>
						{""}
						<a href="mailto:contact@gite-strasbourg.fr">
							contact@gite-strasbourg.fr
						</a>
					</p>
				</div>

				{/* Section 2: Navigation */}
				<div className="footerSection">
					<h3>Bienvenue</h3>
					<ul className="footerLinks">
						<li>
							<a href="/">Accueil</a>
						</li>
						<li>
							<a href="/rooms">Chambres</a>
						</li>
						<li>
							<a href="/tourism">Tourisme</a>
						</li>
						<li>
							<a href="/services">Services</a>
						</li>
						<li>
							<a href="/contact">Contact</a>
						</li>
					</ul>
				</div>

				{/* Section 3: Newsletter */}

				<Newsletter />

				{/* Section 4: Réseaux sociaux */}
				<div className="footerSection">
					<h3>Suivez-nous</h3>
					<div className="socials">
						<a
							href="https://www.facebook.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Facebook"
						>
							<Facebook />
						</a>
						<a
							href="https://www.instagram.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
						>
							<Instagram />
						</a>
						<a
							href="https://www.twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Twitter"
						>
							<Twitter />
						</a>
					</div>
				</div>
			</div>

			{/* Footer bottom */}
			<div className="footerBottom">
				<div className="footerLegal">
					<a href="/mentions-legales">Mentions Légales - CGU - Cookies</a>
				</div>
				<p className="footerCopyright">
					© 2026 Strasgite - Tous droits réservés
				</p>
			</div>
		</footer>
	);
}
