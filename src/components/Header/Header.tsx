import {useEffect} from "react";
import { getGenres } from "../../apis/getMovies";
import { useGlobalContext } from "../../store/Store";
import { GenreList } from "../../types/movies.type";
import Tag from "../Tag/Tag";
import './Header.css'


function Header() {
  const { state, dispatch } = useGlobalContext();

  async function setGenreInState() {
    try {
      let genreList: GenreList = await getGenres();
      dispatch({type: "SET_GENRES", genreList: genreList})
      
    } catch (error) {
      console.log(error)
    }
  }

  const selectActiveTag = (id: number) => {
    dispatch({type: "SET_SELETED_TAG", selectedTagId: id});
  }

  useEffect(() => {
    setGenreInState();
  }, [])
  


  return (
    <header className='header'>
      <h1>MOVIEFIX</h1>

      <section className="tagList">
        {state.genreList.map(genre => (
          <Tag 
            key={genre.id} 
            tagName={genre.name} 
            tagClickAction= {selectActiveTag}
            currentActive= {genre.id == state.seletedTagId}
            tagId={genre.id}
          />
        )
        )}
      </section>
      
    </header>
  )
}

export default Header