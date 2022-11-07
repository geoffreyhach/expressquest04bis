require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT ?? 5000;

app.use(express.json());

const welcome = (req, res) => {
    res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const { validateMovie } = require("./validator");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.putMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

const {
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser,
} = require("./userHandlers");

const { validateUser } = require("./validator");

app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);
app.post("/api/users", validateUser, postUser);
app.put("/api/users/:id", validateUser, putUser);
app.delete("/api/users/:id", deleteUser);

app.listen(port, (err) => {
    if (err) {
        console.error("Something bad happened");
    } else {
        console.log(`Server is listening on ${port}`);
    }
});
