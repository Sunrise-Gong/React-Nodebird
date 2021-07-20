import React, { useEffect } from 'react'; //<-이거 안쓰면 eslint:recommended 설정에 걸림
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);
    
    useEffect(() => { if (retweetError) { alert(retweetError); } }, [retweetError]);

    // useEffect(() => { 
    //     dispatch({ type: LOAD_POSTS_REQUEST }); 
    //     dispatch({ type: LOAD_USER_REQUEST }); 
    // }, []); // 첫 렌더링 후 실행

    useEffect(() => {
        function onScroll() {
            // console.log( 
            //     window.scrollY, // 얼마나 내렸는지
            //     document.documentElement.clientHeight, // 화면이 보이는 길이
            //     document.documentElement.scrollHeight, // 총 세로 길이 
            //     );
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
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

export const getServerSideProps = wrapper.getServerSideProps((context) => {
    context.store.dispatch({ type: LOAD_POSTS_REQUEST });
    context.store.dispatch({ type: LOAD_USER_REQUEST }); 
});

export default Home;