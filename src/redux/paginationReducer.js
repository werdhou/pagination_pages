const SET_PER_PAGE = "SET_PER_PAGE"

const initialState = {
    totalCount: 100,
    perPage: 10
}

export default function paginationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PER_PAGE:
            return {
                ...state,
                perPage: action.payload
            }

        default:
            return state
    }
}

export const setPerPage = (page) => ({
    type: SET_PER_PAGE,
    payload: page
})