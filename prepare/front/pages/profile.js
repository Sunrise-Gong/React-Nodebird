import React, { useEffect, useState, useCallback } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { END } from 'redux-saga';
import axios from 'axios';
import useSWR from 'swr';

import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
    //const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const [followersLimit, setFollowersLimit] = useState(3);
    const [followingsLimit, setFollowingsLimit] = useState(3);
    
    const { data: followersData, error: followerError } = useSWR(`https://api.mayweather24.com/user/followers?limit=${followersLimit}`, fetcher);
    const { data: followingsData, error: followingError } = useSWR(`https://api.mayweather24.com/user/followings?limit=${followingsLimit}`, fetcher);

    // useEffect(() => {
    //     dispatch({ type: LOAD_FOLLOWERS_REQUEST });
    //     dispatch({ type: LOAD_FOLLOWINGS_REQUEST });
    // }, []);

    useEffect(() => { if (!(me && me.id)) { Router.push('/'); } }, [me && me.id]);

    const loadMoreFollowings = useCallback(() => { setFollowingsLimit((prev) => prev + 3); }, []);
    const loadMoreFollowers = useCallback(() => { setFollowersLimit((prev) => prev + 3); }, []);

    if (!me) { return <div>로그인 상태가 아닙니다.</div>; }

    if (followerError || followingError) {
        console.error(followerError || followingError);
        return '팔로잉/팔로워 로딩 중 에러가 발생합니다';
    }
    
    return (
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={followingsData/*me.Followings*/} onClickMore={loadMoreFollowings} loading={!followingsData && followingError} />
                <FollowList header="팔로워 목록" data={followersData/*me.Followers*/} onClickMore={loadMoreFollowers} loading={!followersData && followerError} />
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