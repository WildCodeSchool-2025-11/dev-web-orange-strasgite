import { createContext, type ReactNode, useContext, useState } from "react";

export type Reservation = {
	id: number;
	userId: number;
	chambreId: number;
	dateArrivee: string;
	dateDepart: string;
	nombrePersonnes: number;
	statut: "en_attente" | "validee" | "refusee";
};

type ReservationContextType = {
	reservations: Reservation[];
	ajouterReservation: (nouvelleReservation: Reservation) => void;
};
const ReservationContext = createContext<ReservationContextType | undefined>(
	undefined,
);

export function ReservationProvider({ children }: { children: ReactNode }) {
	const [reservations, setReservations] = useState<Reservation[]>([]);

	const ajouterReservation = (nouvelleReservation: Reservation) => {
		const updated = [...reservations, nouvelleReservation]; // ← Ajoute cette ligne
		console.log("✅ Nouvelle réservation ajoutée :", updated); // ← Et celle-ci
		setReservations(updated); // ← Remplace l'ancien setReservations
	};
	return (
		<ReservationContext.Provider
			value={{
				reservations: reservations,
				ajouterReservation: ajouterReservation,
			}}
		>
			{children}
		</ReservationContext.Provider>
	);
}

export function useReservations() {
	const context = useContext(ReservationContext);

	if (context === undefined) {
		throw new Error(
			"useReservations doit être utilisé dans un ReservationProvider",
		);
	}

	return context;
}
