export interface Specie {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string; // Planet
  people: string[]; // Person
  films: string[]; // Film
  url: string;
  created: string;
  edited: string;
}