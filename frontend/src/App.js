import "./App.css";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar1 from "./Components/Navbar1/Navbar1";
import Airport from "./Components/Navbar1/Airport";
import UnAuthorised from "./Components/UnAuthorised";
import AuthComponent from "./Components/Navbar1/AuthComponent";
import Cookies from "js-cookie";
import axios from "axios";

function App() {
 

  return (
    <>
      <Navbar1 />
      <Container className="mb-4" style={{ marginTop: "60px" }}>
        <Routes>
          <Route path="/Auth" element={<AuthComponent />} />
          <Route path="/" element={<AuthComponent />} />
            <Route path="/Airport" element={<Airport />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
