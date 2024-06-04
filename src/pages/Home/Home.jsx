import { Helmet } from "react-helmet-async";
import Slider from "../../components/Slider/Slider";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>EarnBuddy || Home</title>
      </Helmet>

      <Slider />

      <h1>home</h1>
    </div>
  );
}
