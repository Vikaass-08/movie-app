import React, { useEffect, useState } from "react";
import { ExpandedCardProps } from "../../types/expanded.card.types";
import { Cast } from "../../types/movies.type";
import "./ExpandedCardLayout.css";
import { useGetCast } from "../../apis/useGetCast";
import defaultMovieImg from "../../assets/images/defaultMovieImg.jpg";
import Loader from "../Loader/Loader";
import { useGlobalContext } from "../../store/Store";

const ExpandedCardLayout: React.FC<ExpandedCardProps> = ({
  data,
  setExpandedCardId,
}) => {
  const [director, setDirector] = useState<Cast | null>(null);
  const { loading, castList } = useGetCast(data.id);
  const { state } = useGlobalContext();
  const [genreName, setGenreName] = useState<string>("");

  const closeExpandedCard = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.className == "expandedCardLayout") setExpandedCardId(-1);
  };

  useEffect(() => {
    let director: Cast = castList.filter((cast) => cast.job == "Director")[0];
    setDirector(director);
    const genreNames: string = state.genreList
      .filter((genre) => data.genre_ids.includes(genre.id))
      .map((genre) => genre.name)
      .join(", ");
    setGenreName(genreNames);
  }, [loading]);

  return (
    <article className="expandedCardLayout" onClick={closeExpandedCard}>
      <div className="cardLayout">
        {loading ? (
          <Loader />
        ) : (
          <>
            <figure className="postureFigure">
              <img
                className="poster"
                src={data.poster_path || defaultMovieImg}
                alt="Movie Poster"
              />
            </figure>
            <div className="movieContent">
              <p>
                <span className="movieInfo">Movie Name: </span> {data.title}
              </p>
              <p>
                <span className="movieInfo">Movie Genres: </span>
                {genreName}
              </p>
              <p>
                <span className="movieInfo">Movie Rating: </span>
                {data.vote_average}
              </p>
              <p>
                <span className="movieInfo">Movie Popularity: </span>
                {data.popularity}
              </p>
              <p>
                <span className="movieInfo">Movie Director: </span>
                {director?.name}
              </p>
              <p>
                <span className="movieInfo">Movie Discription: </span>
                {data.overview}
              </p>
            </div>
          </>
        )}
      </div>
    </article>
  );
};

export default ExpandedCardLayout;
