import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import Router from 'next/router';
import { Form, Input, Checkbox, Button } from 'antd';

import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
    const dispatch = useDispatch();
    const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);
    
    // Router.replace는 Router.push와 다르게 히스토리가 남지 않습니다.(뒤로가기 해도 이전 페이지 안나옴)
    useEffect(() => { if (me && me.id) { Router.replace('/'); } }, [me && me.id]); // 로그인시 메인페이지로
    
    useEffect(() => { if (signUpDone) { Router.replace('/'); } }, [signUpDone]); // 회원가입 완료시 메인페이지로
    
    useEffect(() => { if (signUpError) { alert(signUpError); } }, [signUpError]); // 회원가입 실패시 alert 창 
    
    //---------------------------------------- 커스텀 훅
    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');
    
    //---------------------------------------- 패스워드 유효성 검사
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);
    
    //---------------------------------------- 동의 체크박스 검사
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    }, []);
    
    //---------------------------------------- 회원가입 버튼 클릭시
    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) { return setPasswordError(true); } // 패스워드 재확인

        if (!term) { return setTermError(true); } // 동의 체크박스 

        console.log(email, password, nickname);

        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, nickname },
        });
    }, [email, password, passwordCheck, term]);
    //----------------------------------------
    return (
        <AppLayout>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <Input
                        name="user-email"
                        type="email"
                        value={email}
                        required
                        onChange={onChangeEmail} />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br />
                    <Input
                        name="user-nick"
                        value={nickname}
                        required
                        onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input
                        name="user-password"
                        type="password"
                        value={password}
                        required
                        onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <br />
                    <Input
                        name="user-password-check"
                        type="password"
                        value={passwordCheck}
                        required
                        onChange={onChangePasswordCheck} />

                    {passwordError && <div style={{ color: 'red' }}> 비밀번호가 일치하지 않습니다. </div>}
                </div>
                <div>
                    <Checkbox
                        name="user-term"
                        checked={term}
                        onChange={onChangeTerm}
                    >해돋이의 노예가 되겠습니까?
                    </Checkbox>
                    {termError && <div style={{ color: 'red' }}> 노예가 되셔야 가입이 가능합니다. </div>}
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={signUpLoading}>가입하기
                    </Button>
                </div>
            </Form>
        </AppLayout>
    );
};

export default Signup;