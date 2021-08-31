// 본문의 해시태그에 링크를 걸어주는 컴포넌트
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => ( // postData = '안녕하세요 트위터 짝퉁 궁금해서 가입해봤습니다~ #해시태그 #익스프레스'
    <div>
        {postData

            .split(/(#[^\s#]+)/g) // ["안녕하세요 트위터 짝퉁 궁금해서 가입해봤습니다~ ", "#해시태그", " ", "#익스프레스", ""]
            
            .map((v, i) => {
                if (v.match(/(#[^\s#]+)/)) {
                    // import Link from 'next/link'; //
                    return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}><a>{v}</a></Link>;
                }

                return v;
            })}
    </div>
);

PostCardContent.propTypes = { postData: PropTypes.string.isRequired };

export default PostCardContent;