import React from "react";

import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => (
  <AppBar>
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
        Weather
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
