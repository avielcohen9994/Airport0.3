import { GetRenderedStations } from "../../Utils/context.js";
import { useState , useEffect } from "react";
import Row from "react-bootstrap/Row";
import Station from "../Station.js";
import Sidebar from "../Sidebar.js";
import axios  from "axios";
import Cookies from "js-cookie";
import UnAuthorised from "../UnAuthorised.js";
const Airport = () => {
  let stations = GetRenderedStations();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = Cookies.get("jwt");
        console.log(`token: ${token}`);
        
        if (token) {
          const response = await axios.post("/api/v1/auth/verifyToken", { token });
          
          if (response.data.valid) {
            setLoggedIn(true); // If token is valid, set loggedIn to true
          } else {
            setLoggedIn(false); // If token is not valid, set loggedIn to false
          }
        } else {
          setLoggedIn(false); // If token is not present, set loggedIn to false
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setLoggedIn(false); // If there's an error (like a network error), set loggedIn to false
      }
    };
  
    verifyToken(); // Call the async function
  }, []);

  return (
    loggedIn ? (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flexGrow: 1 }}>
          {typeof stations === "undefined" ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <Row xs={1} md={2} className="g-4">
              {stations.map((st) => (
                <Station key={st._id} st={st} />
              ))}
            </Row>
          )}
        </div>
      </div>
    ) : (
      <UnAuthorised />
    )
  );
  };

export default Airport;
