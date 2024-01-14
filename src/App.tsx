import React from "react";
import { Outlet } from "react-router-dom";
import "./app.css";

const App: React.FC = () => {
  return (
    <main className="main">
      <Outlet />
    </main>
  );
};

export default App;
