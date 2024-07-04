import React, {useEffect, useState} from 'react'
import { ExpandedCardProps } from '../../types/expanded.card.types'
import { CastList, Cast } from '../../types/movies.type'
import './ExpandedCardLayout.css'
import { getCast } from '../../apis/useGetCast'

const ExpandedCardLayout: React.FC<ExpandedCardProps> = ({ data, setExpandedCardId }) => {

  const [director, setDirector] = useState<Cast | null>(null);

  async function fetchCast() {
    try {
      let allCast: CastList = await getCast(data.id);
      let director: Cast = allCast.filter(cast => cast.job == 'Director')[0]
      setDirector(director)
    } catch (error) {
      console.log(error);
    }
  }

  const closeExpandedCard = (event:  React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if(target.className == 'expandedCardLayout') setExpandedCardId(-1);
  }

  useEffect(() => {
    fetchCast();
  }, []);

  return (
    <article className='expandedCardLayout' onClick={closeExpandedCard}>
      <div className='cardLayout'>
        <figure className='postureFigure'>
          <img className='poster' src={data.poster_path} alt='Movie Poster'/>
        </figure>
        <div className='movieContent'>
          <p>{"Movie Name: " + data.title}</p>
          <p>{"Movie Rating: " + data.vote_average}</p>
          <p>{"Movie Popularity: " + data.popularity}</p>
          <p style={{paddingBottom: "10px"}}>{"Movie Director: " + director?.name}</p>
          <p>{data.overview}</p>
          {/* {
            castList?.map(cast => (
              <p key={cast.id}>{cast.name} + {cast.department}</p>
            ))
          } */}
        </div>
      </div>
    </article>
  )
}

export default ExpandedCardLayout