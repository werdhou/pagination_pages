const SET_PER_PAGE = "SET_PER_PAGE"
const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE"

const initialState = {
    totalCount: 100,
    perPage: 10,
    activePage: 1
}

export default function paginationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PER_PAGE:
            return {
                ...state,
                perPage: action.payload
            }
        case SET_ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.payload
            }
        default:
            return state
    }
}

export const setPerPage = (page) => ({
    type: SET_PER_PAGE,
    payload: page
})

export const setActivePage = (activePage) => ({
    type: SET_ACTIVE_PAGE,
    payload: activePage
})