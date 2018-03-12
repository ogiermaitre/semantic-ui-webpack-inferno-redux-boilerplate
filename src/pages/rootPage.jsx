import Component from 'inferno-component'

import VersionComponent from '../components/VersionComponent.jsx'

const localMenuTree = [{name:'go to root page',to:'/'}]

class RootPage extends Component{
    constructor(props){
        super(props)
        this.props.updateTitle('Root Page')
        this.props.updateMenu(localMenuTree)        
    }
    render(){
        return <VersionComponent/>
    }
}

export default RootPage