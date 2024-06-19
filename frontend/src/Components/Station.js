import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { socket } from "../socketioUtils/socketioUtils.js";

function Station({ st }) {
  const [updatedStation, setUpdatedStation] = useState(st);
  // const [ plain , setPlain ] = useState( GetPlainById(st.plainInStation) );

  useEffect(() => {
    const handleStationUpdate = (data) => {
      const { currentStation, targetStation } = data;
      setUpdatedStation(currentStation || targetStation);
      // setPlain(GetPlainById( updatedStation.plainInStation ))
    };

    socket.on(`stationUpdate${st._id}`, (data) => handleStationUpdate(data));
    // Cleanup socket subscription when component unmounts
    return () => {
      socket.off(`stationUpdate${st._id}`, (data) =>
        handleStationUpdate(data)
      );
    };
  }, [st._id]);

  return (
    <>
      <Col key={updatedStation._id}>
        <Card>
          <Card.Img variant="top" src={updatedStation.stationImg} />
          <Card.Body>
            <Card.Title>Station: {updatedStation.stationNumber}</Card.Title>
            <Card.Text>
              plains in station:
              {updatedStation.plainsInStation.map((p , i) => (
                <li key={i}>{p}</li>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default Station;
