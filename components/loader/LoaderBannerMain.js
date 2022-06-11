import { Grid, Skeleton } from "@mui/material";

function LoaderBannerMain() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <Skeleton variant="rectangular" height={230} />
      </Grid>
      <Grid container item xs={5} spacing={2}>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={105} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={105} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoaderBannerMain;
