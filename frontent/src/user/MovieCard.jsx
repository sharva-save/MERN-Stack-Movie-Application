// components/MovieCard.jsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Stack,
  Button,
  Chip,
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

const 
MovieCard = ({ movie, index }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "stretch",
        borderRadius: 3,
        mb: 2,
        overflow: "hidden",
        ":hover": {
          boxShadow: 4,
        },
      }}
    >
      {/* Poster + rank badge */}
      <Box
        sx={{
          position: "relative",
          width: 110,
          minWidth: 110,
          bgcolor: "#000",
        }}
      >
        <CardMedia
          component="img"
          image={movie.poster}
          alt={movie.title}
          sx={{ height: "100%", objectFit: "cover" }}
        />
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 6,
            left: 6,
            bgcolor: "rgba(0,0,0,0.6)",
            color: "white",
            ":hover": { bgcolor: "rgba(0,0,0,0.8)" },
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>

        <Chip
          label={`#${index + 1}`}
          size="small"
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            bgcolor: "#2563eb",
            color: "white",
            fontWeight: 700,
          }}
        />
      </Box>

      {/* Text info */}
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {movie.title}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {movie.year}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • {movie.duration}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • {movie.certificate}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 600 }}
            >
              {movie.description}
            </Typography>
          </Box>

          <Stack alignItems="flex-end" spacing={1}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              ⭐ {movie.rating} ({movie.votes} votes)
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="text">
                Rate
              </Button>
              <Button size="small" variant="text">
                Mark as watched
              </Button>
              
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
