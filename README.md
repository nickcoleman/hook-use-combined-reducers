# useCombinedReducers React Hook

Custom hook to combine all useReducer hooks into a one global state container with one dispatch function. Use at top-level. Pass dispatch function and state down via props or [React's Context API](https://reactjs.org/docs/context.html) with Provider and Consumer/useContext.

## Installation

`npm install @nickcoleman/use-combined-reducers`

## Usage

Use `useCombinedReducers()` to combine multiple useReducers to create a single `state` object and a global `dispatch` function.

```
import React, { useReducer } from 'react';
import useCombinedReducers from '@nickcoleman/use-combined-reducers';

const App = () => {
  const [state, dispatch] = useCombinedReducers({
    myWidgets: useReducer(widgetsReducer, initialWidgets),
    myThings: useReducer(thingsReducer, initialThings),
  });

  const { myWidgets, myOtherWidgets } = state;

  ...
}

export default App;
```

Pass `state` and the `dispatch` function down via [React's Context API](https://reactjs.org/docs/context.html). (An example is shown below -- but, same as if you'd generated state and dispatch from a single useReducer). You could also pass state and dispatch down via props.

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

In your top-level React component (or any other component above a component tree which needs to access the managed state):

```
import React, { useReducer } from 'react';
import useCombinedReducers from '@nickcoleman/use-combined-reducers';

import { Context } from 'src/context';
import SomeComponent from 'src/components/SomeComponent'

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

In a child component which sits below the state/dispatch providing component.

Also, shown is an example of passing `dispatch` if using a hooks/context version of the [reducks](https://github.com/alexnm/re-ducks) pattern. ( In the operations file: `const addThing = ({thing, dispatch}) => { dispatch(addThingAction(state))}` -- how I needed to pass dispatch stumped me for awhile. Hopefully saves you some time if you like that pattern.).

```
import React, { useContext } from 'react';

import { useAppContext } from 'src/hooks.js';
import * as actions from 'src/actions'
import * as operations from 'src/operations' // if using reducks patern with hooks

function SomeComponent() {
  const { state, dispatch } = useAppContext();

  const { myWidgets, myThings } = state;

  const addWidget = widget => {
    dispatch(action.addWidget(widget))
  }

  // example if using a reducks pattern
  const addThing = thing => {
    operations.addThing({ thing, dispatch })
  }

  return (
    <div>
      ....
    </div>
  );
};

export default SomeComponent
```

## Contribute

- `git clone git@github.com:nickcoleman/hook-use-combined-reducers.git`
- `cd use-combined-reducers`
- `npm install`
- `npm run test`
