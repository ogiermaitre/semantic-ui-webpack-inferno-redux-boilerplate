import Component from 'inferno-component'

import VersionComponent from '../components/VersionComponent.jsx'

const localMenuTree = [
    {name:'go to root page',to:'/'},
    {name:'go to page 2',to:'/p2'}
]

class Page1 extends Component {
    constructor(props) {
        super(props)
        this.props.updateTitle('Page 1')
        this.props.updateMenu(localMenuTree)
    }
    render() {
        return (
            <div>
                <h1>Page 1</h1>
                <VersionComponent />
            </div>
        )
    }
}

export default Page1