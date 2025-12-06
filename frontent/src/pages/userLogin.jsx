import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 4,
            textAlign: "center",
            bgcolor: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Login to continue watching and managing your favourite movies.
              </Typography>
            </Box>

            <Box component="form" onSubmit={onSubmit}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                  >
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth

                    required
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="medium"
                  />
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                  >
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="medium"
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 1,
                    fontWeight: 700,
                    borderRadius: 999,
                    textTransform: "none",
                    py: 1.3,
                    boxShadow: 4,
                    "&:hover": {
                      boxShadow: 8,
                    },
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Box>

            <Stack spacing={1.5} alignItems="center">
              <Typography variant="body2">
                Don&apos;t have an account?{" "}
                <MuiLink
                  component={Link}
                  to="/createAccount"
                 
                  underline="hover"
                  sx={{ fontWeight: 600 }}
                >
                  Create Account
                </MuiLink>
              </Typography>


                  <div className="flex align-middle justify-center gap-2">
              <Button
                component={Link}
                to="/forgetPassword"
                variant="outlined"
                size="medium"
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 4,
                }}
              >
                Forget Password
              </Button>
              <Button
                component={Link}
                to="/adminLogin"
                variant="outlined"
                size="medium"
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 4,
                }}
              >
                Admin Login
              </Button>
                  </div>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserLogin;
