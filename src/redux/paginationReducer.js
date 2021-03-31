import axios from "axios"

const SET_PER_PAGE = "SET_PER_PAGE"
const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE"
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
const SET_POSTS_PER_PAGE = "SET_POSTS_PER_PAGE"
const SET_POSTS_COUNT = "SET_POSTS_COUNT"
const SET_LOADED = "SET_LOADED"
const SET_POSTS = "SET_POSTS"

const initialState = {
    totalCount: 100,
    perPage: 10,
    activePage: 1,
    postsPerPage: 10,
    postsCount: 0,
    loading: false,
    posts: []
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
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload
            }
        case SET_POSTS_PER_PAGE:
            return {
                ...state,
                postsPerPage: action.payload
            }
        case SET_POSTS_COUNT:
            return {
                ...state,
                postsCount: action.payload
            }
        case SET_LOADED:
            return {
                ...state,
                loading: action.payload
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
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

export const setTotalCount = (postsCount) => ({
    type: SET_TOTAL_COUNT,
    payload: postsCount
})

export const setPostsPerPage = (postsCount) => ({
    type: SET_POSTS_PER_PAGE,
    payload: postsCount
})
export const setPostsCount = (allPostsCount) => ({
    type: SET_POSTS_COUNT,
    payload: allPostsCount
})

export const setLoaded = (loading) => ({
    type: SET_LOADED,
    payload: loading
})

export const setPosts = (posts) => ({
    type: SET_POSTS,
    payload: posts
})

export const fetchPosts = () => (dispatch) => {
    dispatch(setLoaded(false))
    axios.get('http://jsonplaceholder.typicode.com/posts')
        .then(({ data }) => {
            dispatch(setPosts(data))
            dispatch(setPostsCount(data.length))
        })
}