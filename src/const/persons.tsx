const famousPersons: string[] = [
  "William Shakespeare",
  "Isaac Newton",
  "Napoleon Bonaparte",
  "Jane Austen",
  "Wolfgang Amadeus Mozart",
  "Abraham Lincoln",
  "Charles Darwin",
  "Leo Tolstoy",
  "Thomas Edison",
  "Vincent van Gogh",
  "Albert Einstein",
  "Mahatma Gandhi",
  "Marie Curie",
  "Winston Churchill",
  "Sigmund Freud",
  "Pablo Picasso",
  "Mother Teresa",
  "Martin Luther King Jr.",
  "John F. Kennedy",
  "Mao Zedong",
];

const getPerson = (): string => {
  return famousPersons[Math.floor(Math.random() * famousPersons.length)];
};

export const person: string = getPerson();
