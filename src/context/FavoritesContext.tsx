import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface Room {
	id: string;
	name: string;
	price: number;
	image: string;
}

interface FavoritesContextType {
	favorites: Room[];
	addToFavorites: (room: Room) => void;
	removeFromFavorites: (roomId: string) => void;
	toggleFavorite: (room: Room) => void;
	isFavorite: (roomId: string) => boolean;
	favoritesCount: number;
}
const FavoritesContext = createContext<FavoritesContextType | undefined>(
	undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
	const [favorites, setFavorites] = useState<Room[]>([]);
	const [isFirstRender, setIsFirstRender] = useState(true);

	useEffect(() => {
		const savedFavorites = localStorage.getItem("strasgite-favorites");
		if (savedFavorites) {
			try {
				setFavorites(JSON.parse(savedFavorites));
			} catch (error) {
				console.error("Erreur lors du chargement des favoris:", error);
			}
		}
		setIsFirstRender(false);
	}, []);

	useEffect(() => {
		if (isFirstRender) return;
		localStorage.setItem("strasgite-favorites", JSON.stringify(favorites));
	}, [favorites, isFirstRender]);

	const addToFavorites = (room: Room) => {
		setFavorites((prev) => {
			if (prev.some((fav) => fav.id === room.id)) {
				return prev;
			}
			return [...prev, room];
		});
	};
	const removeFromFavorites = (roomId: string) => {
		setFavorites((prev) => prev.filter((room) => room.id !== roomId));
	};

	const toggleFavorite = (room: Room) => {
		if (isFavorite(room.id)) {
			removeFromFavorites(room.id);
		} else {
			addToFavorites(room);
		}
	};
	const isFavorite = (roomId: string) => {
		return favorites.some((room) => room.id === roomId);
	};
	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				addToFavorites,
				removeFromFavorites,
				toggleFavorite,
				isFavorite,
				favoritesCount: favorites.length,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	);
}
export function useFavorites() {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error("useFavorites doit être utilisé dans un FavoritesProvider");
	}
	return context;
}
