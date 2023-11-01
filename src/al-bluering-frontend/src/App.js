// root component of app

import React from "react";
import { BrowserRouter } from "react-router-dom";
import Constructure from "./page/Constructure";
function App() {
  return (
    <BrowserRouter>
      <Constructure></Constructure>
    </BrowserRouter>
  );
}

export default App;
