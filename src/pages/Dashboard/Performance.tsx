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
            <Typography variant="h1">23</Typography>
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
            <Typography variant="h1">5</Typography>
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