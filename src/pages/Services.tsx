import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import "../styles/global.css";
import "../styles/Services.css";

export default function Services() {
  return (
    <>
      {/* Header */}
      <div className="page-header">
        <img
  			src="/images/logo-strasgite.png"
  			alt="Logo StrasGite"
  			className="header-logo"
		/>

        <BurgerMenu />
      </div>

      <main className="services-page">
        <section className="services-hero">
          <h2 className="services-title">Nos Services</h2>
          <p className="services-subtitle">
            Confort, authenticité et hospitalité au cœur de Strasbourg
          </p>
        </section>

        <section className="services-list">
          <div className="service-card">
            <img
              src="/images/services/petit-dejeuner.png"
              alt="Petit-déjeuner StrasGite"
              className="service-image"
            />
            <h3>Petit-déjeuner</h3>
            <p>Produits frais, locaux et faits maison.</p>
          </div>

          <div className="service-card">
            <img
              src="/images/services/wifi.png"
              alt="Wi-Fi haut débit"
              className="service-image"
            />
            <h3>Wi-Fi Haut Débit</h3>
            <p>Connexion rapide et stable dans toute la maison.</p>
          </div>

          <div className="service-card">
            <img
              src="/images/services/parking.png"
              alt="Parking privé"
              className="service-image"
            />
            <h3>Parking Privé</h3>
            <p>Stationnement sécurisé à proximité immédiate.</p>
          </div>

          <div className="service-card">
            <img
              src="/images/services/jardin.png"
              alt="Jardin fleuri"
              className="service-image"
            />
            <h3>Jardin fleuri</h3>
            <p>Profitez du calme dans notre jardin verdoyant jusqu'à 23h.</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
