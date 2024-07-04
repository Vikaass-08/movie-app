export interface Movies {
  id: number;
  title: string;
  genre_ids: [number];
  poster_path: string;
  vote_average: string;
  popularity: number;
  overview: string
}
export type MoviesList = Array<Movies>

export type CurrentPostion = "TOP" | "BOTTOM" | "BETWEEN";

export type MoviesData = {
  moviesList: MoviesList
  page: number,
  total_pages: number
}


export type Genre = { id: number, name: string }

export type GenreList = Array<Genre>;



export interface Cast {
  id: number,
  name: string,
  department?: string,
  job?: string,
}

export type CastList = Array<Cast>;