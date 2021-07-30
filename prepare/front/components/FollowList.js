import React from 'react';
import PropTypes from 'prop-types';
import { Button, List, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';
import { useDispatch } from 'react-redux';

const FollowList = ({ header, data, onClickMore, loading }) => {
    const dispatch = useDispatch();

    const onCancel = (id) => () => {
        if (header === '팔로잉 목록') { dispatch({ type: UNFOLLOW_REQUEST, data: id }); }

        dispatch({ type: REMOVE_FOLLOWER_REQUEST, data: id });
    };

    return (
        <List
            style={{ marginBottom: 10, borderRadius: 8 }}
            grid={{ gutter: 4, xs: 2, md: 3 }}
            size="small"
            header={<div style={{ color: '#F4F6F8', textAlign: 'center', fontSize: 17 }}>{header}</div>}
            loadMore={(
                <div style={{ textAlign: 'center', margin: '10px 0' }}>
                    <Button onClick={onClickMore} loading={loading}>더 보기</Button>
                </div>
            )}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={{ marginTop: 20 }}>
                    <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        />
    );
};

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    onClickMore: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default FollowList;