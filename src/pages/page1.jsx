import Component from 'inferno-component'
import { connect } from 'inferno-redux'

const localMenuTree = [
    { name: 'go to root page', to: '/' },
    { name: 'go to page 2', to: '/p2' }
]

class Page1 extends Component {
    constructor(props) {
        super(props)
        this.props.updateMenuTitle('page 1')
        this.props.updatePageSpecificMenu(localMenuTree)
    }

    render() {
        return (
            <div>
                <h1>Page 1</h1>
                <div style='height:1000px;'></div>
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

export default connect(undefined, mapDispatchToProps)(Page1)