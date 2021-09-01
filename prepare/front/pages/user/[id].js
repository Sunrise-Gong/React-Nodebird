// ex) http://localhost:3000/user/5 -> 특정 사용자의 게시글을 모두 가져오는 다이나믹 라우팅
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { Card, Avatar } from 'antd';
import axios from 'axios';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';

const User = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const { userInfo, me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

    useEffect(() => { // 인피니티 스크롤
        const onScroll = () => {
            if (window.pageYOffset
                + document.documentElement.clientHeight
                > document.documentElement.scrollHeight - 300) {
                if (hasMorePosts && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_USER_POSTS_REQUEST, lastId: mainPosts[mainPosts.length - 1]?.id, data: id,
                    });
                }
            }
        };

        window.addEventListener('scroll', onScroll);

        return () => { window.removeEventListener('scroll', onScroll); };
    }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);

    return (
        <AppLayout>
            {userInfo && (
                <Head>
                    <title>{userInfo.nickname}님의 글</title>
                    <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
                    <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
                    <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
                    <meta property="og:image" content="https://mayweather24.com/favicon.ico" />
                    <meta property="og:url" content={`https://api.mayweather24.com/user/${id}`} />
                </Head>
            )}
            {userInfo && (userInfo.id !== me?.id) ? (
                <Card
                    style={{ marginBottom: 20 }}
                    actions={[
                        <div key="twit">짹짹<br />{userInfo.Posts}</div>,
                        <div key="following">팔로잉<br />{userInfo.Followings}</div>,
                        <div key="follower">팔로워<br />{userInfo.Followers}</div>,
                    ]}>
                    <Card.Meta
                        avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                        title={userInfo.nickname} />
                </Card>
            ) : null}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) { axios.defaults.headers.Cookie = cookie; }

    context.store.dispatch({ type: LOAD_USER_POSTS_REQUEST, data: context.params.id });
    context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
    context.store.dispatch({ type: LOAD_USER_REQUEST, data: context.params.id });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default User;