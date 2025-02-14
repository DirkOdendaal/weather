import { FC } from "react";

import { Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";

import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";

/**
 * Home page component.
 * @returns Home page component.
 */
const Home: FC = () => (
  <>
    <Toolbar />
    <Grid container direction="column" alignItems={"center"}>
      <Grid size={{ lg: 6, md: 8, sm: 12, xs: 12 }}>
        <CurrentWeather />
      </Grid>
      <Grid size={{ lg: 6, md: 8, sm: 12, xs: 12 }}>
        <Forecast />
      </Grid>
    </Grid>
  </>
);

export default Home;
