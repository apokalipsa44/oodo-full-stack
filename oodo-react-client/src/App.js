import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import Dashboard from "./components/Dashboard";

function App() {
  return (
      <div className="App">
        <Header />
        <Dashboard />
      </div>
  );
}

export default App;
