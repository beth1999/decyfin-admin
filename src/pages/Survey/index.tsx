import { useState } from 'react';
import PageHeader from './PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';

import SurveyTab from './Survey';
import NewSurveyDialog from './NewSurveyDialog';

function Survey() {
  const [openNewSurvey, setOpenNewSurvey] = useState<boolean>(false);

  const handleCloseNew = () => {
    setOpenNewSurvey(false);
  };

  return (
    <>
      <PageTitleWrapper>
        <PageHeader setOpenNewSurvey={setOpenNewSurvey} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <SurveyTab />
          </Grid>
        </Grid>
      </Container>
      <Footer />

      <NewSurveyDialog open={openNewSurvey} handleClose={handleCloseNew} />
    </>
  );
}

export default Survey;
