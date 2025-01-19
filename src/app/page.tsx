import { Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";

import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";

export default function Home() {
  return (
    <>
      <Toolbar />
      <Grid container>
        <Grid size={6}>
          <CurrentWeather />
        </Grid>
        <Grid size={6}>
          <Forecast />
        </Grid>
      </Grid>
    </>
  );
}
