// 본문의 해시태그에 링크를 걸어주는 컴포넌트
import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { TextArea } = Input;

const PostCardContent = ({ postData, editMode }) => { // postData = '안녕하세요 트위터 짝퉁 궁금해서 가입해봤습니다~ #해시태그 #익스프레스'
    const [editText, setEditText] = useState(postData);
    
    const onChangeText = useCallback((e) => { setEditText(e.target.value); });
    
    return ( 
        <div>
            {editMode
                ? (
                    <TextArea value={editText} onChange={onChangeText} />
                )
                : postData.split(/(#[^\s#]+)/g).map((v, i) => {
                    if (v.match(/(#[^\s#]+)/)) {
                        return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}><a>{v}</a></Link>;
                    }
                    return v;
                })};
        </div>
    );
};

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
    editMode: PropTypes.bool,
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