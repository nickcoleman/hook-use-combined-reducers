# useCombinedReducers React Hook

Custom hook to combine all useReducer hooks into a one global state container with one dispatch function. Use at top-level. Pass dispatch function and state down via props or [React's Context API](https://reactjs.org/docs/context.html) with Provider and Consumer/useContext.

## Installation

`npm install @nickcoleman/use-combined-reducers`

## Usage

Create a single state object and a global dispatch function by combining multiple `useReducer` hooks within a `useCombinedReducers`:

```
import React, { useReducer } from 'react';
import useCombinedReducers from '@nickcoleman/use-combined-reducers';

const App = () => {
  const [state, dispatch] = useCombinedReducers({
    myWidgets: useReducer(widgetsReducer, initialWidgets),
    myThngs: useReducer(thingsReducer, initialThings),
  });

  const { myWidgets, myOtherWidgets } = state;

  ...
}

export default App;
```

You can pass state and dispatch function down via props or [React's Context API](https://reactjs.org/docs/context.html). Passing it down with context is demonstrated below.

In `src/context.js`

```
import { createContext } from "react"

export default createContext()
```

In `src/hooks.js`

```
import { useContext } from "react"
import Context from "src/context"

export const useAppContext = () => useContext(Context)
```

In your top-level React component (or any other component above a component tree which needs managed state):

```
import React, { useReducer } from 'react';
import useCombinedReducers from '@nickcoleman/use-combined-reducers';

import { Context } from 'src/context';

const App = () => {
  const [state, dispatch] = useCombinedReducers({
    myWidgets: useReducer(widgetsReducer, initialWidgets),
    myThings: useReducer(thingsReducer, initialThings),
  });

  return (
    <Context.Provider value={{ state, dispatch }}>
      <SomeComponent />
    </Context.Provider>
  );
}

export default App;
```

In a component which sits below the state/dispatch providing component:

```
import React, { useContext } from 'react';

import { useAppContext } from 'src/hooks.js';

export default () => {
  const { state, dispatch } = useAppContext();

  const { myWidgets, myThings } = state;

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
