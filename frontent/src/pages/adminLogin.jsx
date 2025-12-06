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

const AdminLogin = () => {
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
        bgcolor:
          "linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #001f3f 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 4,
            textAlign: "center",
            bgcolor: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Stack spacing={3}>
            
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                Admin Panel
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in with admin credentials to manage the movie application.
              </Typography>
            </Box>

            
            <Box component="form" onSubmit={onSubmit}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                  >
                    Admin Email
                  </Typography>
                  <TextField
                    fullWidth
                    type="email"
                    required
                    placeholder="Enter admin email"
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
                    Admin Password
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    type="password"
                    placeholder="Enter admin password"
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
                    backgroundColor: "#0ef712",
                    "&:hover": {
                      backgroundColor: "#08306b",
                      boxShadow: 8,
                    },
                  }}
                >
                  Login as Admin
                </Button>
                
              </Stack>
            </Box>

            
            <Stack spacing={1.5} alignItems="center">
              <Typography variant="body2">
                Not an admin?{" "}
                <MuiLink
                  component={Link} 
                  to="/userLogin"
                  underline="hover"
                  sx={{ fontWeight: 600 }}
                >
                  User Login
                </MuiLink>
              </Typography>
                  <div className="flex justify-center align-middle gap-2">
                  <Button
                variant="outlined"
                size="medium"
                 component={Link}
                 to="/createAdminAccount"
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 4,
                  borderColor: "#0d47a1",
                  color: "#0d47a1",
                  "&:hover": {
                    borderColor: "#08306b",
                    color: "#08306b",
                  },
                }}
              >
                Forget Password
              </Button>
              <Button
                variant="outlined"
                size="medium"
                 component={Link}
                 to="/createAdminAccount"
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 4,
                  borderColor: "#0d47a1",
                  color: "#0d47a1",
                  "&:hover": {
                    borderColor: "#08306b",
                    color: "#08306b",
                  },
                }}
              >
                Create Admin Account
              </Button>
                  </div>
              
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
