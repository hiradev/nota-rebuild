import SmoothScroll from "@/lib/SmoothScroll";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import Cover from "@/components/Cover";
import SpecsTransition from "@/components/SpecsTransition";
import Specs from "@/components/Specs";
import WhoTransition from "@/components/WhoTransition";
import Who from "@/components/Who";
import Paper from "@/components/Paper";
import InsideTransition from "@/components/InsideTransition";
import Inside from "@/components/Inside";
import Details from "@/components/Details";
import Colors from "@/components/Colors";
import Footer from "@/components/Footer";
import StaticExperience from "@/components/StaticExperience";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <Preloader />

      {/* Desktop animated "camera" scroll experience — >=992px.
          See globals.css .desktop-experience / .static-experience. */}
      <main className="desktop-experience">
        <div className="black-bg__wrapper">
          <Cover />
          <SpecsTransition />
          <Specs />
          <WhoTransition />
          <Who />
        </div>
        <Paper />
        <InsideTransition />
        <Inside />
        <Details />
        <Colors />
        <Footer />
      </main>

      {/* Simplified static stack below the 991px hard fork. */}
      <StaticExperience />
    </SmoothScroll>
  );
}
