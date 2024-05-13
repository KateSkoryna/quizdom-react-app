import { useLoaderData } from "react-router-dom";
import { HeroComponent } from "../../components/HeroComponent/HeroComponent";
import hero from "../../assets/hero.jpg";
import { person } from "../../const/persons";
import { Joke } from "../../types/types";

export const HomePage = () => {
  const { joke, setup, delivery } = useLoaderData() as Joke;
  return (
    <>
      <HeroComponent
        joke={joke || setup + " " + delivery}
        hero={hero}
        person={person}
      />
    </>
  );
};
