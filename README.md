# useCombinedReducers React Hook

Custom hook to combine all useReducer hooks for one global state container with one dispatch function. Use at top-level and pass dispatch function (and state) down via React's Context API with Provider and Consumer/useContext.

## Installation

`npm install @nickcoleman/use-combined-reducers`

## Usage

Create a global dispatch function and state object by initializing multiple `useReducer` hooks in `useCombinedReducers`:

```
import React from 'react';
import useCombinedReducers from '@nickcoleman/use-combined-reducers';

const App = () => {
  const [state, dispatch] = useCombinedReducers({
    myTodos: React.useReducer(todoReducer, initialTodos),
    myOtherStuff: React.useReducer(stuffReducer, initialStuff),
  });

  const { myTodos, myOtherStuff } = state;

  ...
}

export default App;
```

You can pass state and dispatch function down via [props](https://www.robinwieruch.de/react-pass-props-to-component/) or [React's Context API](https://www.robinwieruch.de/react-context-api/). Since passing it down with props is straight forward, the approach with context is demonstrated here. In some file:

```
import React from 'react';

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();
```

In your top-level React component (or any other component above a component tree which needs managed state):

```
import React from 'react';
import useCombinedReducers from '@nickcoleman/use-combined-reducers';

import { StateContext, DispatchContext } from './somefile.js';

const App = () => {
  const [state, dispatch] = useCombinedReducers({
    myTodos: React.useReducer(todoReducer, initialTodos),
    myOtherStuff: React.useReducer(stuffReducer, initialStuff),
  });

  return (
    <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <SomeComponent />
        </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
```

In some other component which sits below the state/dispatch providing component:

```
import React from 'react';

import { StateContext, DispatchContext } from './somefile.js';

export default () => {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const { myTodos, myOtherStuff } = state;

  return (
    <div>
      ...
    </div>
  );
};
```

## Contribute

- `git clone git@github.com:nickcoleman/hook-use-combined-reducers.git`
- `cd use-combined-reducers`
- `npm install`
- `npm run test`
