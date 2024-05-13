import { useLoaderData } from "react-router-dom";
import { HeroComponent } from "../../components/HeroComponent/HeroComponent";
import hero from "../../assets/hero.jpg";
import { PERSON } from "../../const/persons";
import { Joke } from "../../types/types";

export const HomePage = () => {
  const { joke, setup, delivery } = useLoaderData() as Joke;

  console.log(joke, setup, delivery);
  return (
    <>
      <HeroComponent
        joke={joke || setup + " " + delivery}
        hero={hero}
        person={PERSON}
      />
    </>
  );
};