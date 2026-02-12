import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";
import { ReservationProvider } from "./context/ReservationContext";

const rootElement = document.getElementById("root");

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<AuthProvider>
				<ReservationProvider>
					<FavoritesProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</FavoritesProvider>
				</ReservationProvider>
			</AuthProvider>
		</React.StrictMode>,
	);
}
