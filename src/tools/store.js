/* Import the redux stuffs */
import reducer from './reduxED.js'
import * as Raven from 'raven-js'
import { createStore, applyMiddleware } from 'redux'


/******************************************************************************
 * Now we constructs stuffs for redux
 *    - logger middleware
 *    - crash reporter (not working I think)
 *    - the store itself
******************************************************************************/
const logger = store => next => action => {
    console.log('------------------\n', action)
    let result = next(action)
    console.log('next state', store.getState(), '\n------------------')
    return result
  }
  
  const crashReporter = store => next => action => {
    try {
      return next(action)
    } catch (err) {
      console.error('Caught an exception!', err)
      Raven.captureException(err, {
        extra: {
          action,
          state: store.getState()
        }
      })
      throw err
    }
  }

/* The standard navigation menu for the whole site */
const generalMenuTree = [
    { name: 'project page', to: '/' },
    {
      name: 'Pages', children: [
        { name: 'Page 1', to: '/p1' },
        { name: 'Page 2', to: '/p2' },
      ]
    },
  ]

export const store = createStore(reducer, undefined, applyMiddleware(logger, crashReporter))


// /* Let's send the config to the menu */
store.dispatch({ type: 'SET_MENU_GENERAL', menuTree: generalMenuTree })