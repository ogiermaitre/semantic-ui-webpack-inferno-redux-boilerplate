import Component from 'inferno-component'
import { connect } from 'inferno-redux'

const localMenuTree = [
    { name: 'go to root page', to: '/' },
    { name: 'go to page 1', to: '/p1' }
]

class Page2 extends Component {
    constructor(props) {
        super(props)

        this.props.updateMenuTitle('page 2')
        this.props.updatePageSpecificMenu(localMenuTree)
    }
    
    render() {
        return (
            <div>
                <h1>Page 2</h1>
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

export default connect(undefined, mapDispatchToProps)(Page2)