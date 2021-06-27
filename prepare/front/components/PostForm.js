import React, { useCallback, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';//액션
import useInput from '../hooks/useInput';

const PostForm = () => {
    const { imagePaths, addPostDone } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const [text, onChangeText, setText] = useInput('');
//------------------------------------------------ 작성한 글이 업로드 성공시 인풋창 비우기
    useEffect(() => { 
        if (addPostDone) { setText(''); }
    }, [addPostDone]);

//------------------------------------------------ 이미지 업로드 버튼 클릭
    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

//------------------------------------------------ 게시글 등록버튼 클릭
    const onSubmit = useCallback(() => {
        dispatch(addPost(text));
        // setText(''); 여기서 지워졌는데 에러가 나면 작성한 글이 날아갈 수 있기 때문에 useEffect로..
    }, [text]);

    return (
        <Form
            style={{ margin: '10px 0 20 px' }}
            encType="multipart/form-data"
            onFinish={onSubmit}>
{/* --------------------------------------------- 게시글 작성창 */}
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?" />
{/* --------------------------------------------- 이미지 or 게시글 등록 버튼 */}
            <div style={{ marginBottom: 20 }}>
                <input type="file" multiple hidden ref={imageInput} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button
                    type="primary"
                    style={{ float: 'right' }}
                    htmlType="submit">
                    짹짹
                </Button>
            </div>

            <div>
                {imagePaths.map((v) => { // 이미지 업로드 미리보기 부분
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={v} style={{ width: '200px' }} alt={v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>;
                })}
            </div>
        </Form>
    );
};

export default PostForm;