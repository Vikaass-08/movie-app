import {useEffect} from "react";
import { getGenres } from "../../apis/getMovies";
import { useGlobalContext } from "../../store/Store";
import { GenreList } from "../../types/movies.type";
import Tag from "../Tag/Tag";


function Header() {
  const { state, dispatch } = useGlobalContext();

  async function setGenreInState() {
    try {
      let genreList: GenreList = await getGenres();
      console.log("Genres LIST => ", genreList)
      dispatch({type: "SET_GENRES", payload: genreList})
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setGenreInState();
    console.log(state.genreList)
  }, [])
  


  return (
    <section className='header'>
      <h1>MovieFlix</h1>

      {state.genreList.map(genre => (
        <Tag 
          key={genre.id} 
          tagName={genre.name} 
          tagClickAction={(e) => console.log(e)}
          currentActive= {genre.id == 1}
        />
      )
      )}
      
    </section>
  )
}

export default Header