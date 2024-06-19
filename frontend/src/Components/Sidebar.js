import React, { useState, useEffect } from "react";
import { Container, Col, Nav, Spinner, Button } from 'react-bootstrap';
import { socket } from "../socketioUtils/socketioUtils.js";
import axios from "axios";

const Sidebar = () => {
  const initialLandingsList = [];
  const initialTakeoffsList = [];

  const [landingsList, setLandingsList] = useState(initialLandingsList);
  const [takeoffsList, setTakeoffsList] = useState(initialTakeoffsList);
  const [loadingLandings, setLoadingLandings] = useState(true);
  const [loadingTakeoffs, setLoadingTakeoffs] = useState(true);
  
  const handleRun = async () => {
    try {
      await axios.post("/api/v1/logics/run");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = async () => {
    try {
      await axios.post("/api/v1/logics/reset");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleLandingsListUpdate = (data) => {
      setLandingsList(data);
      setLoadingLandings(false);
    };

    const handleTakeoffsListUpdate = (data) => {
      setTakeoffsList(data);
      setLoadingTakeoffs(false);
    };

    socket.on(`landingsListUpdate`, handleLandingsListUpdate);
    socket.on(`takeoffsListUpdate`, handleTakeoffsListUpdate);

    return () => {
      socket.off(`landingsListUpdate`, handleLandingsListUpdate);
      socket.off(`takeoffsListUpdate`, handleTakeoffsListUpdate);
    };
  }, []);

  return (
    <Container className="bg-white text-primary p-3">
      <Col>
        <h5 className="mb-3">Landings</h5>
        <Nav defaultActiveKey="/home" className="flex-column">
          {loadingLandings ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            landingsList.map((plain) => (
              <span key={plain._id}>{plain.model}</span>
            ))
          )}
        </Nav>
      </Col>
      <Col>
        <h5 className="mb-3">Takeoffs</h5>
        <Nav defaultActiveKey="/home" className="flex-column">
          {loadingTakeoffs ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            takeoffsList.map((plain) => (
              <span key={plain._id}>{plain.model}</span>
            ))
          )}
        </Nav>
      </Col>
      <Button className="my-2 " variant="primary" onClick={handleRun}>Run</Button>
      <Button className="my-2 " variant="danger" onClick={handleReset}>Reset</Button>
    </Container>
  );
};

export default Sidebar;
