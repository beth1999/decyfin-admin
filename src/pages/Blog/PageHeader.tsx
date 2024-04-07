import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader({
  currentTab,
  setOpenNewPost,
  setOpenNewCategory
}: {
  currentTab: string;
  setOpenNewPost: (c: boolean) => void;
  setOpenNewCategory: (c: boolean) => void;
}) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Blog Management
        </Typography>
        <Typography variant="subtitle2">
          Here you can create a new blog and new category for your users.
        </Typography>
      </Grid>
      <Grid item>
        {currentTab === 'blog' && (
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => setOpenNewPost(true)}
          >
            Create Post
          </Button>
        )}
        {currentTab === 'category' && (
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => setOpenNewCategory(true)}
          >
            Create Category
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default PageHeader;
