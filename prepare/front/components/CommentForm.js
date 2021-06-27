// PostCard.js 의 자식. 댓글창 컴포넌트.
import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

//----------------------------------------
const CommentForm = ({ post }) => {
    const dispatch = useDispatch();
    
    const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
    const id = useSelector((state) => state.user.me?.id);
    
    const [commentText, onChangeCommentText, setCommentText] = useInput('');
    
    useEffect(() => {
        if (addCommentDone) { setCommentText(''); }
    }, [addCommentDone]);

//----------------------------------------
    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText, id);
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id },
        });
    }, [commentText]);
//----------------------------------------
    return (
        <Form onFinish={onSubmitComment}>

            <Form.Item style={{ position: 'relative', margin: 0 }}>

                <Input.TextArea
                    value={commentText}
                    onChange={onChangeCommentText}
                    rows={5} />

                <Button
                    style={{ position: 'absolute', right: 0, bottom: -35, zIndex: 1 }}
                    type="primary"
                    htmlType="submit"
                    loading={addCommentLoading}>
                    삐약
                </Button>

            </Form.Item>

        </Form>
    );
};

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
};

export default CommentForm;