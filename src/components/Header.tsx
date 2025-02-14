import React, { FC } from "react";

import { AppBar, Toolbar, Typography } from "@mui/material";

/**
 * Header component
 * @returns Header component
 */
const Header: FC = () => (
  <AppBar>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Weather
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
