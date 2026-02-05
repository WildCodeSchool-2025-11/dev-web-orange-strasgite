import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import GerantDashboard from "./pages/GerantDashboard";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Services from "./pages/Services";
import Tourism from "./pages/Tourism";
import "./styles/global.css";
import RoomDetail from "./pages/RoomDetail";

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
		</Routes>
	);
}
