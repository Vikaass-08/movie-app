export interface Movies {
  id: string;
  title: string;
  genre_ids: [number];
  poster_path: string;
}
export type MoviesList = Array<Movies>

export type Genre = {id: number, name: string}

export type GenreList = Array<Genre>;