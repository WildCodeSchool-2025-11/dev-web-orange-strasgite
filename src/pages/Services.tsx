import contactImage from "../assets/images/service.jpg";
import AccountAvatar from "../components/AccountAvatar";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero/PageHero";
import "../styles/Services.css";
import "../styles/global.css";

export default function Services() {
	return (
		<main>
			<div className="home-header">
				<AccountAvatar />
				<BurgerMenu />
			</div>
			<PageHero
				title="Nos Services"
				subtitle="Confort, authenticité et hospitalité au cœur de Strasbourg"
				backgroundImage={contactImage}
			/>

			<div className="services-page">
				<section className="services-list">
					<div className="service-card">
						<img
							src="/images/services/petit-dejeuner.png"
							alt="Petit-déjeuner StrasGite"
							className="service-image"
						/>
						<h3>Petit-déjeuner Alsacien</h3>
						<p>Produits frais, locaux et faits maison.</p>
						<p>Bretzel, Kougelhopf et charcuterie Alsacienne.</p>
					</div>

					<div className="service-card">
						<img
							src="/images/services/bureau.png"
							alt="Wi-Fi haut débit"
							className="service-image"
						/>
						<h3>Accès parlementaires</h3>
						<p>Lieu confidentiel dédié aux travaux et rencontres des élus.</p>
						<p>
							Structure d’accueil pour réunions, séminaires et séjours
							institutionnels.
						</p>
					</div>

					<div className="service-card">
						<img
							src="/images/services/parking.png"
							alt="Parking privé"
							className="service-image"
						/>
						<h3>Parking Privé</h3>
						<p>
							Parking privé et sécurisé proposant un service de location pour
							faciliter les déplacements des clients.
						</p>
					</div>
					<div className="service-card">
						<img
							src="/images/services/jardin.png"
							alt="Jardin fleuri"
							className="service-image"
						/>
						<h3>Jardin fleuri</h3>
						<p>
							Jardin fleuri privé aménagé avec terrasse, espaces de détente et
							coin petit-déjeuner en plein air.
						</p>
					</div>
					<div className="service-card">
						<img
							src="/images/services/checkin.jpg"
							alt="check-in"
							className="service-image"
						/>
						<h3>Check-in Check-out flexible</h3>
						<p>
							Check-in et check-out adaptables pour plus de liberté pendant
							votre séjour
						</p>
					</div>
					<div className="service-card">
						<img
							src="/images/services/conciergerie.png"
							alt="concieregerie"
							className="service-image"
						/>
						<h3>Conciergerie</h3>
						<p>
							service de conciergerie personnalisé. Réservation de restaurants,
							organisation d'activités, courses à domicile..
						</p>
					</div>
				</section>
			</div>
			<Footer />
		</main>
	);
}
