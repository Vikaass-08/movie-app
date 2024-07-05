import { useEffect, useRef } from "react";
import { useGetGenres } from "../../customHooks/useGetGenre";
import { useGlobalContext } from "../../store/Store";
import Tag from "../Tag/Tag";
import "./Header.css";

function Header() {
  const { state, dispatch } = useGlobalContext();
  const { loading } = useGetGenres();
  const inputBoxRef = useRef<HTMLInputElement | null> (null);

  const selectActiveTag = (id: number) => {
    dispatch({ type: "SET_SELETED_TAG", selectedTagId: id });
  };

  useEffect(() => {
    if(inputBoxRef.current && state.seletedTagIds.length > 0) inputBoxRef.current.value = "";
  }, [state.seletedTagIds])

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({type: "UPDATE_SEARCH_STRING", searchString: e.target.value})
  }

  return (
    <header className="header">
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        <div className="brand">
         <p className="brandName">MOVIEFIX</p>
        </div>
        <div className="inputBox">
          <input ref={inputBoxRef} type="text" name="searchText" id="searchText" placeholder="Search Movies" onChange={handleSearch} />
        </div>
      </div>

      <section className="tagList">
        {!loading &&
          state.genreList.map((genre) => (
            <Tag
              key={genre.id}
              tagName={genre.name}
              tagClickAction={selectActiveTag}
              currentActive={state.seletedTagIds.includes(genre.id)}
              tagId={genre.id}
            />
          ))}
      </section>
    </header>
  );
}

export default Header;
