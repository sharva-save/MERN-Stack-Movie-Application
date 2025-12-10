// pages/UserHomePage.jsx
import React, { useState, useMemo, useEffect } from "react";
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
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const ITEMS_PER_PAGE = 12;

const UserHomePage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("ranking");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch movies from backend
  const getAllMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/movie/getallmovie");
      const result = await response.json();
      const arr = Array.isArray(result) ? result : result.data || [];
      setMovies(arr);
      console.log('====================================');
      console.log(arr);
      console.log('====================================');
    } catch (err) {
      console.error("error in fetching the movie", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  // memoized sorted array
  const sortedMovies = useMemo(() => {
    // fix: clone the array, not wrap it in [movies]
    const arr = [...movies];

    if (sortBy === "rating") {
      arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "year") {
      arr.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sortBy === "name") {
      arr.sort((a, b) => {
        const A = (a.title || "").toLowerCase();
        const B = (b.title || "").toLowerCase();
        if (A < B) return -1;
        if (A > B) return 1;
        return 0;
      });
    } else if (sortBy === "duration") {
      const toMinutes = (d) => {
        if (!d) return 0;
        const hoursMatch = d.match(/(\d+)\s*h/);
        const minsMatch = d.match(/(\d+)\s*m/);
        const h = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
        const m = minsMatch ? parseInt(minsMatch[1], 10) : 0;
        return h * 60 + m;
      };
      arr.sort((a, b) => toMinutes(b.duration) - toMinutes(a.duration));
    } else {
      // ranking: use rank if present, else keep server order
      arr.sort((a, b) => {
        if (a.rank != null && b.rank != null) return a.rank - b.rank;
        return 0;
      });
    }

    return arr;
  }, [movies, sortBy]);

  // pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedMovies.length / ITEMS_PER_PAGE));
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = sortedMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // when user changes sorting, reset to page 1
  const handleSortChange = (value) => {
    setSortBy(value);
    setPage(1);
  };

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
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          IMDb Top Movies
        </Typography>
        <Typography variant="body2" color="gray.400" sx={{ mb: 3 }}>
          As rated by regular users.
        </Typography>

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
              {/* placeholder watchedCount */}
              0 of {sortedMovies.length} watched
            </Typography>
            <LinearProgress variant="determinate" value={0} sx={{ borderRadius: 999, height: 8 }} />
          </Box>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel sx={{ color: "white" }}>Sort by</InputLabel>
            <Select
              value={sortBy}
              label="Sort by"
              onChange={(e) => handleSortChange(e.target.value)}
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": { borderColor: "#64748b" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                ".MuiSvgIcon-root": { color: "white" },
              }}
            >
              <MenuItem value="ranking">Ranking</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="releaseDate">Release date</MenuItem>
              <MenuItem value="duration">Duration</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </FormControl>

          <Button component={Link} to="/UserSearchPage" color="success" variant="contained" sx={{ textTransform: "none", borderRadius: 999 }}>
            Search Movies
          </Button>
        </Stack>

        <Box sx={{ mb: 3 }}>
          {loading ? (
            <Typography>Loading movies...</Typography>
          ) : paginatedMovies.length === 0 ? (
            <Typography>No movies found</Typography>
          ) : (
            paginatedMovies.map((movie, idx) => {
              const key = movie._id || `${movie.rank || idx}-${movie.title || idx}-${movie.year || ""}-${movie.photo || ""}`;
              return <MovieCard key={key} movie={movie} index={startIndex + idx} />;
            })
          )}
        </Box>

        <Stack alignItems="center" sx={{ mb: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            shape="rounded"
            color="primary"
            sx={{
    '.MuiPaginationItem-root': { color: 'rgba(255,255,255,0.9)' }, // page numbers
    '.MuiPaginationItem-root.Mui-selected': { backgroundColor: '#1976d2' }, // selected page bg
    '& .MuiPagination-ul': { justifyContent: 'center' }
  }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default UserHomePage;
