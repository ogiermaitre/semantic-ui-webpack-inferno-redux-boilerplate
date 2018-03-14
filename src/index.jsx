/* inferno modules, for rendering and routing */
import { render } from 'inferno';
import { BrowserRouter, Switch, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { Provider } from 'inferno-redux'


import Page1 from './pages/page1.jsx'
import Page2 from './pages/page2.jsx'
import RootPage from './pages/rootPage.jsx'
import MenuContainer from './components/menu.jsx'
import { store } from './tools/store'

/******************************************************************************
 * The main app is just the menu, containing the main component (child)
******************************************************************************/
const browserHistory = createBrowserHistory();

/******************************************************************************
 * Return the router component, with all the routes to the pages
******************************************************************************/
const routes = (store) => (
    <Provider store={store}>
        <BrowserRouter history={browserHistory}>
            <div>
                <Switch>
                    <Route exact path='/'>
                        <MenuContainer inverted>
                            <RootPage />
                        </MenuContainer>
                    </Route>
                    <Route path='/p1'>
                        <MenuContainer inverted>
                            <Page1 />
                        </MenuContainer>
                    </Route>
                    <Route path='/p2'>
                        <MenuContainer inverted>
                            <Page2 />
                        </MenuContainer>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
);


/* Finally render the app */
render(routes(store), document.getElementById('app'))