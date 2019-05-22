# useCombinedReducers React Hook

Custom hook to combine all useReducer hooks for one global state container with one dispatch function. Use at top-level. Pass dispatch function and state down via props or [React's Context API](https://reactjs.org/docs/context.html) with Provider and Consumer/useContext.

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

You can pass state and dispatch function down via props or [React's Context API](https://reactjs.org/docs/context.html). Passing it down via props is straight forward. Passing it down with context is demonstrated below.

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
    myWidgets: useReducer(todoReducer, initialTodos),
    myOtherWidgets: useReducer(stuffReducer, initialStuff),
  });

  return (
    <Context.Provider value={{ state, dispatch }}>
      <SomeComponent />
    </Context.Provider>
  );
}

export default App;
```

In some other component which sits below the state/dispatch providing component:

```
import React, { useContext } from 'react';

import { Context } from 'src/context.js';

export default () => {
  const { state, dispatch } = Context;

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
