import React, { FC } from "react";
import { useSelector } from "react-redux";
import "./App.css";

import TradeForm from "./TradeForm";
import TradeList from "./TradeList";

import { RootState } from "../store/reducers";

import instruments from "../data/instruments.json";
import salesPersons from "../data/salesPersons.json";

const App: FC = () => {
  const tradeState = useSelector((state: RootState) => state.tradeState);

  return (
    <div className="App">
      <header className="App-header">
        <h1>JP Morgan Chase :: EWS :: Coding challenge</h1>
      </header>
      <TradeForm instruments={instruments} salesPersons={salesPersons} />
      <TradeList trades={tradeState.trades}/>
    </div>
  );
};

export default App;
