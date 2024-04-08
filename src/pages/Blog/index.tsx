import { ChangeEvent, useState } from 'react';
import { Grid, Container, styled, Tabs, Tab } from '@mui/material';

import PageHeader from './PageHeader';
import Post from './post';
import Category from './category';
import NewPostDialog from './post/NewPostDialog';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import Footer from '@/components/Footer';
import NewCategoryDialog from './category/NewCategoryDialog';
import Vote from './vote';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
  `
);

interface TabProps {
  value: string;
  label: string;
}

function ApplicationsTransactions() {
  const [currentTab, setCurrentTab] = useState<string>('blog');
  const [openNewPost, setOpenNewPost] = useState<boolean>(false);
  const [openNewCategory, setOpenNewCategory] = useState<boolean>(false);

  const handleCloseNew = () => {
    setOpenNewPost(false);
    setOpenNewCategory(false);
  };

  const tabs: TabProps[] = [
    { value: 'blog', label: 'Blog' },
    { value: 'category', label: 'Category' },
    { value: 'vote', label: 'Vote' }
  ];

  const handleTabsChange = (_: ChangeEvent<object>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          currentTab={currentTab}
          setOpenNewPost={setOpenNewPost}
          setOpenNewCategory={setOpenNewCategory}
        />
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
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab: TabProps) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'blog' && <Post />}
            {currentTab === 'category' && <Category />}
            {currentTab === 'vote' && <Vote />}
          </Grid>
        </Grid>
      </Container>

      <NewPostDialog open={openNewPost} handleClose={handleCloseNew} />
      <NewCategoryDialog open={openNewCategory} handleClose={handleCloseNew} />
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
