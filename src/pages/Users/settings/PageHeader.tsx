import { Typography } from '@mui/material';

function PageHeader() {
  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        User Management
      </Typography>
      <Typography variant="subtitle2">
        Here, users who have joined the site are managed, including user
        authorization, block/open and etc.
      </Typography>
    </>
  );
}

export default PageHeader;
