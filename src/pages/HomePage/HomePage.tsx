import { HeroComponent } from "../../components/HeroComponent/HeroComponent";
import { Outlet } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <HeroComponent />
      <Outlet />
    </>
  );
};
