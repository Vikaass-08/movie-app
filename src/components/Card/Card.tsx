import "./Card.css";
import { CardProps } from "../../types/card.type";
import ExpandedCardLayout from "../ExpandedCardLayout/ExpandedCardLayout";
import defaultMovieImg from '../../assets/images/defaultMovieImg.jpg'

const Card: React.FC<CardProps> = ({ data, expandedCardId, setExpandedCardId }) => {

  return (
    <>
      {expandedCardId == data.id ? (
        <ExpandedCardLayout data={data} setExpandedCardId={setExpandedCardId}/>
      ) : (
        <article className="normalCardLayout" onClick={() => setExpandedCardId(data.id)}>
          <div className="normalCardImage">
            <img src={data.poster_path || defaultMovieImg} alt="Movie Poster" />
          </div>
          <div className="normalCardDetails">
            <p>{data.title}</p>
            <p>{"Rating: " + data.vote_average}</p>
          </div>
        </article>
      )}
    </>
  );
};

export default Card;
