import NavBar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import StatsSection from "../components/StatsSection"
import Slider from "../components/Slider"
import Properties from "../components/Prop"
import BreicsSuitable from "../components/BreicsSuitable"
import PropertySection from "../components/PropertyListing"
import LandlordCTA from "../components/LandlordCTA"
import RentWithBreics from "../components/RentWithBreics"
import FAQAccordion from "../components/Accordion"
import SubscribeSection from "../components/SuscribeSection"
import Footer from "../components/Footer"
function Landingpage() {
  

  return (
    <>
      <NavBar />
      <HeroSection />
      <StatsSection />
      <Slider />
      <Properties />
      <BreicsSuitable />
      <PropertySection />
      <LandlordCTA />
      <RentWithBreics />
      <FAQAccordion />
      <SubscribeSection />
      <Footer />
    </>
  )
}

export default Landingpage