import AccountAvatar from "../components/AccountAvatar";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero/PageHero";
import "../styles/Home.css";
import "../components/PageHero/PageHero.css";

import heroImage from "../assets/images/maison-strasbourg.jpg";

export default function Home() {
	return (
		<>
			<div className="home-header">
				<AccountAvatar />
				<BurgerMenu />
			</div>

			<main>
				<PageHero backgroundImage={heroImage}>
					<div className="hero-branding">
						<img
							src="/images/logo-strasgite.png"
							alt="Logo Strasgite"
							className="hero-logo"
						/>
						<h1 className="hero-title">Strasgite</h1>
					</div>
					<p className="hero-subtitle">
						Maison d'hôtes à Strasbourg<span className="heart">♥</span>
					</p>
				</PageHero>
			</main>

			<Footer />
		</>
	);
}
