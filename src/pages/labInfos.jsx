import Component from 'inferno-component'
import { connect } from 'inferno-redux'

class LabInfos extends Component {
    constructor(props) {
        super(props)

        console.log('hey !!!!')
    }
    render() {
        console.log(this.props)
        return (<div>labinfo !!!</div>)
    }
}



const mapStateToProps = (state) => ({ data: state.data })
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LabInfos)