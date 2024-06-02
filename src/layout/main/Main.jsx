import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-3 flex-grow">
        <Header />

        <Outlet />
      </div>

      <footer>footer</footer>
    </div>
  );
}
