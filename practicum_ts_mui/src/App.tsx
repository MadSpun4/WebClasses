import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Testwork from "./components/Testwork";

function App() {
  return (
    <div>
      <Testwork list={["Владислав", "Влад", "Влидлена", "Владимир", "Артём", "Артем", "Артемий", "Артемка", "Артемушка", "Артемчик"]} />
      <Navbar active="3" />
      <Gallery />
      <Content />
      <Footer />
    </div>
  );
}
 
export default App;