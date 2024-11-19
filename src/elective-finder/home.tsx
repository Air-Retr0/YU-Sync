import BreadCrumbs from "../components/breadcrumbs";
import NavBar from "../components/navbar";
import ElectiveSearch from "./search";

const ElectiveHome = () => {
  return (
    <>
      <NavBar />
      <BreadCrumbs />
      <div className="hero bg-white min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <ElectiveSearch />
          </div>
        </div>
      </div>
    </>
  );
}

export default ElectiveHome;