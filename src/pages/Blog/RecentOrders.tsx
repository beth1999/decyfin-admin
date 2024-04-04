import React, { useState } from 'react';
import { Api } from '@/service/api';
import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const [posts, setPosts] = useState<PostProps[] | []>([]);

  React.useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const { data } = await Api.get('/post');

      setPosts(data.data);
    } catch (err) {
      setPosts([]);
    }
  };

  return (
    <Card>
      <RecentOrdersTable posts={posts} />
    </Card>
  );
}

export default RecentOrders;
