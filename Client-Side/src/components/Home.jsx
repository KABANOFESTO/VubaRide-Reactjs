import About from "../pages/About";
import Banner from "../pages/Banner";
import Services from "../pages/Services";
import TabCont from "../pages/TabCont";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
// import Blogs from "../Contents/Blogs";
// import Events from "../Contents/Events";
// import Team from "../Contents/Team";


const Home = () => {
    return (
        <>
            <Banner />
            <About />
            <Services />
            <TabCont />
            <Gallery />
            <Contact />
            {/*
            <Blogs />
            <Team />
            <Events/>
            <br /><br /> */}
        </>
    );
}

export default Home;