// ex) http://localhost:3000/hashtag/노드 -> 특정 해시태그의 글을 모두 가져오는 다이나믹 라우팅
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import PostCard from '../../components/PostCard';
import axios from 'axios';

const Hashtag = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { tag } = router.query;
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

    useEffect(() => { // 인피니티 스크롤
        const onScroll = () => {
            if (window.pageYOffset + document.documentElement.clientHeight
                > document.documentElement.scrollHeight - 300) {
                if (hasMorePosts && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_HASHTAG_POSTS_REQUEST,
                        lastId: mainPosts[mainPosts.length - 1]?.id,
                        data: tag,
                    });
                }
            }
        };

        window.addEventListener('scroll', onScroll);

        return () => { window.removeEventListener('scroll', onScroll); };
    }, [mainPosts.length, hasMorePosts, tag, loadPostsLoading]);

    return (
        <AppLayout>
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    // console.log('context 쿠키생성전', context);
    const cookie = context.req ? context.req.headers.cookie : '';
    // console.log('context 쿠키생성후', context);
    axios.defaults.headers.Cookie = '';

    if (context.req && cookie) { axios.defaults.headers.Cookie = cookie; }

    context.store.dispatch({ type: LOAD_HASHTAG_POSTS_REQUEST, data: context.params.tag });
    context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Hashtag;