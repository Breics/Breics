import '../styles/Landlord.css'
import NavBar from "../components/Navbar";
import LandLordHero from "../components/Hero";
import Statsection from "../components/Landlord/Statsection";
import WhyBreics from "../components/Landlord/WhyBreics";
import Hows from '../components/Landlord/How.jsx';
import Rental from '../components/Landlord/Rental.jsx';
import Footer from '../components/Footer.jsx';


const LandLordPage = () => {
  return (
    <>
      <section className="container">
        <NavBar />
        <LandLordHero />
        <Statsection />
        <WhyBreics />
        <Hows />
        <Rental />
        <Footer />

      </section>
    </>
  );
};

export default LandLordPage;
