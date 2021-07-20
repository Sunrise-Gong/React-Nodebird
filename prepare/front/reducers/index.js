// import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

const rootReducer = (state, action) => {
    switch (action.type) { 
        default: {
            const combinedReducer = combineReducers({
                user,
                post,
            });
            return combinedReducer(state, action);
        }
    }
};

export default rootReducer;

/* SSR 적용전 
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

const rootReducer = combineReducers({
    index: (state = {}, action) => { // HYDRATE(SSR에 필요)를 넣기 위해서 이 부분이 필요합니다.
        switch (action.type) {
            case HYDRATE:
                console.log('HYDRATE', action); 
                return { ...state, ...action.payload };
    
                default:
                    return state;
        }
    },
    user,
    post,
});

export default rootReducer;
*/