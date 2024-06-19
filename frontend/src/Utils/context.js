import { useEffect, useState } from "react";

import { socket } from "../socketioUtils/socketioUtils.js";

const GetRenderedUpdatingPlains = () => {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    socket.on("plains_changed", (plains) => {
      plains.json().then((plains) => setBackendData(plains));
    });
  }, []);
  return backendData.plains || [];
};

// const GetPlainById = (id) => {
//   const [backendData, setBackendData] = useState([{}]);

//   useEffect(() => {
//     const fetchObject = async () => {
//       try {
//         fetch(`/api/v1/plains/:${id}`) // Replace :id with the actual ID
//           .then((response) => response.json())
//           .then((plain) => setBackendData(plain));
//       } catch (error) {
//         console.error("Error fetching plain:", error);
//       }
//     };
//   });

//   return backendData || null;
// };

const GetRenderedPlains = () => {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api/v1/plains")
      .then((response) => response.json())
      .then((data) => setBackendData(data));
  }, []);

  return backendData.plains || [];
};

const GetRenderedLandings = () => {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api/v1/landings")
      .then((response) => response.json())
      .then((data) => setBackendData(data));
  }, []);

  return backendData.landingsList || [];
};

const GetRenderedTakeoffs = () => {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api/v1/takeoffs")
      .then((response) => response.json())
      .then((data) => setBackendData(data));
  }, []);

  return backendData.takeoffs || [];
};

const GetRenderedStations = () => {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api/v1/stations")
      .then((response) => response.json())
      .then((data) => setBackendData(data));
  }, []);

  return backendData.stations || [];
};

export {
  GetRenderedPlains,
  GetRenderedStations,
  GetRenderedUpdatingPlains,
  // GetPlainById,
  GetRenderedLandings,
  GetRenderedTakeoffs,
};
