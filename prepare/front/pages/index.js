import React from 'react'; //<-이거 안쓰면 eslint:recommended 설정에 걸림
import { useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
    const { me } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post);
    return (
        <AppLayout>
            {me && <PostForm />}
            { mainPosts.map((post) => <PostCard key={post.id} post={post} />)};
        </AppLayout>
    );
};

export default Home;