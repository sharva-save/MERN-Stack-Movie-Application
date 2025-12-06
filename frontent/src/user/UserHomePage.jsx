// pages/UserHomePage.jsx
import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  LinearProgress,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MovieCard from "./MovieCard";
import { moviesMock } from "../data/moviesMock";
import UserSearchPage from "./UserSearchPage";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ITEMS_PER_PAGE = 10;

const UserHomePage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("ranking"); // ranking | rating | year

  const sortedMovies = useMemo(() => {
    const arr = [...moviesMock];
    if (sortBy === "rating") {
      arr.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "year") {
      arr.sort((a, b) => b.year - a.year);
    }
    // ranking = original order
    return arr;
  }, [sortBy]);

  const totalPages = Math.ceil(sortedMovies.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = sortedMovies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const watchedCount = 0; // from backend later
  const progress = (watchedCount / sortedMovies.length) * 100;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#020617",
        color: "white",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          IMDb Top Movies
        </Typography>
       
        <Typography variant="body2" color="gray.400" sx={{ mb: 3 }}>
          As rated by regular users.
        </Typography>

        {/* Progress + sort bar */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "rgba(15,23,42,0.9)",
            mb: 3,
          }}
        >
               
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {watchedCount} of {sortedMovies.length} watched
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ borderRadius: 999, height: 8 }}
            />
          </Box>
          

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel sx={{ color: "white" }}>Sort by</InputLabel>
            <Select
              value={sortBy}
              label="Sort by"
              onChange={(e) => setSortBy(e.target.value)}
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": { borderColor: "#64748b" },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                ".MuiSvgIcon-root": { color: "white" },
              }}
            >
              <MenuItem value="ranking">Ranking</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="releaseDate">Release date</MenuItem>
              <MenuItem value="duration">Duration</MenuItem>
            </Select>

          </FormControl>
           <Button
    component={Link}
    to="/UserSearchPage"
    color="success"
    variant="contained"
    sx={{ textTransform: "none", borderRadius: 999 }}
  >
    Search Movies
  </Button>
        </Stack>

        {/* Movie list */}
        <Box sx={{ mb: 3 }}>
          {paginatedMovies.map((movie, idx) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={startIndex + idx}
            />
          ))}
        </Box>

        {/* Pagination */}
        <Stack alignItems="center" sx={{ mb: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            shape="rounded"
            color="primary"
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default UserHomePage;
