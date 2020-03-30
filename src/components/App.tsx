import React, { FC } from "react";
import { useSelector } from "react-redux";
import "./App.css";

import TradeForm from "./TradeForm";
import TradeList from "./TradeList";

import { RootState } from "../store/reducers";

import instruments from "../data/instruments.json";
import salesPersons from "../data/salesPersons.json";
import Instrument from "../types/Instrument";

const App: FC = () => {
  const tradeState = useSelector((state: RootState) => state.tradeState);
  const isLoading = useSelector(
    (state: RootState) => state.systemState.isLoading
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>JP Morgan Chase :: EWS :: Coding challenge</h1>
      </header>
      <TradeForm
        instruments={instruments as Instrument[]}
        salesPersons={salesPersons}
        isLoading={isLoading}
      />
      <TradeList trades={tradeState.trades} />
    </div>
  );
};

export default App;
