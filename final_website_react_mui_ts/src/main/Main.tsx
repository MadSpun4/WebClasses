import Navbar from "../components/Navbar";
import Gallery from "./components/Gallery";
import Footer from "../components/Footer";
import Content from "./components/Content";

function Main() {
    return (
        <div>
            <Navbar active="1"/>
            <Gallery/>
            <Content/>
            <Footer />
        </div>
    );
}

export default Main;
