const database = require("./database");

const deleteMovie = (req, res) => {
    const id = parseInt(req.params.id);

    database
        .query("DELETE FROM movies WHERE id = ?", [id])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.sendStatus(404);
            } else res.sendStatus(204);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
};

const putMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, director, year, color, duration } = req.body;

    database
        .query(
            "UPDATE movies SET title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
            [title, director, year, color, duration, id]
        )
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.status(404).send("Not Found");
            } else {
                res.sendStatus(204).send("good");
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
};

const postMovie = (req, res) => {
    const { title, director, year, color, duration } = req.body;

    database
        .query(
            "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
            [title, director, year, color, duration]
        )
        .then(([result]) => {
            res.location(`/api/movies/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500).send("error saving the movie");
        });
};

const getMovies = (req, res) => {
    let sql = "select * from movies";
    const sqlValues = [];

    if (req.query.color) {
        sql += " where color = ?";
        sqlValues.push(req.query.color);
    }

    if (req.query.duration) {
        sql += " where duration < ?";
        sqlValues.push(req.query.duration);
    }

    database
        .query(sql, sqlValues)
        .then(([movies]) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");
        });
};

const getMovieById = (req, res) => {
    const id = parseInt(req.params.id);

    database
        .query("select * from movies where id = ?", [id])
        .then(([movies]) => {
            if (movies[0] != null) {
                res.json(movies[0]);
            } else {
                res.status(404).send("Not Found");
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");
        });
};

module.exports = {
    getMovies,
    getMovieById,
    postMovie,
    putMovie,
    deleteMovie,
};
