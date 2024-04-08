import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Avatar, styled } from '@mui/material';
import Text from '@/components/Text';
import { Api } from '@/service/api';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

interface TopUserProps {
  id: string;
  count: number;
  username: string;
  avatar: string;
}

function TeamOverview() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [topUsers, setTopUsers] = useState<TopUserProps[] | []>([]);

  useEffect(() => {
    getTopUsers();
  }, []);

  const getTopUsers = async () => {
    try {
      const { data } = await Api.get('/comment/topusers');

      setTopUsers(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container spacing={4}>
      {topUsers.length > 0 ? (
        topUsers.map((item: TopUserProps) => (
          <Grid item xs={12} md={4} key={item.id}>
            <Box>
              <Box display="flex" alignItems="center" pb={3}>
                <AvatarWrapper alt="Remy Sharp" src={item.avatar} />
                <Box
                  sx={{
                    ml: 1.5
                  }}
                >
                  <Typography variant="h4" noWrap gutterBottom>
                    {item.username}
                  </Typography>
                  <Typography variant="subtitle2" noWrap>
                    User
                  </Typography>
                </Box>
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                <Text color="black">{item.count}</Text> comments presented
              </Typography>
            </Box>
          </Grid>
        ))
      ) : (
        <Grid item xs={12} md={4}>
          <Box>No Top Users</Box>
        </Grid>
      )}
    </Grid>
  );
}

export default TeamOverview;
