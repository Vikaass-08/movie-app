import { Movies } from "./movies.type";


export interface ExpandedCardProps {
  data: Movies;
  setExpandedCardId: React.Dispatch<React.SetStateAction<number>>;
}