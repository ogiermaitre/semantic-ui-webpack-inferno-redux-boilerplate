import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';
import { connect } from 'inferno-redux'
import classNames from 'classnames'

import 'semantic/definitions/modules/sidebar';
import 'semantic/definitions/modules/accordion';
import 'semantic/definitions/modules/dropdown';
import 'semantic/definitions/modules/transition';



import cssSemantic from 'semantic/semantic.less';
import cssMenu from '../../assets/css/menu.less'

/******************************************************************************
 * This is what defines phone menu items
******************************************************************************/
const PhoneMenuItem = ({ content }) =>
	content.children ?
		<div className="ui item">
			<div className="text">{content.name}</div>
			<div className="menu">
				{content.children.map(e => <PhoneMenuItem content={e} />)}
			</div>
		</div>
		: <a href="" class="item">{content.icon && <i class={content.icon + ' icon'} />}{content.name}</a>

const PhoneMenu = ({ menuTree,title,inverted }) =>
	<div class="phone only narrow row">
		<div className={classNames("ui navbar menu",{inverted})}>
			<span  class="brand item">{title}</span>
			{/* <span class="item">{title}</span> */}
			<div class="right menu open">
				<a href="" class="menu item">
					<i class="sidebar icon"></i>
				</a>
			</div>
		</div>
		<div class="ui vertical navbar menu" style='display:none'>
			{menuTree.map(e => <PhoneMenuItem content={e} />)}
		</div>
	</div>

/******************************************************************************
 * This part define the menu for tablet mode
******************************************************************************/
const TabletMenuItem = ({ content }) =>
	content.children?
			<a class="ui dropdown item inverted">{content.name}
				<i class="dropdown icon"></i>
				<div class="menu">
					{content.children.map(e => <TabletMenuItem content={e} />)}
				</div>
			</a>
		:(<a href="" class="item">{content.icon && <i class={content.icon + ' icon'} />}{content.name}</a>)

const TabletMenu = ({ menuTree,title,inverted }) =>
	<div class="cusTablet only row">
		<div className={classNames("ui menu navbar",{inverted})}>
			<span class="brand item">{title}</span>
			{menuTree.map(e => <TabletMenuItem content={e} />)}

			<div class="right menu">
				<a href="" class="active item">Default</a>
				<a href="" class="item">Static top</a>
				<a href="" class="item">Fixed top</a>
			</div>
		</div>
	</div>

/******************************************************************************
 * This part define the element for the sidebar Menu (the one shown when
 * the app is in middle width mode.)
******************************************************************************/
/** 
 * Generate recursivelly if needed a menu structure for a sidebar Menu
 * 
 * @param {Object} component: the tree (or subtree) for which we will generate a tree
 *
 * @return {Component} The Component to put in the DOM related to the passed structured
 *
 * @author Ogier Maitre
 * @date 14:24:51-16 nov. 2017 
 */
const DisplayMenuItem = ({ content }) => {
	if (content.children) {
		return (
			<div class="item ntoggle">
				<div className="ui title item ntoggle">
					{content.name}
					<i class="dropdown icon"></i>
				</div>
				<div className="content">
					<div className="vertical menu">
						{content.children.map(e => <DisplayMenuItem content={e} />)}
					</div>
				</div>
			</div>
		)
	}
	else {
		return (<Link to={content.to} class="item">{content.icon && <i class={content.icon + ' icon'} />}{content.name}</Link>)
	}
}

const DisplayMenu = ({ menuTree,inverted }) =>
	<div className={classNames("ui left vertical menu sidebar display only",{inverted})}>
		<div class="ui accordion">
			{menuTree.map(e => <DisplayMenuItem content={e} />)}
		</div>
	</div>

const DisplayMenuTitleBar =({inverted,title}) =>
	<div className={classNames("ui fixed menu display only", { inverted })} >
		<a class="ui item button" id="mainmenubutton"><i class="icon list layout"></i>Menu</a>
		<div class='item'>{title}</div>
	</div>

/******************************************************************************
 * This is where the tocMenu is defined (the one shown when the window 
 * is very width)
******************************************************************************/
const WideDisplayMenu = ({ menuTree }) =>
	<div class="toc tocMenu wideDisplay only">
		<div class="ui vertical inverted sticky menu accordion">
			{menuTree.map(e => <DisplayMenuItem content={e} />)}
		</div>
	</div>

/** 
 * This class generate a responsive menu using semantic-ui.
 * To be responsive, the menu is composed of 3 parts:
 * 		- a bootstrap style menu for phone and narrow tablets
 * 		- a foldable sidebar for standard displays
 * 		- a fixed toc sidebar for large displays
 * 
 * @author Ogier Maitre
 * @date 14:24:51-16 nov. 2017 
 */
class SmartMenu extends Component {

	constructor(props) {
		super(props)

		this.menuTest = [
			{name:'sunbursts',children:[
				{name:'test1',to:'/sunburst'}
			]},
			{
				name: 'sous-menu', icon: 'dropdown', children: [
					{ name: 'item 1.1' },
					{ name: 'item 1.1' },
					{ name: 'item 1.1' },
					{
						name: 'subsub-menu', children: [
							{ name: 'item 1.1' },
							{ name: 'item 1.1' },
							{ name: 'item 1.1' },
						]
					}
				]
			},
			{ name: 'item 2' },
			{ name: 'item 3', icon: 'grid layout' },
		]
	}

	/** 
	 * Render function for the menu object, outputing the menuTree into differents menu, to allow reactive rendering
	 * 
	 * @param {VNode} child: This parameter is intended to be the content of the page, as semantic-ui wants the sidebar menu to wrap the content into a pusher.
	 *
	 * @return {string[]} 
	 *
	 *
	 * @author Ogier Maitre
	 * @date 14:24:51-16 nov. 2017 
	 */
	render({ child, inverted }) {		
		const childWithProps = Inferno.cloneVNode(child, { updateTitle:this.props.updateMenuTitle,updateMenu:this.props.updatePageSpecificMenu })

		return (
			<div id="sidebarcontext">
				<DisplayMenu menuTree={this.props.data.tree} title={this.props.data.title} inverted={inverted}/>
				<div class="pusher page">
					<DisplayMenuTitleBar inverted={inverted} title={this.props.data.title}/>

					<div className="full height">
						<WideDisplayMenu menuTree={this.props.data.tree} />
						<div className="article ui">
							<div class="ui grid">
								<TabletMenu menuTree={this.props.data.tree} title={this.props.data.title} inverted={inverted}/>
								<PhoneMenu menuTree={this.props.data.tree} title={this.props.data.title} inverted={inverted}/>
							</div>
							<div id="innerbody" class="ui main text" >
								{childWithProps}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	componentDidMount() {
		$('div.sidebar').sidebar({ context: '#sidebarcontext' }).sidebar('attach events', '.sidebar.menu .item:not(.ntoggle)').sidebar('attach events', '#mainmenubutton');

		$('.right.menu.open').on("click", function (e) {
			e.preventDefault();
			$('.ui.vertical.menu').toggle();
		});

		$('.ui.accordion').accordion();
		$('.ui.dropdown').dropdown();
	}

	componentDidUpdate() {
		console.log('menu: update')
	}
}

const mapStateToProps = (state) => ({ data: state.menu })
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
		updatePageSpecificMenu:(menuTree)=>{
            dispatch({type:'SET_MENU_PAGE-SPECIFIC',menuTree})
        },
        updateMenuTitle:(title)=>{
            dispatch({type:'SET_MENU_TITLE',title})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartMenu)