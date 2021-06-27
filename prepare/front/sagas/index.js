import { all, fork } from 'redux-saga/effects'; // saga 의 이펙트들

import userSaga from './user';
import postSaga from './post';

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ]);
}