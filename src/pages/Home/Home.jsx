import { Helmet } from "react-helmet-async";
import Slider from "./Slider/Slider";
import FeatureSection from "./FeatureSection/FeatureSection";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>EarnBuddy || Home</title>
      </Helmet>

      <Slider />
      <FeatureSection />
    </div>
  );
}
