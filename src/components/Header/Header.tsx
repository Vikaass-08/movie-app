import {useEffect} from "react";
import { useGetGenres } from "../../apis/useGetGenre";
import { useGlobalContext } from "../../store/Store";
import { GenreList } from "../../types/movies.type";
import Tag from "../Tag/Tag";
import './Header.css'


function Header() {
  const { state, dispatch } = useGlobalContext();
  const {loading} = useGetGenres();

  const selectActiveTag = (id: number) => {
    dispatch({type: "SET_SELETED_TAG", selectedTagId: id});
  }

  return (
    <header className='header'>
      <h1>MOVIEFIX</h1>

      <section className="tagList">
        {!loading && state.genreList.map(genre => (
          <Tag 
            key={genre.id} 
            tagName={genre.name} 
            tagClickAction= {selectActiveTag}
            currentActive= {state.seletedTagIds.includes(genre.id)}
            tagId={genre.id}
          />
        )
        )}
      </section>
      
    </header>
  )
}

export default Header