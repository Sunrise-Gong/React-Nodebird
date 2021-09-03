// 본문의 해시태그에 링크를 걸어주는 컴포넌트
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const PostCardContent = ({ postData, editMode, onChangePost, onCancelUpdate }) => { // postData = '안녕하세요 트위터 짝퉁 궁금해서 가입해봤습니다~ #해시태그 #익스프레스'
    const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
    const [editText, setEditText] = useState(postData);
    
    useEffect(() => { if (updatePostDone) { onCancelUpdate(); } }, [updatePostDone]);

    const onChangeText = useCallback((e) => { setEditText(e.target.value); });
    
    return ( 
        <div>
            {editMode
                ? (
                    <>
                    <TextArea value={editText} onChange={onChangeText} />
                    <Button.Group>
                        <Button loading={updatePostLoading} onClick={onChangePost(editText)}>수정</Button>
                        <Button type="danger" onClick={onCancelUpdate}>취소</Button>
                    </Button.Group>
                    </>
                )
                : postData.split(/(#[^\s#]+)/g).map((v, i) => {
                    if (v.match(/(#[^\s#]+)/)) {
                        return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}><a>{v}</a></Link>;
                    }
                    return v;
                })}
        </div>
    );
};

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
    editMode: PropTypes.bool,
    onCancelUpdate: PropTypes.func.isRequired,
    onChangePost: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
    editMode: false, // 리트윗의 경우 이 값이 없으니 기본값을 false로
};

export default PostCardContent;

/*
postData
    .split(/(#[^\s#]+)/g) // ["안녕하세요 트위터 짝퉁 궁금해서 가입해봤습니다~ ", "#해시태그", " ", "#익스프레스", ""]
    .map((v, i) => {
                    if (v.match(/(#[^\s#]+)/)) {
                        // import Link from 'next/link'; //
                        return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}><a>{v}</a></Link>;
                    }

                    return v;
                })
*/