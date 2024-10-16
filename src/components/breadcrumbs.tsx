import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const location = useLocation();  // finds current path location
  const pathnames = location.pathname.split("/").filter((x) => x); // splits path into chunks  

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link to="/">Home</Link>  {/* default case*/}
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`; // create the breadcrumb path

          return (
            <li key={to}>
              <Link to={to}>{value}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BreadCrumbs;
