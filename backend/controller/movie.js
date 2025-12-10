const movie = require("../Schema/movieSchema");

const getAllMovies = async (req, res) => {
  try {
    const movies = await movie.find({});
//     console.log(movies);
    res
      .status(200)
      .json({ message: "get successful", success: true, data: movies });
    
  } catch (error) {
    console.log("error in fetching all movies", error);
  }
};



const addMovie = async (req, res) => {
  try {
    // Basic destructive-safe copy from request body
    const {
      rank,
      title,
      year,
      certificate,
      duration,
      rating,
      votes,
      posterUrl,
      description,
    } = req.body || {};

    // Simple validation
    if (!title || !year || !duration) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, year and duration are required.",
      });
    }

    // Coerce numeric fields (if provided)
    const payload = {
      rank: rank !== undefined && rank !== null ? Number(rank) : undefined,
      title: String(title).trim(),
      year: Number(year),
      certificate: certificate ? String(certificate) : undefined,
      duration: String(duration).trim(),
      rating: rating !== undefined && rating !== null ? Number(rating) : undefined,
      votes: votes ? String(votes) : undefined,
      posterUrl: posterUrl ? String(posterUrl) : undefined,
      description: description ? String(description) : undefined,
    };

    // Remove undefined keys so mongoose will use defaults where appropriate
    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    // OPTIONAL: If you want to prevent duplicate ranks or imdb entries,
    // you can check here (example comment):
    // const exists = await Movie.findOne({ title: payload.title, year: payload.year });
    // if (exists) return res.status(409).json({ success:false, message: "Movie already exists" });

    const created = await movie.create(payload);

    return res.status(201).json({
      success: true,
      message: "Movie created",
      data: created,
    });
  } catch (err) {
    console.error("addMovie error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};




module.exports={
               getAllMovies,
               addMovie
}