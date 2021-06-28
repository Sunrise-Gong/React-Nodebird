import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

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

//-------------------------------------------- Faker 라이브러리로 더미데이터 생성하기
initialState.mainPosts = initialState.mainPosts.concat(
    Array(20).fill().map(() => ({
        
        id: shortId.generate(),
        
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
        },
        
        content: faker.lorem.paragraph(),
        
        Images: [{
            src: faker.image.image(),
        }],
        
        Comments: [{
            User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
            },
            content: faker.lorem.sentence(),
        }],

    })),
);

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
    return produce(state, (draft) => {
        switch (action.type) {
            //-------------------------------------- ADD_POST
            case ADD_POST_REQUEST:
                    draft.addPostLoading = true;
                    draft.addPostDone = false;
                    draft.addPostError = null;
                    break;
            case ADD_POST_SUCCESS:
                    draft.addPostLoading = false;
                    draft.addPostDone = true;
                    draft.mainPosts.unshift(dummyPost(action.data));
                    break;
            case ADD_POST_FAILURE:
                    draft.addPostLoading = false;
                    draft.addPostError = action.error;
                    break;
            //-------------------------------------- REMOVE_POST
            case REMOVE_POST_REQUEST:
                    draft.removePostLoading = true;
                    draft.removePostDone = false;
                    draft.removePostError = null;
                    break;
            case REMOVE_POST_SUCCESS:
                    draft.removePostLoading = false;
                    draft.removePostDone = true;
                    draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data); // filter 메소드는 원본을 변경하지 않는 immutable한 메소드이다.
                    break;
            case REMOVE_POST_FAILURE:
                    draft.removePostLoading = false;
                    draft.removePostError = action.error;
                    break;
            //-------------------------------------- ADD_COMMENT
            case ADD_COMMENT_REQUEST:
                    draft.addCommentLoading = true;
                    draft.addCommentDone = false;
                    draft.addCommentError = null;
                    break;
            case ADD_COMMENT_SUCCESS: {
                    const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                    post.Comments.unshift(dummyComment(action.data.content));
                    draft.addCommentLoading = false;
                    draft.addCommentDone = true;
                    break;
            }
            case ADD_COMMENT_FAILURE:
                    draft.addCommentLoading = false;
                    draft.addCommentError = action.error;
                    break;
            default:
                    break;
        }
    });
};

export default reducer;