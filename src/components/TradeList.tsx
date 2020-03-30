import React, { FC } from "react";

import "./TradeList.css";
import Trade from "../types/Trade";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

interface TradeListProps {
  trades: Trade[];
}

const TradeList: FC<TradeListProps> = ({ trades }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Instrument</TableCell>
            <TableCell>Sales Person</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((t: Trade) => (
            <TableRow key={t.id}>
              <TableCell>{t.instrument.name}</TableCell>
              <TableCell>{t.salesPerson.name}</TableCell>
              <TableCell>{`${t.instrument.currency.sign}${t.level.value} (${t.level.type})`}</TableCell>
              <TableCell>{`${t.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TradeList;
