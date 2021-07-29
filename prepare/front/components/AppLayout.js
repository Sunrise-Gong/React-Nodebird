import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import { Input, Menu, Row, Col } from 'antd';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';

//import styled from 'styled-components';

const SearchInput = styled(Input.Search)`
vertical-align: middle;
`;

// const Global = createGlobalStyle`
// .ant-row {
//     margin-right: 0 !important;
//     margin-left: 0 !important;
// }
// .ant-col:first-child {
//     padding-left: 0 !important;
// }
// .ant-col:last-child {
//     padding-right: 0 !important;
// }
// `;

const AppLayout = ({ children }) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchInput, onChangeSearchInput] = useInput('');
    
    const { me } = useSelector((state) => state.user);
    
    // import Router from 'next/router';
    const onSearch = useCallback(() => { Router.push(`/hashtag/${searchInput}`); }, [searchInput]);
    
    return (
        <div>
            {/*<Global />*/}
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput 
                    enterButton 
                    value={searchInput}
                    onChange={onChangeSearchInput}
                    onSearch={onSearch}
                    />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>{children}</Col>
                <Col xs={24} md={6}>
                    <a
                        href="https://www.slowtv24.com"
                        target="_blank"
                        rel="noreferrer noopener">Made by RSC
                    </a>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired, // 리액트에서의 node: return안의 것들의 타입
};

export default AppLayout;