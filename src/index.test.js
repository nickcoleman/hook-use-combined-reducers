import { describe, it } from 'mocha'
import { expect } from 'chai'
import { spy } from 'sinon'

import useCombinedReducers from '.'

describe('useCombinedReducer', () => {
  it('returns a combined state object', () => {
    const [state] = useCombinedReducers({
      widget: ['myWidget', () => {}],
      thing: ['myThing', () => {}],
    })

    expect(state).to.eql({ widget: 'myWidget', thing: 'myThing' })
  })

  it('returns a combined dispatch function', () => {
    const widgetDispatchCallback = spy()
    const thingDispatchCallback = spy()

    const [, dispatch] = useCombinedReducers({
      widget: ['widget', widgetDispatchCallback],
      thing: ['thing', thingDispatchCallback],
    })

    dispatch({ type: 'AN_ACTION' })

    expect(widgetDispatchCallback.calledOnce).to.eql(true)
    expect(thingDispatchCallback.calledOnce).to.eql(true)
  })
})
