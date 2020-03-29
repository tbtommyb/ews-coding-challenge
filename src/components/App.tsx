import React, { FC } from "react";
import { useSelector } from "react-redux";
import "./App.css";

import TradeForm from "./TradeForm";

import { AppState } from "../store/types";

import instruments from "../data/instruments.json";
import salesPersons from "../data/salesPersons.json";

const App: FC = () => {
  const tradeState = useSelector((state: AppState) => state.trades);

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
