import Component from 'inferno-component'

import VersionComponent from '../components/VersionComponent.jsx'

const localMenuTree = [
    { name: 'go to root page', to: '/' },
    { name: 'go to page 1', to: '/p1' }
]

class Page2 extends Component {
    constructor(props) {
        super(props)
        this.props.updateTitle('Page 2')
        this.props.updateMenu(localMenuTree)
    }
    render() {
        return (
            <div>
                <h1>Page 2</h1>
                <VersionComponent />
            </div>
        )
    }
}

export default Page2