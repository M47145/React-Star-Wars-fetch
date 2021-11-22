import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Info from "./components/Info";
import About from "./components/About";
import Navbar from "./components/Navbar";
import "./App.css";

import React from "react";
const App = () => {
  return (
    <main className="App">
      <h1 style={{ textAlign: "center" }}>
        Star Wars API reader
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/info" element={<Info />} />
          <Route path="/about" element={<About />} />
          <Route component={Error} />
        </Routes>
      </h1>
    </main>
  );
};
export default App;
