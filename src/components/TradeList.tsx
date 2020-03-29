import React, { FC } from "react";

import Trade from "../types/Trade";

interface TradeListProps {
  trades: Trade[]
}

const TradeList: FC<TradeListProps> = ({ trades }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Instrument</th>
          <th>Sales Person</th>
          <th>Level</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
      {trades.map((t: Trade) => (
        <tr key={t.id}>
          <td>{t.instrument.name}</td>
          <td>{t.salesPerson.name}</td>
          <td>{`${t.instrument.currency.sign}${t.level.value} (${t.level.type})`}</td>
          <td>{`${t.amount}`}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default TradeList;
