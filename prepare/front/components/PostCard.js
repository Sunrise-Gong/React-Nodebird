// pages > index.js 의 자식
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Popover, Avatar, List, Comment } from 'antd';
import { HeartTwoTone, EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';

import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';

//import moment from 'moment';
moment.locale('ko'); // 한글로 바꿔주는 설정 (기본:영어)

const PostCard = ({ post }) => { // post: post 리듀서의 상태값중 'mainPosts 배열'의 요소
    const dispatch = useDispatch();
    // const [liked, setLiked] = useState(false);// 좋아요 버튼의 상태
    const [commentFormOpened, setCommentFormOpened] = useState(false); // 댓글창 열기 버튼의 상태

    const id = useSelector((state) => state.user.me?.id); // user 리듀서: 로그인한 유저의 아이디
    const { removePostLoading } = useSelector((state) => state.post); // post 리듀서: 게시글 제거 상태

    const liked = post.Likers.find((v) => v.id === id);

    // useEffect(() => { if (retweetError) { alert(retweetError); } }, [retweetError]); // 포스트 카드 개수만큼 리렌더링 발생 index.js에서 실행해야 합니다.
    //------------------------------------------------
    const onLike = useCallback(() => { // 좋아요
        if (!id) { return alert('로그인이 필요합니다.'); }
        return dispatch({ type: LIKE_POST_REQUEST, data: post.id });
    }, [id]);

    const onUnlike = useCallback(() => { // 좋아요 취소
        if (!id) { return alert('로그인이 필요합니다.'); }
        return dispatch({ type: UNLIKE_POST_REQUEST, data: post.id });
    }, [id]);

    const onToggleComment = useCallback(() => { setCommentFormOpened((prev) => !prev); }, []); // 댓글창 토글 함수

    const onRemovePost = useCallback(() => { // 게시글 삭제 버튼
        if (!id) { return alert('로그인이 필요합니다.'); }
        return dispatch({ type: REMOVE_POST_REQUEST, data: post.id });
    }, [id]);

    const onRetweet = useCallback(() => { // 리트윗 버튼
        if (!id) { return alert('로그인이 필요합니다.'); }
        return dispatch({ type: RETWEET_REQUEST, data: post.id });
    }, [id]);

    return (
        <div style={{ marginBottom: 20 }}>
            {/*--------------------------------------------------게시글 이미지, 버튼(리트윗, 좋아요, 댓글, 수정&삭제 or 신고) */}
            <Card
                style={{ background: '#D3E0EE', borderRadius: '8px 8px 0px 0px' }}
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[ // 배열에 jsx 를 넣을 때는 항상 키가 필요합니다.
                    
                    <RetweetOutlined key="retweet" onClick={onRetweet} />,

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
                title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
                extra={id && <FollowButton post={post/* 게시글 작성자의 id를 넘겨주기 위해서 */} />}
            >
                {/*-------------------------------------------------- 게시글 본문 */}
                {post.RetweetId && post.Retweet
                    ? (
                        <Card style={{ borderRadius: 8 }} cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
                            <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
                            <Card.Meta
                                avatar={(
                                    <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                                        <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                                    </Link>
                                )}
                                title={post.Retweet.User.nickname}
                                description={<PostCardContent postData={post.Retweet.content} />}
                            />
                        </Card>
                    )
                    : (
                        <>
                        <div style={{ float: 'right' }}>{moment(post.createdAt).fromNow()}</div>
                        <Card.Meta
                            avatar={(
                                <Link href={`/user/${post.User.id}`} prefetch={false}>
                                    <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                                </Link>
                            )}
                            title={post.User.nickname}
                            description={<PostCardContent postData={post.content} />}
                        />
                        </>
                    )}
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
                                    avatar={(
                                        <Link href={`/user/${item.User.id}`} prefetch={false}>
                                            <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                                        </Link>
                                    )}
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
        RetweetId: PropTypes.number,
        Retweet: PropTypes.objectOf(PropTypes.any),
    }).isRequired,
};

export default PostCard;