// pages > index.js 의 자식
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Popover, Avatar, List, Comment } from 'antd';
import { HeartTwoTone, EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';

import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => { // post: post 리듀서의 상태값중 'mainPosts 배열'의 요소
    const dispatch = useDispatch();
    // const [liked, setLiked] = useState(false);// 좋아요 버튼의 상태
    const [commentFormOpened, setCommentFormOpened] = useState(false); // 댓글창 열기 버튼의 상태

    const id = useSelector((state) => state.user.me?.id); // user 리듀서: 로그인한 유저의 아이디
    const { removePostLoading } = useSelector((state) => state.post); // post 리듀서: 게시글 제거 상태
    
    const liked = post.Likers.find((v) => v.id === id);
//------------------------------------------------
    const onLike = useCallback(() => { // 좋아요
        dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id, 
        });
    }, []); 
    
    const onUnlike = useCallback(() => { // 좋아요 취소
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id, 
        });
    }, []); 

//------------------------------------------------
    const onToggleComment = useCallback(() => { setCommentFormOpened((prev) => !prev); }, []); // 댓글창 토글 함수
    
    const onRemovePost = useCallback(() => { // 게시글 삭제 버튼
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        });
    }, []);

    return (
        <div style={{ marginBottom: 20 }}>
            {/*--------------------------------------------------게시글 이미지, 버튼(리트윗, 좋아요, 댓글, 수정&삭제 or 신고) */}
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[ // 배열에 jsx 를 넣을 때는 항상 키가 필요합니다.
                    <RetweetOutlined key="retweet" />,

                    liked
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
                        : <HeartOutlined key="heart" onClick={onLike} />,

                    <MessageOutlined key="comment" onClick={onToggleComment} />,

                    <Popover
                        key="more"
                        content={(
                            <Button.Group>
                                {id && post.User.id === id
                                    ? (<><Button>수정</Button> <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button></>)
                                    : <Button>신고</Button>}
                            </Button.Group>
                        )}>
                        <EllipsisOutlined />
                    </Popover>,
                ]}
                extra={id && <FollowButton post={post/* 게시글 작성자의 id를 넘겨주기 위해서 */} />}
            >
                {/*--------------------------------------------------게시글 본문(해시태그 링크화) */}
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />

            </Card>
            {/*--------------------------------------------------게시글의 댓글창(열고 닫기 구현) */}
            {commentFormOpened && (
                <div>

                    <CommentForm post={post/* 게시글 아이디가 필요해서 넘겨줍니다  */} />

                    <List
                        style={{ marginTop: 40 }}
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar> {item.User.nickname[0]} </Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>
            )}
            {/* <CommentForm /> */}
            {/* <Comments /> */}
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.string,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
        Likers: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
};

export default PostCard;