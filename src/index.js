const useCombinedReducers = reducersObject => {
  const state = Object.keys(reducersObject).reduce(
    (stateObj, key) => ({ ...stateObj, [key]: reducersObject[key][0] }),
    {},
  )

  const dispatch = action =>
    Object.keys(reducersObject)
      .map(key => reducersObject[key][1])
      .forEach(func => func(action))

  return [state, dispatch]
}

export default useCombinedReducers
