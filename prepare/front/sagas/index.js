import { all, fork } from 'redux-saga/effects'; // saga 의 이펙트들
import axios from 'axios';

import userSaga from './user';
import postSaga from './post';
import { backUrl } from '../config/config';

// axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ]);
}