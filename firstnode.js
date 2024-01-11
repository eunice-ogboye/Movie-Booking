const Joi = require("joi");
var express = require("express");
var app = express();

app.use(express.json());
courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
]
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
})


app.post("/api/courses", (req, res) => {
    const {error} = validateCourse(req.body)
    if(error)  return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})


app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send("Course not found")
    res.send(course)
})



app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("Course not found")

    const schema = {
        name: Joi.string().min(3).required()
    }
    const { error } = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name
    res.send(course)
})
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

app.listen(3000, () => console.log("Example app listening on port 3000!"));
