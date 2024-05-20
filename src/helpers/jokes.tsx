interface Joke {
  id: number;
  joke: string;
  author: string;
}

const jokes: Joke[] = [
  {
    id: 1,
    joke: 'Today I learned that changing random stuff until your program works is "hacky" and a "bad coding practice" but if you do it fast enough it\'s "Machine Learning" and pays 4x your current salary.',
    author: "William Shakespeare",
  },
  {
    id: 2,
    joke: "This line doesn't actually do anything, but the code stops working when I delete it.",
    author: "Napoleon Bonaparte",
  },
  {
    id: 3,
    joke: "why do python programmers wear glasses? - Because they can't C.",
    author: "Abraham Lincoln",
  },
  {
    id: 4,
    joke: "There are only 10 kinds of people in this world: those who know binary and those who don't.",
    author: "Marie Curie",
  },
  {
    id: 5,
    joke: "Debugging is like being the detective in a crime movie where you're also the murderer at the same time.",
    author: "Thomas Edison",
  },
  {
    id: 6,
    joke: "Why do Java programmers hate communism? - They don't want to live in a classless society.",
    author: "Albert Einstein",
  },
  {
    id: 7,
    joke: '"Knock, knock."\n"Who\'s there?"\n\n[very long pause]\n\n"Java."',
    author: "Winston Churchill",
  },
  {
    id: 8,
    joke: "Saying that Java is nice because it works on every OS is like saying that anal sex is nice because it works on every gender.",
    author: "Pablo Picasso",
  },
  {
    id: 9,
    joke: "Documentation is like sex:\nWhen it's good, it's very good.\nWhen it's bad, it's better than nothing...",
    author: "Martin Luther King Jr.",
  },
  {
    id: 10,
    joke: 'A SQL statement walks into a bar and sees two tables.\nIt approaches, and asks "may I join you?"',
    author: "John F. Kennedy",
  },
  {
    id: 11,
    joke: "Why do programmers prefer dark mode? Because light attracts bugs.",
    author: "Clint Eastwood",
  },
  {
    id: 12,
    joke: "Perfect tech stack like a perfect partner. It just does not exist, so let's get to work",
    author: "Elon Musk",
  },
  {
    id: 13,
    joke: "Technical confidence comes from one of two things: ignorance or experience",
    author: "Bill Gates",
  },
  {
    id: 14,
    joke: "Copypaste is the fastest way to create bugs.",
    author: "Galileo Galilei",
  },
  {
    id: 15,
    joke: "My wife complained that I care more about coding than her. I told her that in my array of interests, she is at [1](position 1). She was satisfied.",
    author: "Bill Clinton",
  },
];

const getJoke = () => {
  return jokes[Math.floor(Math.random() * jokes.length)];
};

// eslint-disable-next-line react-refresh/only-export-components
export const JOKE: Joke = getJoke();
