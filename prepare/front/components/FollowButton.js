import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
    const dispatch = useDispatch();
    const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
    const isFollowing = me?.Followings.find((v) => v.id === post.User.id); // 게시글 작성자의 아이디가 나의 팔로잉 목록에 있는가 찾기
    
    const onClickButton = useCallback(() => {
        if (isFollowing) { // 팔로잉 목록에 있다면
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            });
        } else { // 팔로잉 목록에 없다면
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            });
        }
    }, [isFollowing]);
    
    if (post.User.id === me.id) { return null; } // 본인의 게시글인 경우 팔로우 버튼 없음
    
    return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
        {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
    );
};

FollowButton.propTypes = {
    post: PropTypes.object.isRequired,
};

export default FollowButton;