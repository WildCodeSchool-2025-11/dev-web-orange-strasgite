import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import GerantDashboard from "./pages/GerantDashboard";
import Home from "./pages/Home";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";
import MesFavorisPage from "./pages/MesFavorisPage";
import MesReservationsPage from "./pages/MesReservationsPage";
import MonComptePage from "./pages/MonComptePage";
import RoomDetail from "./pages/RoomDetail";
import Rooms from "./pages/Rooms";

import Services from "./pages/Services";
import Tourism from "./pages/Tourism";

import "./styles/global.css";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/rooms" element={<Rooms />} />
			<Route path="/rooms/:roomId" element={<RoomDetail />} />
			<Route path="/services" element={<Services />} />
			<Route path="/tourism" element={<Tourism />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/gerant" element={<GerantDashboard />} />
			<Route path="/mon-compte" element={<MonComptePage />} />
			<Route path="/mes-reservations" element={<MesReservationsPage />} />
			<Route path="/mes-favoris" element={<MesFavorisPage />} />
			<Route path="/mentions-legales" element={<MentionsLegalesPage />} />
		</Routes>
	);
}
