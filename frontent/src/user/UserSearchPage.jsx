// pages/UserSearchPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  TextField,
  Pagination,
} from "@mui/material";
import MovieCard from "../user/MovieCard";

const ITEMS_PER_PAGE = 10;

const UserSearchPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch movies once
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/movie/getallmovie");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = await res.json();
        const arr = Array.isArray(body) ? body : body.data || [];
        setMovies(arr);
      } catch (err) {
        console.error("Failed to load movies:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // filter using the live movies array (safe access if description missing)
  const filteredMovies = useMemo(() => {
    const term = (search || "").toLowerCase().trim();
    if (!term) return movies;
    return movies.filter((m) => {
      const title = (m.title || "").toLowerCase();
      const desc = (m.description || "").toLowerCase();
      return title.includes(term) || desc.includes(term);
    });
  }, [search, movies]);

  // ensure at least 1 page so Pagination always renders
  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / ITEMS_PER_PAGE));
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // keep page in range when filteredMovies changes
  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filteredMovies.length / ITEMS_PER_PAGE));
    if (page > pages) setPage(1);
  }, [filteredMovies, page]);

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
          Search Movies
        </Typography>
        <Typography variant="body2" color="gray.400" sx={{ mb: 3 }}>
          Search by movie title or description.
        </Typography>

        {/* Search bar */}
        <Stack sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for a movie..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset to first page on new search
            }}
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Stack>

        {/* Results count */}
        <Typography variant="body2" sx={{ mb: 1 }}>
          {loading ? "Loading..." : `${filteredMovies.length} result(s) found`}
        </Typography>

        {/* Movie list */}
        <Box sx={{ mb: 3 }}>
          {loading ? (
            <Typography>Loading movies...</Typography>
          ) : paginatedMovies.length === 0 ? (
            <Typography>No movies found</Typography>
          ) : (
            paginatedMovies.map((movie, idx) => {
              // use stable unique key (_id from Mongo) or fallback to composite
              const key = movie._id || `${movie.rank || idx}-${movie.title || idx}-${movie.year || ""}`;
              return <MovieCard key={key} movie={movie} index={startIndex + idx} />;
            })
          )}
        </Box>

        {/* Pagination */}
        <Stack alignItems="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            shape="rounded"
            color="primary"
            sx={{
              ".MuiPaginationItem-root": { color: "rgba(255,255,255,0.95)" },
              ".MuiPaginationItem-root.Mui-selected": { backgroundColor: "#1976d2" },
              ".MuiPagination-ul": { justifyContent: "center" },
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default UserSearchPage;
