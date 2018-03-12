import { combineReducers } from 'redux'

const data = (state = { dataStorage: [] }, action) => {
	switch (action.type) {
		case 'DATA_LOADED':
			return {
				// ...state,
				dataStorage: [...state.dataStorage, action.dataset]
			}
			break;
		default:
			return state
	}
}


const base = (state = {}, action) => {
	switch (action.type) {
		default:
			return state
	}
}

const menu = (state = {}, action) => {
	switch (action.type) {
		case 'SET_MENU_PAGE-SPECIFIC':
			return {
				...state,
				specificPageMenu: action.menuTree,
				tree: [...action.menuTree, ...(state.generalMenu ? state.generalMenu : [])]
			}
		case 'SET_MENU_GENERAL':
			return {
				...state,
				generalMenu: action.menuTree,
				tree: [...(state.specificPageMenu ? state.specificPageMenu : []), ...action.menuTree]
			}
		case 'SET_MENU_TITLE':
			return {
				...state,
				title: action.title
			}
		default:
			return state
	}
}

export default combineReducers({ base, data, menu })
