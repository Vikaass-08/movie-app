import Header from "./components/Header/Header";
import HomeLayout from "./components/HomeLayout/HomeLayout";

function App() {
  return (
    <div className="container" style={{backgroundColor: "#0f172a", color: "#FFFFFF"}}>
      <Header />
      <HomeLayout/>
    </div>
  );
}

export default App;
