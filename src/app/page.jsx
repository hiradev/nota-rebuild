import SmoothScroll from "@/lib/SmoothScroll";
import { getHeader, getFooter, getHomepage } from "@/lib/strapi";
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

export default async function Home() {
  // Fetched once and threaded into both the desktop tree and StaticExperience
  // below, so mobile reads the same Strapi content instead of a hardcoded copy.
  const [header, footer, homepage] = await Promise.all([
    getHeader(),
    getFooter(),
    getHomepage(),
  ]);

  return (
    <SmoothScroll>
      <Header data={header} />
      <Preloader />

      <main>
        {/* Desktop animated "camera" scroll experience — >=992px.
            See globals.css .desktop-experience / .static-experience. */}
        <div className="desktop-experience">
          <div className="black-bg__wrapper">
            <Cover data={homepage.hero} />
            <SpecsTransition />
            <Specs data={homepage.specs} />
            <WhoTransition />
            <Who data={homepage.who} />
          </div>
          <Paper data={homepage.paper} />
          <InsideTransition />
          <Inside data={homepage.inside} />
          <Details data={homepage.details} />
          <Colors data={homepage.colors} />
          <Footer data={footer} nav={header.nav} />
        </div>

        {/* Simplified static stack below the 991px hard fork. */}
        <StaticExperience footer={footer} homepage={homepage} nav={header.nav} />
      </main>
    </SmoothScroll>
  );
}
