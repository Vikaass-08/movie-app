import Header from "./components/Header/Header";
import MovieListLayout from "./components/MovieListLayout/MovieListLayout";

function App() {
  return (
    <div className="container" style={{backgroundColor: "#0f172a", color: "#FFFFFF"}}>
      <Header />
      <MovieListLayout/>
    </div>
  );
}

export default App;
