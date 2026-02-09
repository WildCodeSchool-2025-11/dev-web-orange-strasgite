import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext";
import { ReservationProvider } from "./context/ReservationContext";

const rootElement = document.getElementById("root");

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<AuthProvider>
				<ReservationProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ReservationProvider>
			</AuthProvider>
		</React.StrictMode>,
	);
}
