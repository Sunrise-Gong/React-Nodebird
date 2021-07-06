import { all, fork } from 'redux-saga/effects'; // saga 의 이펙트들
import axios from 'axios';

import userSaga from './user';
import postSaga from './post';

axios.defaults.baseURL = 'http://localhost:3065';

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ]);
}