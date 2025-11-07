import { useEffect, useState } from "react";
import { getFavoriteQuizes } from "../../API/api";
import { useAuthStore } from "../../store/AuthStore";
import { UserQuiz } from "../../types/types";
import UserQuizList from "./userQuizList";

const UserFavoritesComponent = () => {
  const [userFavorites, setUserFavorites] = useState<UserQuiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    const getFavorites = async (): Promise<void> => {
      setIsLoading(true);
      try {
        if (currentUser) {
          const favorites = await getFavoriteQuizes(currentUser?.favorites);
          if (favorites) {
            setUserFavorites(favorites);
          }
        }
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };
    getFavorites();
  }, [currentUser]);

  return (
    <div className="pt-3 text-center">
      <h5 className="mb-3">User Favorites</h5>
      <UserQuizList quizes={userFavorites} isLoading={isLoading} />
    </div>
  );
};

export default UserFavoritesComponent;
