import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
// import withReduxSaga from 'next-redux-saga'; next 9 부터 이거 필요 없어짐

import wrapper from '../store/configureStore';

const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
};
// export default wrapper.withRedux(NodeBird); // next-redux-saga를 적용하기 전
export default wrapper.withRedux(NodeBird);