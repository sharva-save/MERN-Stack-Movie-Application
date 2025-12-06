
import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  TextField,
  Pagination,
} from "@mui/material";
import MovieCard from "../user/MovieCard";
import { moviesMock } from "../data/moviesMock";

const ITEMS_PER_PAGE = 10;

const UserSearchPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredMovies = useMemo(() => {
    const term = search.toLowerCase();
    if (!term) return moviesMock;
    return moviesMock.filter(
      (m) =>
        m.title.toLowerCase().includes(term) ||
        m.description.toLowerCase().includes(term)
    );
  }, [search]);

  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = filteredMovies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
              setPage(1);
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
          {filteredMovies.length} result(s) found
        </Typography>

        {/* Movie list */}
        <Box sx={{ mb: 3 }}>
          {paginatedMovies.map((movie, idx) => (
            <MovieCard key={movie.id} movie={movie} index={startIndex + idx} />
          ))}
        </Box>

        {/* Pagination */}
        <Stack alignItems="center">
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

export default UserSearchPage;
