import { AppBar, Container, Typography } from "@mui/material";
import React from "react";

export const FooterMUI = () => {
  return (
    <AppBar position="static" style={{ background: 'pink', marginTop: 'auto' }}>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Typography variant="h6" align="center" sx={{ color: "white" }}>
          Footer Content
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: "white" }}>
          Your additional footer content here
        </Typography>
      </Container>
    </AppBar>
  );
};
