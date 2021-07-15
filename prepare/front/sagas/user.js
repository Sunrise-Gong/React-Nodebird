import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { 
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, 
    UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
    LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE,
    LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
    REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE,
} from '../reducers/user';

//-------------------------------------------------- REMOVE_FOLLOWER
function removeFollowerAPI(data) { return axios.delete(`/user/follower/${data}`); }

function* removeFollower(action) {
    try {
        const result = yield call(removeFollowerAPI, action.data);

        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchRemoveFollower() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

//-------------------------------------------------- LOAD_FOLLOWERS
function loadFollowersAPI() { return axios.get('/user/followers'); }

function* loadFollowers(action) {
    try {
        const result = yield call(loadFollowersAPI, action.data);

        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

//-------------------------------------------------- LOAD_FOLLOWINGS
function loadFollowingsAPI() { return axios.get('/user/followings'); }

function* loadFollowings(action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data);

        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

//-------------------------------------------------- CHANGE_NICKNAME
function changeNicknameAPI(data) {
    return axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action) {
    try {
        const result = yield call(changeNicknameAPI, action.data);

        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

//-------------------------------------------------- LOAD_USER
function loadUserAPI() {
    return axios.get('/user');
}
function* loadUser() {
    try {
        const result = yield call(loadUserAPI);

        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOAD_USER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

//-------------------------------------------------- LOG_IN
function logInAPI(data) {
    //return axios.post('http://localhost:3065/user/login', data);
    return axios.post('/user/login', data);
}
function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);

        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

//-------------------------------------------------- LOG_OUT
function logOutAPI() {
    return axios.post('/user/logout');
}
function* logOut() {
    try {
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
}
function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

//-------------------------------------------------- SIGN_UP
function signUpAPI(data) {
    return axios.post('/user', data); 
}
function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        // yield delay(1000);
        console.log(result);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

//-------------------------------------------------- FOLLOW
function followAPI(data) { return axios.patch(`/user/${data}/follow`); }

function* follow(action) {
    try {
        const result = yield call(followAPI, action.data);
        yield put({
            type: FOLLOW_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}
function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

//-------------------------------------------------- UNFOLLOW
function unfollowAPI(data) { return axios.delete(`/user/${data}/follow`); }

function* unfollow(action) {
    try {
        const result = yield call(unfollowAPI, action.data);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: result.data, // 현 게시글 작성자 아이디
        });
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}
function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

//-------------------------------------------------- userSaga
export default function* userSaga() {
    yield all([
        fork(watchRemoveFollower),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchChangeNickname),
        fork(watchLoadUser),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
    ]);
}