import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import RouteOverview from "@/components/RouteOverview";
import DetailedSchedules from "@/components/DetailedSchedules";
import RoutePlanner from "@/components/RoutePlanner";
import FareInfo from "@/components/FareInfo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <RouteOverview />
      <DetailedSchedules />
      <RoutePlanner />
      <FareInfo />
      <Footer />
    </div>
  );
}
