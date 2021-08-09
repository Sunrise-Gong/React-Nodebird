import React, { useCallback, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../reducers/post';//액션
import useInput from '../hooks/useInput';
import { backUrl } from '../config/config';

const PostForm = () => {
    const { imagePaths, addPostDone } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const [text, onChangeText, setText] = useInput('');
//------------------------------------------------ 작성한 글이 업로드 성공시 인풋창 비우기
    
    useEffect(() => { if (addPostDone) { setText(''); } }, [addPostDone]);

//------------------------------------------------ 이미지 업로드 버튼 클릭
    const imageInput = useRef();
    
    const onClickImageUpload = useCallback(() => { imageInput.current.click(); }, [imageInput.current]);

//------------------------------------------------ 이미지 업로드 
    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        
        const imageFormData = new FormData();
        
        [].forEach.call(e.target.files, (f) => { imageFormData.append('image', f); }); // e.target.files 가 유사 배열이여서 call 을 사용함
        
        dispatch({ type: UPLOAD_IMAGES_REQUEST, data: imageFormData });
    }, []);

    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            data: index,
        });
    });
//------------------------------------------------ 게시글/이미지 등록버튼 클릭
    const onSubmit = useCallback(() => {
        if (!text || !text.trim()) { return alert('게시글을 작성해주세요.'); }
        
        const formData = new FormData();
        
        imagePaths.forEach((p) => { formData.append('image', p); });
        
        formData.append('content', text);
        
        return dispatch({ type: ADD_POST_REQUEST, data: formData });
    }, [text, imagePaths]);

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
                <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages /* 이미지 선택후 확인을 누르면 실행됨 */} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button
                    type="primary"
                    style={{ float: 'right' }}
                    htmlType="submit">
                    짹짹
                </Button>
            </div>

            <div>
                {imagePaths.map((v, i) => ( // 이미지 업로드 미리보기 부분
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={`${backUrl}/${v}`} style={{ width: '200px' }} alt={v} />
                        <div>
                            <Button onClick={onRemoveImage(i)}>제거</Button>
                        </div>
                    </div>
                    ))}
            </div>
        </Form>
    );
};

export default PostForm;