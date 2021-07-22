import { all, takeLatest, fork, put, delay, call, throttle } from 'redux-saga/effects';
//import shortId from 'shortid';
import axios from 'axios';

import {
    LIKE_POST_REQUEST, 
    LIKE_POST_SUCCESS, 
    LIKE_POST_FAILURE,
    
    UNLIKE_POST_REQUEST, 
    UNLIKE_POST_SUCCESS, 
    UNLIKE_POST_FAILURE,
    
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS, 
    LOAD_POSTS_FAILURE,
    
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS, 
    LOAD_POST_FAILURE,
    
    ADD_POST_REQUEST, 
    ADD_POST_SUCCESS, 
    ADD_POST_FAILURE,
    
    ADD_COMMENT_REQUEST, 
    ADD_COMMENT_SUCCESS, 
    ADD_COMMENT_FAILURE,

    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,

    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    RETWEET_FAILURE,
    //generateDummyPost,

} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

//-------------------------------------------------- RETWEET
// form 데이터는 { images: data } 이렇게 감싸면 json이 되서 문제가 됩니다.
function retweetAPI(data) { return axios.post(`/post/${data}/retweet`); } 

function* retweet(action) {
    try {
        const result = yield call(retweetAPI, action.data);
        yield put({
            type: RETWEET_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: RETWEET_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchRetweet() { yield takeLatest(RETWEET_REQUEST, retweet); }

//-------------------------------------------------- UPLOAD_IMAGES
// form 데이터는 { images: data } 이렇게 감싸면 json이 되서 문제가 됩니다.
function uploadImagesAPI(data) { return axios.post('/post/images', data); } 

function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchUploadImages() { yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages); }

//-------------------------------------------------- LIKE_POST
function likePostAPI(data) { return axios.patch(`/post/${data}/like`); }

function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LIKE_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLikePost() { yield takeLatest(LIKE_POST_REQUEST, likePost); }

//-------------------------------------------------- UNLIKE_POST
function unlikePostAPI(data) { return axios.delete(`/post/${data}/like`); }

function* unlikePost(action) {
    try {
        const result = yield call(unlikePostAPI, action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchUnlikePost() { yield takeLatest(UNLIKE_POST_REQUEST, unlikePost); }

//-------------------------------------------------- LOAD_POST
function loadPostAPI(data) { return axios.get(`/post/${data}`); }

function* loadPost(action) {
    try {
        const result = yield call(loadPostAPI, action.data);

        yield put({ 
            type: LOAD_POST_SUCCESS, 
            data: result.data, 
        });
    } catch (err) {
        yield put({ 
            type: LOAD_POST_FAILURE, 
            error: err.response.data, 
        });
    }
}

function* watchLoadPost() { yield takeLatest(LOAD_POST_REQUEST, loadPost); }

//-------------------------------------------------- LOAD_POSTS
function loadPostsAPI(lastId) { return axios.get(`/posts?lastId=${lastId || 0}`); }

function* loadPosts(action) {
    try {
        const result = yield call(loadPostsAPI, action.lastId);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
    // yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

//-------------------------------------------------- ADD_POST
function addPostAPI(data) { return axios.post('/post', data); }

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
            error: err.response.data,
        });
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

//-------------------------------------------------- REMOVE_POST
function removePostAPI(data) { return axios.delete(`/post/${data}`); }

function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data,
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
        console.error(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([
        fork(watchRetweet),
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchAddPost),
        fork(watchLoadPost),
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