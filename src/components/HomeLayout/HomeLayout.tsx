import { useGlobalContext } from "../../store/Store";
import FilteredTagMoviesLayout from "../FilteredTagMoviesLayout/FilteredTagMoviesLayout";
import MoviesByYearLayout from "../MoviesByYearLayout/MoviesByYearLayout";
import SearchedMoviesLayout from "../SearchedMoviesLayout/SearchedMoviesLayout";

function HomeLayout() {
  const { state } = useGlobalContext();

  switch (state.currentState) {
    case "YEAR_WISE_MOVIES":
      return <MoviesByYearLayout />;
    case "FILTERS_MOVIES":
      return <FilteredTagMoviesLayout />;
    case "SEARCH_MOVIES":
      return <SearchedMoviesLayout />;
    default:
      return <MoviesByYearLayout />;
  }
}

export default HomeLayout;
