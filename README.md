# useCombinedReducers React Hook

Custom hook to combine all useReducer hooks for one global state container with one dispatch function. Use at top-level and pass dispatch function (and state) down via React's Context API with Provider and Consumer/useContext.

## Installation

`npm install @nickcoleman/use-combined-reducers`

## Usage

Create a global dispatch function and state object by initializing multiple `useReducer` hooks in `useCombinedReducers`:

```
import React, { useReducer } from 'react';
import useCombinedReducers from '@nickcoleman/use-combined-reducers';

const App = () => {
  const [state, dispatch] = useCombinedReducers({
    myWidgets: useReducer(todoReducer, initialTodos),
    myOtherWidgets: useReducer(stuffReducer, initialStuff),
  });

  const { myWidgets, myOtherWidgets } = state;

  ...
}

export default App;
```

You can pass state and dispatch function down via props or React's Context API. Since passing it down with props is straight forward, the approach with context is demonstrated here. In some file:

```
import React, { createContext } from 'react';

export const StateContext = createContext();
export const DispatchContext = createContext();
```

In your top-level React component (or any other component above a component tree which needs managed state):

```
import React, { useReducer } from 'react';
import useCombinedReducers from '@nickcoleman/use-combined-reducers';

import { StateContext, DispatchContext } from './somefile.js';

const App = () => {
  const [state, dispatch] = useCombinedReducers({
    myWidgets: useReducer(todoReducer, initialTodos),
    myOtherWidgets: useReducer(stuffReducer, initialStuff),
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
import React, { useContext } from 'react';

import { StateContext, DispatchContext } from './somefile.js';

export default () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const { myWidgets, myOtherWidgets } = state;

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
