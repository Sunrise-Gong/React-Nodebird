// http://localhost:3000/post/1 -> 특정 게시글 하나만 나타내는 페이지 (링크 타고 들어오거나 할 경우)
import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import Head from 'next/head';

import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import { useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
    const router = useRouter();
    const { id } = router.query;
    const { singlePost } = useSelector((state) => state.post);
    
    return (
        <AppLayout>
            <Head>
                <title>{singlePost.User.nickname}님의 글</title>
                <meta name="description" content={singlePost.content} />
                <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
                <meta property="og:description" content={singlePost.content} />
                <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'} />
                <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
            </Head>
            <PostCard post={singlePost} />
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps 시작');
    console.log('헤더', context.req.headers);
    
    const cookie = context.req ? context.req.headers.cookie : '';
    
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) { axios.defaults.headers.Cookie = cookie; }

    context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
    context.store.dispatch({ type: LOAD_POST_REQUEST, data: context.params.id });    

    context.store.dispatch(END);
    console.log('getServerSideProps 끝');
    
    await context.store.sagaTask.toPromise();
});

export default Post;