import AccountAvatar from "../components/AccountAvatar";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import "../styles/global.css";
import "../styles/Home.css";

export default function Home() {
	return (
		<>
			<div className="home-header">
				<AccountAvatar />
				<BurgerMenu />
			</div>

			<main>
				<section className="hero">
					<div className="hero-overlay">
						<div className="hero-branding">
							<img
								src="/images/logo-strasgite.png"
								alt="Logo Strasgite"
								className="hero-logo"
							/>
							<h1 className="hero-title">Strasgite</h1>
						</div>
						<p className="hero-subtitle">
							Maison d'hôtes à Strasbourg <span className="heart">♥</span>
						</p>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
