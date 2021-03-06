import Component from 'inferno-component'
import { connect } from 'inferno-redux'
import VersionComponent from '../components/VersionComponent.jsx'

const localMenuTree = [
    { name: 'go to page 1', to: '/p1' },
    { name: 'go to page 2', to: '/p2' }
]

class RootPage extends Component {
    constructor(props) {
        super(props)
        this.props.updateMenuTitle('page 1')
        this.props.updatePageSpecificMenu(localMenuTree)
    }

    render() {
        return (
            <div>
                <VersionComponent />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>
    ({
        updatePageSpecificMenu: menuTree => {
            dispatch({ type: 'SET_MENU_PAGE-SPECIFIC', menuTree })
        },
        updateMenuTitle: title => {
            dispatch({ type: 'SET_MENU_TITLE', title })
        }
    })

export default connect(undefined, mapDispatchToProps)(RootPage)