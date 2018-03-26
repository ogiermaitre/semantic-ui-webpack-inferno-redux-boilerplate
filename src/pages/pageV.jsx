import Component from 'inferno-component'
import { connect } from 'inferno-redux'

const localMenuTree = [
    { name: 'go to root page', to: '/' },
    { name: 'go to page 1', to: '/p1' }
]

class PageV extends Component {
    constructor(props) {
        super(props)
        this.props.updateMenuTitle('page variable')
        this.props.updatePageSpecificMenu(localMenuTree)
    }

    render() {
        return (
            <div>
                <h1>Page Variable</h1>
                <span>{this.props.match.params.variable}</span>
                <div style='height:1000px;width:100%'></div>
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

export default connect(undefined, mapDispatchToProps)(PageV)