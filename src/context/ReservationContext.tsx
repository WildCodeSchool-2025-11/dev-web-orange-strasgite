import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
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
	viderReservations: () => void;
};
const ReservationContext = createContext<ReservationContextType | undefined>(
	undefined,
);

export function ReservationProvider({ children }: { children: ReactNode }) {
	const [reservations, setReservations] = useState<Reservation[]>([]);

	useEffect(() => {
		const storedReservations = localStorage.getItem("reservations");

		if (storedReservations) {
			setReservations(JSON.parse(storedReservations));
		}
	}, []);

	const saveReservations = (list: Reservation[]) => {
		setReservations(list);
		localStorage.setItem("reservations", JSON.stringify(list));
	};

	const ajouterReservation = (nouvelleReservation: Reservation) => {
		const updated = [...reservations, nouvelleReservation];
		console.log("✅ Nouvelle réservation ajoutée :", updated);
		saveReservations(updated);
	};
	const viderReservations = () => {
		setReservations([]);
		localStorage.removeItem("reservations");
	};
	return (
		<ReservationContext.Provider
			value={{
				reservations: reservations,
				ajouterReservation: ajouterReservation,
				viderReservations,
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
