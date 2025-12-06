import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  Paper,
  Stack,
} from "@mui/material";

const Start = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/55/c4/2a/55c42acf-d797-c99e-6245-544adb24d64f/AppIcon-0-0-1x_U007emarketing-0-5-0-85-220.png/1200x630wa.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center",
        backgroundSize: "contain",
        bgcolor: "linear-gradient(135deg, #0f172a 0%, #020617 60%, #0b1120 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "rgba(39, 175, 237, 0.85)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Movie Application
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pb: { xs: 6, md: 10 },
          pt: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={8}
            sx={{
              borderRadius: 4,
              p: { xs: 4, md: 5 },
              textAlign: "center",
              bgcolor: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(0.5px)",
            }}
          >
            <Stack spacing={3}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#111827",
                  letterSpacing: 0.5,
                }}
              >
                Get Started
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "text.secondary", px: { xs: 1, md: 3 } }}
              >
                Explore trending movies, save your favourites, and discover what
                to watch next with your Movie Application.
              </Typography>

              <Button
                component={Link}
                to="/userLogin"
                variant="contained"
                size="large"
                sx={{
                  mt: 1,
                  py: 1.4,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: 999,
                  textTransform: "none",
                  boxShadow: 4,
                  "&:hover": {
                    boxShadow: 8,
                  },
                }}
              >
                Continue
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Start;
