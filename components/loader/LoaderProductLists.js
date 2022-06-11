import { Container, Grid, Skeleton } from "@mui/material";

function LoaderProductLists({ maxWidth = "lg" }) {
  return (
    <Container maxWidth={maxWidth}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={2} sm={4}>
          <Skeleton variant="rectangular" height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6} md={2} sm={4}>
          <Skeleton variant="rectangular" height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6} md={2} sm={4}>
          <Skeleton variant="rectangular" height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6} md={2} sm={4}>
          <Skeleton variant="rectangular" height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6} md={2} sm={4}>
          <Skeleton variant="rectangular" height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6} md={2} sm={4}>
          <Skeleton variant="rectangular" height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6} md={2} sm={4}>
          <Skeleton variant="rectangular" height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6} md={2} sm={4}>
          <Skeleton variant="rectangular" height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6} md={2} sm={4}>
          <Skeleton variant="rectangular" height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6} md={2} sm={4}>
          <Skeleton variant="rectangular" height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6} md={2} sm={4}>
          <Skeleton variant="rectangular" height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6} md={2} sm={4}>
          <Skeleton variant="rectangular" height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoaderProductLists;
