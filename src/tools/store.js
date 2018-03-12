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
    // console.log('dispatching', action)
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
      name: 'Publication', children: [
        { name: 'Institutes 2015', to: '/institutes/2015' },
        { name: 'Institutes 2016', to: '/institutes/2016' },
        { name: 'Clusters 2015', to: '/clusters/2015' },
        { name: 'Clusters 2016', to: '/clusters/2016' },
        {
          name: 'Institutes', children: [
            {
              name: '2015', children: [
                { name: 'Architecture', to: '/laboratories/2015/IA' },
                { name: 'Ingénierie de l’environnement', to: '/laboratories/2015/IIE' },
                { name: 'Ingénierie civile', to: '/laboratories/2015/IIC' },
              ]
            },
            {
              name: '2016', children: [
                { name: 'Architecture', to: '/laboratories/2016/IA' },
                { name: 'Ingénierie de l’environnement', to: '/laboratories/2016/IIE' },
                { name: 'Ingénierie civile', to: '/laboratories/2016/IIC' },
              ]
            }
          ]
        }
      ]
    },
  ]

export const store = createStore(reducer, undefined, applyMiddleware(logger, crashReporter))


// /* Let's send the config to the menu */
store.dispatch({ type: 'SET_MENU_GENERAL', menuTree: generalMenuTree })