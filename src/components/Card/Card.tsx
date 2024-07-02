import './Card.css'
import { CardProps } from '../../types/card.type'


const Card: React.FC<CardProps> = ({extendedView, data}) => {

  const normalCardLayout = () => {
    return (
      <article className='normalCardLayout'>
        <div className='normalCardImage'>
          <img src={data.poster_path} alt="Movie Poster" />
        </div>
        <div className='normalCardDetails'>
          <p>{data.title}</p>
          <p>{"Rating: " + data.vote_average}</p>
        </div>
      </article>
    );
  }

  const extendedCardLayout = () => {
    return (<></>)
  }


  return ( 
    <>
      { extendedView ? extendedCardLayout(): normalCardLayout() }
    </>
    
  )
}

export default Card