import Component from 'inferno-component'

import VersionComponent from '../components/VersionComponent.jsx'

const localMenuTree = [
    {name:'go to page 1',to:'/p1'},
    {name:'go to page 2',to:'/p2'}
]

class RootPage extends Component {
    constructor(props) {
        super(props)
        this.props.updateTitle('Root page')
        this.props.updateMenu(localMenuTree)
    }
    render() {
        return (
            <div>
                <VersionComponent />
            </div>
        )
    }
}

export default RootPage