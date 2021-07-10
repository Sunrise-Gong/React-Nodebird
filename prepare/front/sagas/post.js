import { all, takeLatest, fork, put, delay, call } from 'redux-saga/effects';
//import shortId from 'shortid';
import axios from 'axios';

import {
    LOAD_POSTS_REQUEST, 
    LOAD_POSTS_SUCCESS, 
    LOAD_POSTS_FAILURE,
    
    ADD_POST_REQUEST, 
    ADD_POST_SUCCESS, 
    ADD_POST_FAILURE,
    
    ADD_COMMENT_REQUEST, 
    ADD_COMMENT_SUCCESS, 
    ADD_COMMENT_FAILURE,

    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    
    generateDummyPost,

} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

//-------------------------------------------------- LOAD_POST
// function loadPostAPI(data) {
//     return axios.get('/api/posts', data);
// }

function* loadPosts() {
    try {
        //const result = yield call(loadPostAPI, action.data)
        yield delay(1000);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: generateDummyPost(10),
        });
    } catch (err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchLoadPosts() {
    //yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

//-------------------------------------------------- ADD_POST
function addPostAPI(data) { 
    return axios.post('/post', { content: data }); 
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        });
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

//-------------------------------------------------- REMOVE_POST
// function removePostAPI(data) {
//     return axios.post('/api/post', data);
// }

function* removePost(action) {
    try {
        //const result = yield call(removePostAPI, action.data)
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

//-------------------------------------------------- ADD_COMMENT
// ex) /POST /post/1/comment -> 게시글 아이디가 유동적인 경우 
function addCommentAPI(data) { 
    return axios.post(`/post/${data.postId}/comment`, data); 
} 

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchRemovePost),
        fork(watchAddComment),
    ]);
}

/*
------------------------ takeLatest의 문제점

takeLatest 이펙트의 문제점은 여러번의 요청이
서버로 가기 때문에 응답은 한번만 오더라도
서버에 데이터가 중복되서 저장될 수 있습니다.
그런경우 새로고침시 화면에 데이터가 중복되서 나타날수 있습니다.

------------------------ throttle로 문제해결

이 문제를 해결할 수 있는 effects가 throttle 입니다.
아래는 2초동안 한번의 요청을 받겠다는 설정 입니다.

function* watchAddPost() {
    yield throttle('ADD_POST_REQUEST', addPost, 2000);
}
------------------------ 서버검증으로 문제해결

takeLatest를 사용하면서
서버에서의 검증을 통해서 연속된 요청의 문제를 해결할 수도 있습니다.
*/