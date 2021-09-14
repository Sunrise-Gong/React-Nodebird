import React, { useEffect } from 'react'; //<-이거 안쓰면 eslint:recommended 설정에 걸림
import { useDispatch, useSelector } from 'react-redux';
// import { END } from 'redux-saga'; // SSR

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
// import wrapper from '../store/configureStore'; // SSR
// import axios from 'axios'; // SSR

const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);
    
    useEffect(() => { if (retweetError) { alert(retweetError); } }, [retweetError]);

    useEffect(() => { // CSR
        dispatch({ type: LOAD_POSTS_REQUEST }); 
        dispatch({ type: LOAD_MY_INFO_REQUEST }); 
    }, []); // 첫 렌더링 후 실행

    useEffect(() => {
        function onScroll() {
            // console.log(`얼마나 내렸는지:${window.scrollY}`, `화면이 보이는 길이:${document.documentElement.clientHeight}`, `총 세로 길이:${document.documentElement.scrollHeight}`);
            if (window.scrollY + document.documentElement.clientHeight 
                > document.documentElement.scrollHeight - 300) {
                if (hasMorePosts && !loadPostsLoading) { 
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({ type: LOAD_POSTS_REQUEST, lastId });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => { window.removeEventListener('scroll', onScroll); }; // 이거 안하면 메모리에 쌓임
    }, [hasMorePosts, loadPostsLoading, mainPosts]);

    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)};
        </AppLayout>
    );
};

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//     console.log('getServerSideProps 시작');
//     console.log('헤더', context.req.headers);
    
//     const cookie = context.req ? context.req.headers.cookie : '';
    
//     axios.defaults.headers.Cookie = '';
//     if (context.req && cookie) { axios.defaults.headers.Cookie = cookie; }
    
//     context.store.dispatch({ type: LOAD_POSTS_REQUEST });
    
//     context.store.dispatch({ type: LOAD_MY_INFO_REQUEST }); 
    
//     context.store.dispatch(END);
//     console.log('getServerSideProps 끝');

//     await context.store.sagaTask.toPromise();
// });

export default Home;
