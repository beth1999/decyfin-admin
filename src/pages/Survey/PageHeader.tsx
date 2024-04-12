import { Button, Grid, Typography } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader({
  setOpenNewSurvey
}: {
  setOpenNewSurvey: (c: boolean) => void;
}) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Survey Management
        </Typography>
        <Typography variant="subtitle2">
          Here, you can manage survey content
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => setOpenNewSurvey(true)}
        >
          Create Survey
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
