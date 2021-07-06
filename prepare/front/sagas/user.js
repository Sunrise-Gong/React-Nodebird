import { all, fork, delay, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { 
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, 
    UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST,
} from '../reducers/user';

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
// function logOutAPI() {
//     return axios.post('/api/logout');
// }
function* logOut() {
    try {
        //const result = yield call(logOutAPI)
        yield delay(1000);
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
// function followAPI() {
//     return axios.post('/api/follow');
// }
function* follow(action) {
    try {
        //const result = yield call(followAPI)
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
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
// function unfollowAPI() {
//     return axios.post('/api/unfollow');
// }
function* unfollow(action) {
    try {
        //const result = yield call(unfollowAPI)
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data, // 현 게시글 작성자 아이디
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
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
    ]);
}