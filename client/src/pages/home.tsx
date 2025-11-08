import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import RouteOverview from "@/components/RouteOverview";
import DetailedSchedules from "@/components/DetailedSchedules";
import FeatureGuide from "@/components/FeatureGuide";
import FareInfo from "@/components/FareInfo";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Breadcrumbs />
      <div className="pt-16">
        <Hero />
        <RouteOverview />
        <DetailedSchedules />
        <FareInfo />
        <About />
        <Footer />
      </div>
    </div>
  );
}
