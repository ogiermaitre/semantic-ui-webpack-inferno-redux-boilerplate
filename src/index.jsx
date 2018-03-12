/* inferno modules, for rendering and routing */
import { render } from 'inferno';
import { Router, Link, Route, IndexRoute } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

import { Provider } from 'inferno-redux'


import LabInfos from './pages/labInfos.jsx'
import RootPage from './pages/rootPage.jsx'
import MenuContainer from './components/menu.jsx'
import { store } from './tools/store'


/******************************************************************************
 * The main app is just the menu, containing the main component (child)
******************************************************************************/
const browserHistory = createBrowserHistory();
function App({ children: child }) {
    console.log(('hey'))
    return (<MenuContainer child={child} inverted />)
}

/******************************************************************************
 * Return the router component, with all the routes to the pages
******************************************************************************/
const routes = (store) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path='labInfos/:year/:acronym' component={LabInfos} />
                <Route path="*" component={RootPage} />
            </Route>
        </Router>
    </Provider>
);


/* Finally render the app */
render(routes(store), document.getElementById('app'))