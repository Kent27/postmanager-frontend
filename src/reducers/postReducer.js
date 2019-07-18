import {
  ADD_POST,
  UPDATE_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  POST_LOADING,
  SINGLE_POST_LOADING
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
  singleloading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case SINGLE_POST_LOADING:
      return {
        ...state,
        singleloading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        updateSuccess: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        updateSuccess: true
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
}
