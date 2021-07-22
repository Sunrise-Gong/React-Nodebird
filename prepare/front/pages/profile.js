import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { END } from 'redux-saga';

import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import axios from 'axios';

const Profile = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch({ type: LOAD_FOLLOWERS_REQUEST });
        dispatch({ type: LOAD_FOLLOWINGS_REQUEST });
    }, []);

    useEffect(() => { if (!(me && me.id)) { Router.push('/'); } }, [me && me.id]);
    
    if (!me) { return <div>로그인 상태가 아닙니다.</div>; }
    
    return (
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={me.Followings} />
                <FollowList header="팔로워 목록" data={me.Followers} />
            </AppLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps 시작');
    console.log('헤더', context.req.headers);
    
    const cookie = context.req ? context.req.headers.cookie : '';
    
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) { axios.defaults.headers.Cookie = cookie; }

    context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
    
    context.store.dispatch(END);
    console.log('getServerSideProps 끝');
    
    await context.store.sagaTask.toPromise();
});

export default Profile;