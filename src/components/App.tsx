import React, { FC } from "react";
import "./App.css";

import TradeForm from "./TradeForm";

const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JP Morgan Chase :: EWS :: Coding challenge</h1>
      </header>
      <TradeForm/>
    </div>
  );
};

export default App;
