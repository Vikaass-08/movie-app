export interface Movies {
  id: string;
  title: string;
  genre_ids: [number];
  poster_path: string;
  vote_average: string;
}
export type MoviesList = Array<Movies>

export type MoviesListPerYear = {
  [year: string]: MoviesList
}

export type FetchMovieYear = "NEXT_YEAR" | "PREVIOUS_YEAR";

export type Genre = {id: number, name: string}

export type GenreList = Array<Genre>;