import { Movies } from "./movies.type";

export interface CardProps {
  data: Movies;
  expandedCardId: number;
  setExpandedCardId: React.Dispatch<React.SetStateAction<number>>;
}
