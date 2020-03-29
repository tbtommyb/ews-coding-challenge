import { ofType } from "redux-observable";
import { Observable, of, concat } from "rxjs";
import { mergeMap, delay } from "rxjs/operators";
import { CREATE_TRADE_REQUEST, ActionTypes } from "./types";
import { setLoading, createTradeSuccess } from "./actions";
import Trade from "../types/Trade";

const tradesEpic = (
  action$: Observable<ActionTypes>
): Observable<ActionTypes> =>
  action$.pipe(
    ofType<ActionTypes>(CREATE_TRADE_REQUEST),
    mergeMap(action => {
      return concat(
        of(setLoading()),
        of(createTradeSuccess(action.payload as Trade)).pipe(delay(1000))
      );
    })
  );

export default tradesEpic;
