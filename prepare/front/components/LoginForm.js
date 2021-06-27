import React, { useCallback, useMemo } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput'; // 커스텀 훅
import { loginRequestAction } from '../reducers/user'; // 액션

// import styled from 'styled-components'; // 에러가 나서 일단 보류

// const ButtonWrapper = styled.div`
// marginTop: 10px;
// `;

const LoginForm = () => {
    const dispatch = useDispatch();
    const { logInLoading } = useSelector((state) => state.user);
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const style = useMemo(() => ({ marginTop: 10 }), []);
    
    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        dispatch(loginRequestAction({ email, password }));
    }, [email, password]);
    
    return (
        <Form style={{ padding: 10 }} onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input 
                name="user-email" 
                type="email"
                value={email} 
                onChange={onChangeEmail} 
                required />
            </div>
            <div>
            <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input 
                name="user-password" 
                type="password" 
                value={password} 
                onChange={onChangePassword} 
                required />
            </div>
            <div style={style}>
                <Button 
                type="primary" 
                htmlType="submit" 
                loading={logInLoading}>로그인
                </Button>
                <Link href="/signup"><a>회원가입</a></Link>
            </div>
        </Form>
    );
};

export default LoginForm;