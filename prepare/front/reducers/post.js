import shortId from 'shortid';

export const initialState = {
    mainPosts: [
        {
            id: 1,

            User: { id: 1, nickname: '해돋이' },

            content: '안녕하세요 트위터 짝퉁 궁금해서 가입해봤습니다~  #해시태그 #익스프레스',

            Images: [
                { id: shortId.generate(), src: 'https://bit.ly/34S7zRp' },
                { id: shortId.generate(), src: 'https://bit.ly/3uX6IJH' },
                { id: shortId.generate(), src: 'https://bit.ly/2TDFv1w' },
            ],

            Comments: [
                { User: { id: shortId.generate(), nickname: '재원' }, content: '키보드 윤활해야지~' },
                { User: { id: shortId.generate(), nickname: '선범' }, content: '여친이랑 산에 가야지~' },
            ],
        },
    ],
    imagePaths: [], // 이미지 업로드시 경로 저장
    
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null, 
};
//-------------------------------------------- ADD_POST에 사용될 더미데이터
const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: '해돋이',
    },
    Images: [],
    Comments: [],
});

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: '해돋이',
    },
});

//-------------------------------------------- 액션
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

//--------------------------------------------
export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //-------------------------------------- ADD_POST
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            };
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost(action.data), ...state.mainPosts],
                addPostLoading: false,
                addPostDone: true,
            };
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            };
        //-------------------------------------- REMOVE_POST
        case REMOVE_POST_REQUEST:
            return {
                ...state,
                removePostLoading: true,
                removePostDone: false,
                removePostError: null,
            };
        case REMOVE_POST_SUCCESS:
            return {
                ...state,
                mainPosts: state.mainPosts.filter((v) => v.id !== action.data), 
                removePostLoading: false,
                removePostDone: true,
            };
        case REMOVE_POST_FAILURE:
            return {
                ...state,
                removePostLoading: false,
                removePostError: action.error,
            };
        //-------------------------------------- ADD_COMMENT
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            };
        case ADD_COMMENT_SUCCESS: {
            const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId); 
            const post = { ...state.mainPosts[postIndex] }; 
            post.Comments = [dummyComment(action.data.content), ...post.Comments]; 
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = post;
            return {
                ...state,
                mainPosts,
                addCommentLoading: false,
                addCommentDone: true,
            };
        }
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            };
        default:
            return state;
    }
};

export default reducer;