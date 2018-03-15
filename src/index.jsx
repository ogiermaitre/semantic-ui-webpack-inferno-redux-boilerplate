/* inferno modules, for rendering and routing */
import { render } from 'inferno';
import { BrowserRouter, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { Provider } from 'inferno-redux'


import Page1 from './pages/page1.jsx'
import Page2 from './pages/page2.jsx'
import PageV from './pages/pageV.jsx'
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
const routes = st =>
    <Provider store={st}>
        <BrowserRouter history={browserHistory}>
            <MenuContainer>
                <Route exact path='/' component={RootPage} />
                <Route path='/p1' component={Page1} />
                <Route path='/p2' component={Page2} />
                <Route path='/pv/:variable' component={PageV} />
            </MenuContainer>
        </BrowserRouter>
    </Provider>

/* Finally render the app */
render(routes(store), document.getElementById('app'))