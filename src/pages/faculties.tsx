import NavBar from "../components/navbar";
import BreadCrumbs from "../components/breadcrumbs";
import callAPI from "../utils/apicall";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Fac { // my name sense is ass
  id: number;
  name: string;
}

const Faculties: React.FC = () => {
  const [faculties, setFaculties] = useState<Fac[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await callAPI
          .from("Faculties")
          .select("*")
          .order("name");
        if (response.data) {
          setFaculties(response.data);
        } else {
          console.error("Error fetching faculties:", response.error);
        }
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  const handleNavigation = (id: number) => { // temp navi, will update when additional information is gathered for a subpage
    navigate(`/faculties/${id}`);
  };

  return (
    <>
      <NavBar />
      <BreadCrumbs />
      <div className="hero bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Faculties</h1>
          <div className="space-y-4">
            {faculties.length > 0 ? (
              faculties.map((fac) => (
                <details
                  key={fac.id}
                  className="group bg-white border rounded-lg shadow-sm"
                  onClick={() => handleNavigation(fac.id)}
                >
                  <summary className="flex justify-between items-center px-4 py-3 cursor-pointer group-open:text-red-600">
                    <span className="font-medium text-lg text-gray-800">
                      {fac.name}
                    </span>
                  </summary>
                </details>
              ))
            ) : (
              <div>No Faculties found.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faculties;
