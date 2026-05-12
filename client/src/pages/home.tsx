import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import RouteOverview from "@/components/RouteOverview";
import DetailedSchedules from "@/components/DetailedSchedules";
import FareInfo from "@/components/FareInfo";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navigation />
      <Breadcrumbs />
      <main>
        <Hero />
        <RouteOverview />
        <DetailedSchedules />
        <FareInfo />
        <About />
      </main>
      <Footer />
    </div>
  );
}
