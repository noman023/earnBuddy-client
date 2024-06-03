import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";

export default function Dashboard() {
  return (
    <div className="container mx-auto">
      <Header />

      <div className="flex min-h-screen">
        <div className="bg-gray-200 w-1/4">
          <p>navigation</p>
        </div>

        <div className="w-3/4 flex flex-col ">
          <div className="flex-grow">
            <Outlet />
          </div>

          <FooterComponent />
        </div>
      </div>
    </div>
  );
}
