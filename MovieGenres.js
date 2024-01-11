const Joi = require("joi");
const express = require('express');
const app = express()

app.use(express.json());
genres = [
    { id: 1, genres: "Action"},
    { id: 2, genres: "Comedy"},
    { id: 3, genres: "Drama"}
]

app.get("/", function (req, res) {
    res.send("Hello World!");
  });

app.get("/api/genres", (req, res) => {
    res.send(genres)
})
app.post("/api/genres", (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        genres: req.body.genres
    }
    genres.push(genre)
    res.send(genre)
})

app.put("/api/genres/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre with the given ID was not found.")

    // const {error} = validateGenre(req.body);
    // if (error) return res.status(400).send(error.details[0].message)

    genre.genres = req.body.genres
    res.send(genre);
})

app.delete("/api/genres/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre with the given ID was not found.");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
})

const validateGenre = (genre) => {
    const schema = {
        genres: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}



app.listen(5000, () => console.log("Example app listening on port 5000!"));