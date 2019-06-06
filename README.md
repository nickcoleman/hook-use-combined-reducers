# useCombinedReducers React Hook

Custom hook to combine multiple useReducer hooks into a single state container with one dispatch function. Use at top-level. Pass dispatch function and state down via props or [React's Context API](https://reactjs.org/docs/context.html) with Provider and Consumer/useContext.

## Installation

`npm install @nickcoleman/use-combined-reducers`
or
`yarn add @nickcoleman/use-combined-reducers`

## Usage

Use `useCombinedReducers()` to combine multiple useReducers into a single `state` object and a global `dispatch`.

```
import React, { useReducer } from 'react';
import useCombinedReducers from '@nickcoleman/use-combined-reducers';

...

const App = () => {
  const [state, dispatch] = useCombinedReducers({
    myWidgets: useReducer(widgetsReducer, initialState.widgets),
    myThings: useReducer(thingsReducer, initialState.things),
  });

  const { myWidgets, myOtherWidgets } = state;

  ...
}

export default App;
```

## Usage Example - Passing state and dispatch

Pass `state` and `dispatch` down via [React's Context API](https://reactjs.org/docs/context.html).

An example how I use it is shown below -- but, it's same as if you'd used a single useReducer to generate state and dispatch.

---

### 1. Setup Context

In `src/context.js`

```
import { createContext } from "react"

export default createContext()
```

In `src/hooks.js`.
I find personally find `useAppContext()` easier to use/understand than using a pure Consumer/useContext pattern within my components.

```
import { useContext } from "react"
import Context from "src/context"

export const useAppContext = () => useContext(Context)
```

---

### 2. Setup Parent Component

In your top-level React component ... this could be either your entry file (as shown) or the parent component of a component tree you want to pass context on:

```
import React, { useReducer } from 'react';
import useCombinedReducers from '@nickcoleman/use-combined-reducers';

import Context from 'src/context';
import SomeComponent from 'src/components/SomeComponent'

import { widgetsReducer, thingsReducer, initialState } from 'store/reducers'

const App = () => {
  const [state, dispatch] = useCombinedReducers({
    myWidgets: useReducer(widgetsReducer, initialState.widgets),
    myThings: useReducer(thingsReducer, initialState.things),
  });

  return (
    <Context.Provider value={{ state, dispatch }}>
      <SomeComponent />
    </Context.Provider>
  );
}

export default App;
```

---

### 3. Setup Child Component

Example of a child component which consumes the context. This child must sit below the parent provider in the component tree.

I'm a huge fan of the [reducks](https://github.com/alexnm/re-ducks) pattern (and the redux pattern in general). And, adapted that pattern to using hooks. It took me awhile to figure out how to get dispatch to work using that pattern. So, I've also shown an example of passing `dispatch` if you use a hooks/context version of the reducks pattern or another pattern that splits-out non-action creator logic into a seperate file.

```
import React, { useContext } from 'react';

import { useAppContext } from 'src/hooks.js';
import * as actions from 'store/actions'
import * as operations from 'store/operations' // if using reducks patern with hooks

function SomeComponent() {
  const { state, dispatch } = useAppContext();

  const { myWidgets, myThings } = state;

  const addWidget = widget => {
    dispatch(action.addWidget(widget))
  }

  // example if using a reducks pattern.
  const addThing = thing => {
    operations.addThing({ thing, dispatch })
  }

  return (
    <div>
      ...
    </div>
  );
};

export default SomeComponent
```

For reducks, the operations file method might look like this if you needed to access an external api:

```
const addThing = async ({thing, dispatch}) => {
  dispatch(loadingAction({ loading: true })
  try {
    const data = await api.fetchUpdatedThings(thing)  // make call to external endpoint
    dispatch(addThingAction({data, loading: false}))
  } catch (error) {
    dispatch(errorAction(error)
  }
}
```
