import { useEffect, useState } from "react";
import { getFavoriteQuizes } from "../../../API/api";
import { useAuth } from "../../../context/AuthContext";
import { UserQuiz } from "../../../types/types";
import UserQuizList from "../UserQuizList/UserQuizList";

export const UserFavoritesComponent = () => {
  const [userFavorites, setUserFavorites] = useState<UserQuiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  console.log("Im Favorites");

  useEffect(() => {
    const getFavorites = async (): Promise<void> => {
      try {
        setIsLoading(true);
        if (currentUser) {
          const favorites = await getFavoriteQuizes(currentUser?.favorites);
          console.log(favorites);
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
