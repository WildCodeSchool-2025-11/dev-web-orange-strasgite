import { Facebook, Instagram, Twitter } from "@mui/icons-material";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footerContent">
				{/* Section 1: Logo et Contact */}
				<div className="footerSection">
					<div className="footerLogo">
						<img src="/images/logo-strasgite.png" alt="Strasgite Logo" />
					</div>
					<p className="footerAddress">
						Strasgite, Votre gîte à Strasbourg
						<br />
						123 Rue de la Paix
						<br />
						67000 Strasbourg
						<br />
						France
					</p>
					<p className="footerContact">
						<strong>Tél :</strong> +33 1 23 45 67 89
						<br />
						<strong>Email :</strong> contact@strasgite.fr
					</p>
				</div>

				{/* Section 2: Navigation */}
				<div className="footerSection">
					<h3>Strasgite</h3>
					<ul className="footerLinks">
						<li>
							<a href="/">Accueil</a>
						</li>
						<li>
							<a href="/chambres">Chambres</a>
						</li>
						<li>
							<a href="/tourisme">Tourisme</a>
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
				<div className="footerSection">
					<h3>Newsletter</h3>
					<p className="newsletterText">
						Restez informé de nos actualités et offres spéciales
					</p>
					<form className="newsletterForm">
						<input
							type="email"
							placeholder="Votre email"
							required
							aria-label="Email pour newsletter"
						/>
						<button type="submit">S'inscrire</button>
					</form>
				</div>

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
					<a href="/mentions-legales">Mentions Légales</a>
					<span className="separator">•</span>
					<a href="/politique-confidentialite">Politique de confidentialité</a>
					<span className="separator">•</span>
					<a href="/politique-cookies">Politique de cookies</a>
					<span className="separator">•</span>
					<a href="/cgv">CGV</a>
				</div>
				<p className="footerCopyright">
					© 2026 Strasgite - Tous droits réservés
				</p>
			</div>
		</footer>
	);
}
