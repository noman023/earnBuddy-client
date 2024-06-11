import { Helmet } from "react-helmet-async";
import Slider from "./Slider/Slider";
import FeatureSection from "./FeatureSection/FeatureSection";

import HowItWorksSection from "./HowItWorks/HowItWorks";
import TopEarners from "./TopEarners/TopEarners";
import Reviews from "./Reviews/Reviews";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>EarnBuddy || Home</title>
      </Helmet>

      <Slider />
      <FeatureSection />
      <HowItWorksSection />
      <TopEarners />
      <Reviews />
    </div>
  );
}
