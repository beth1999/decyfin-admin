import { useState, useEffect } from 'react';
import {
  Card,
  Box,
  CardContent,
  Typography,
  Avatar,
  useTheme,
  styled
} from '@mui/material';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Api } from '@/service/api';

const RootWrapper = styled(Card)(
  ({ theme }) => `
    background: ${theme.colors.gradients.green1};
    color: ${theme.colors.alpha.white[100]};
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.main};
      color: ${theme.palette.error.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.error};
`
);

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[70]};
`
);

function Performance() {
  const theme = useTheme();
  const [analytics, setAnalytics] = useState<{ posts: number; users: number }>({
    posts: 0,
    users: 0
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data: PostData } = await Api.get('/post/count');
      const { data: UserData } = await Api.get('/user/count');

      setAnalytics({
        posts: PostData.data,
        users: UserData.data
      });
    } catch (err) {
      setAnalytics({
        posts: 0,
        users: 0
      });
    }
  };

  return (
    <RootWrapper
      sx={{
        p: 2
      }}
    >
      <Typography
        variant="h3"
        sx={{
          px: 2,
          pb: 1,
          pt: 2,
          fontSize: `${theme.typography.pxToRem(23)}`,
          color: `${theme.colors.alpha.white[100]}`
        }}
      >
        Total Posts and Users
      </Typography>
      <CardContent>
        <Box
          display="flex"
          sx={{
            px: 2,
            pb: 3
          }}
          alignItems="center"
        >
          <AvatarSuccess
            sx={{
              mr: 2
            }}
            variant="rounded"
          >
            <LocalPostOfficeIcon fontSize="large" />
          </AvatarSuccess>
          <Box>
            <Typography variant="h1">{analytics.posts}</Typography>
            <TypographySecondary variant="subtitle2" noWrap>
              Total Posts
            </TypographySecondary>
          </Box>
        </Box>
        <Box
          display="flex"
          sx={{
            px: 2,
            pb: 3
          }}
          alignItems="center"
        >
          <AvatarError
            sx={{
              mr: 2
            }}
            variant="rounded"
          >
            <GroupAddIcon fontSize="large" />
          </AvatarError>
          <Box>
            <Typography variant="h1">{analytics.users}</Typography>
            <TypographySecondary variant="subtitle2" noWrap>
              Total Users
            </TypographySecondary>
          </Box>
        </Box>
      </CardContent>
    </RootWrapper>
  );
}

export default Performance;
