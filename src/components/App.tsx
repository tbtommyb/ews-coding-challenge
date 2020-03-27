import React, { FC } from "react";
import "./App.css";

import TradeForm from "./TradeForm";

import instruments from '../data/instruments.json';
import salesPersons from '../data/salesPersons.json';

const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JP Morgan Chase :: EWS :: Coding challenge</h1>
      </header>
      <TradeForm instruments={instruments} salesPersons={salesPersons} />
    </div>
  );
};

export default App;
