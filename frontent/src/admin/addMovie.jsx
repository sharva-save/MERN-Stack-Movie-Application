// pages/AdminAddMovie.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const certificates = ["Not Rated", "G", "PG", "PG-13", "R", "NC-17", "Approved"];

export default function AddMovie() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rank: "",
    title: "",
    year: "",
    certificate: "Not Rated",
    duration: "",
    rating: "",
    votes: "",
    posterUrl: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: "success", message: "" });

  const validate = () => {
    const e = {};
    if (!form.title) e.title = "Title is required";
    if (!form.year || isNaN(Number(form.year))) e.year = "Valid year required";
    if (!form.duration) e.duration = "Duration required (e.g. '2h 22m')";
    if (form.rating && (isNaN(Number(form.rating)) || Number(form.rating) < 0 || Number(form.rating) > 10))
      e.rating = "Rating must be a number between 0 and 10";
    // rank is optional but if provided should be a number
    if (form.rank && isNaN(Number(form.rank))) e.rank = "Rank must be a number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (key) => (ev) => {
    setForm((s) => ({ ...s, [key]: ev.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // simple preview function: returns posterUrl or blank
  const PosterPreview = () => {
    if (!form.posterUrl) return null;
    return (
      <Box sx={{ my: 1 }}>
        <img
          src={form.posterUrl}
          alt="poster preview"
          style={{ width: 160, height: "auto", borderRadius: 6, boxShadow: "0 2px 6px rgba(0,0,0,0.6)" }}
          onError={(e) => { e.currentTarget.src = ""; }}
        />
      </Box>
    );
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        rank: form.rank ? Number(form.rank) : undefined,
        title: form.title,
        year: form.year ? Number(form.year) : undefined,
        certificate: form.certificate,
        duration: form.duration,
        rating: form.rating ? Number(form.rating) : undefined,
        votes: form.votes || "",
        posterUrl: form.posterUrl || "",
        description: form.description || "",
      };

      // POST to backend — change URL if your backend expects another path
      const res = await fetch("http://localhost:3000/movie/addmovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `HTTP ${res.status}`);
      }

      const created = await res.json();
      setSnack({ open: true, severity: "success", message: "Movie added successfully" });
      // small delay then navigate back to home (or clear form)
      setTimeout(() => {
        navigate("/UserHomePage"); // or navigate to admin list page
      }, 900);
    } catch (err) {
      console.error("Add movie error:", err);
      setSnack({ open: true, severity: "error", message: err.message || "Failed to add movie" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff", color: "white", py: 6 }}>
      <Container maxWidth="md">
        <Typography  sx={{  color: "#000000" , fontSize: "25px"}}>
          Admin — Add Movie
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: "rgba(255,255,255,0.03)", p: 3, borderRadius: 2 }}>
          <Stack spacing={2}>
            <TextField
              label="Rank (optional)"
              value={form.rank}
              onChange={handleChange("rank")}
              error={!!errors.rank}
              helperText={errors.rank}
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
            />

            <TextField
              label="Title *"
              value={form.title}
              onChange={handleChange("title")}
              error={!!errors.title}
              helperText={errors.title}
              required
            />

            <TextField
              label="Year *"
              value={form.year}
              onChange={handleChange("year")}
              error={!!errors.year}
              helperText={errors.year}
              required
              type="number"
            />

            <TextField
              select
              label="Certificate"
              value={form.certificate}
              onChange={handleChange("certificate")}
            >
              {certificates.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Duration (e.g. 2h 22m) *"
              value={form.duration}
              onChange={handleChange("duration")}
              error={!!errors.duration}
              helperText={errors.duration}
              required
            />

            <TextField
              label="Rating (0-10)"
              value={form.rating}
              onChange={handleChange("rating")}
              error={!!errors.rating}
              helperText={errors.rating}
              type="number"
              inputProps={{ step: "0.1", min: 0, max: 10 }}
            />

            <TextField label="Votes (optional)" value={form.votes} onChange={handleChange("votes")} />

            <TextField
              label="Poster URL (absolute URL)"
              value={form.posterUrl}
              onChange={handleChange("posterUrl")}
              helperText="Use full image URL, or leave blank and add later"
            />
            <PosterPreview />

            <TextField
              label="Description"
              value={form.description}
              onChange={handleChange("description")}
              multiline
              rows={4}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" color="inherit" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={submitting}>
                {submitting ? "Adding…" : "Add Movie"}
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Snackbar
          open={snack.open}
          autoHideDuration={3000}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
        >
          <Alert severity={snack.severity} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
            {snack.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
