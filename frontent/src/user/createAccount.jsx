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

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passkey, setPasskey] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    // later: hit your signup API here
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor:
          "linear-gradient(135deg, #020617 0%, #111827 50%, #1f2933 100%)",
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
            {/* Header */}
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                Welcome
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Create your account to start exploring movies and managing your
                favourites.
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={onSubmit}>
              <Stack spacing={2.5}>
                {/* Name */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                  >
                    Name
                  </Typography>
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    size="medium"
                  />
                </Box>

                {/* Email */}
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

                {/* Password */}
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

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                  >
                    Pass key - You Need this Key for Forget Password
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    placeholder="Enter your Pass key"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    size="medium"
                  />
                </Box>

                {/* Submit button */}
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
                  Create Account
                </Button>
              </Stack>
            </Box>

            {/* Bottom actions */}
            <Stack spacing={1.5} alignItems="center">
              <Typography variant="body2">
                Already have an account?{" "}
                <MuiLink
                  component={Link}
                  to="/userLogin"
                  href="#"
                  underline="hover"
                  sx={{ fontWeight: 600 }}
                >
                  Login
                </MuiLink>
              </Typography>

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
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateAccount;
