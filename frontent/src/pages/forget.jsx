import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';

const Forget = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPasswored, setCPAssword] = useState("");
  const [passkey, setPasskey] = useState();
  const [error, setError] = useState("");      
  const [success, setSuccess] = useState("");  

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== cPasswored) {
      setSuccess("");
      setError("Passwords do not match!");
      return;
    }
    setError("");
    setSuccess("Password reset successfully ");

    console.log( email,passkey,password,cPasswored);
    
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg,#111827,#1f2937,#374151)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 4,
            textAlign: "center",
            bgcolor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Stack spacing={3}>
            {/* Header */}
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Forgot Password?
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Enter your email and we will send you a link to reset your password.
            </Typography>
             {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            {/* Form */}
            <Box component="form" onSubmit={onSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  fullWidth
                  type="number"
                  label="Passkey"
                  required
                  placeholder="Enter your Passkey"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  required
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Re Enter Password"
                  required
                  placeholder="Enter your Confirm Password"
                  value={cPasswored}
                  onChange={(e) => setCPAssword(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 1,
                    py: 1.3,
                    borderRadius: 999,
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: 4,
                    "&:hover": { boxShadow: 8 },
                  }}
                >
                   Reset Password
                </Button>

                
              </Stack>
            </Box>

            {/* Bottom link */}
            <Typography variant="body2" sx={{ mt: 1 }}>
              Remembered your password?{" "}
              <Link
                to="/userLogin"
                style={{ textDecoration: "underline", fontWeight: 600 }}
              >
                Login here
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Forget;
