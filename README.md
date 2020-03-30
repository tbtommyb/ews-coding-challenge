# EWS coding challenge

## Development notes

I have assumed that the entity created by the form submission is a trade.

### State

This task is interesting because despite being quite small it involves a few different types of state that are handled differently. In increasing order of ephemerality:

**Type-level state**: I assume that the set of possible level types changes so infrequently that they can be encoded in the type system.

**Unstateful data**: the available instruments and sales people probably do not change during runtime but might change from session to session. I assume that they will be fetched from an API. I have mimicked this by loading the dummy data from JSON in the hierarchical structure a database would output. Originally I had them in the Redux store but the lack of actions for them indicated that they did not belong there.

**Stateful data**: the trades created by the user represent the state of the application. It therefore makes sense to store them in Redux.

**UI state**: I chose to keep UI state in local component state as it did not seem necessary for that state to be stored globally. Perhaps in a more complex application the user might expect to see their UI configuration persist across refreshes, in which case it would make sense to store in Redux. I did store the `isLoading` state in Redux because this would have global, application-wide significance.

### Redux structure

On form submission a `CREATE_TRADE_REQUEST` action is dispatched. A `redux-observable` epic consumes this, emits a `SET_IS_LOADING` action, waits a second and then dispatches a `CREATE_TRADE_SUCCESS` action. The success action updates the UI. This is obviously a bit contrived but demonstrates how an API request would be handled asynchronously. The `SET_IS_LOADING` action isn't strictly required, since the `isLoading` state could just be set by `CREATE_TRADE_REQUEST`, but I wanted to demonstrate the pattern.

For simplicity's sake I chose to pass around full child entities (e.g. an instrument holds a full currency object). Normalising the data and storing IDs instead would entail passing around smaller blobs of data but this did not seem to be an urgent optimisation.

### Testing

I used `create-react-app`'s built-in `testing-library` for testing. It focuses on testing user-visible behaviour. I do use some mocking to check that actions and events are dispatched correctly. The closest I come to end-to-end testing is setting a few values and testing that the correct `CREATE_TRADE_REQUEST` action is dispatched. I think this is sufficient given the unit tests for the components and reducers but full end-to-end testing would be useful in a more complex application.

The epic has a basic marble test.

### UI

I have used a standard Material UI approach. I have assumed that users would want to be able to use the keyboard to input data but are not interested in using the application on their phones.

I have assumed that the instruments and sales people can be identified in the selects by their name. If this is not sufficient the values could be easily amended to include line of business, currency etc. I have assumed that two decimal places is sufficient.

## Available Scripts

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
