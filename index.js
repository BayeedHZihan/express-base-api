const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "hbd", roll:3 },
    { id: 2, name: "nectar", roll:4 },
    { id: 3, name: 'callus', roll:23 }
]

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/students/', (req, res) => {
    res.send(students);
});

app.get('/api/students/:id', (req, res) =>{
    const student = students.find(s => s.id === parseInt(req.params.id));
    //let student;
    // for (let i=0; i<students.length; i++){
    //     if (students[i].id === parseInt(req.params.id)) {
    //         student = students[i];
    //         break;
    //     }
    // }
    if (!student) res.status(404).send("No match of student found.");
    else res.send(student);
})

app.post('/api/students/', (req, res) =>{
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required(),
    //     roll: Joi.number().integer().min(1).max(100).required()
    // });
    
    // const result = schema.validate(req.body);

    const result = validateReq(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    const student = {
        id : students.length + 1,
        name : req.body.name,
        roll : req.body.roll
    }
    students.push(student);
    res.send(student);
})

app.put('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) res.status(404).send("No match of student found.");

    // const schema = Joi.object({
    //     name: Joi.string().min(3).required(),
    //     roll: Joi.number().integer().min(1).max(100).required()
    // });
    
    //const result = schema.validate(req.body);

    const result = validateReq(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    student.name = req.body.name;
    student.roll = req.body.roll;
    res.send(student);
})

app.delete('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send("No match of student found.");

    const index = students.indexOf(student);
    students.splice(index, 1);

    res.send(student);
})

function validateReq(student){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        roll: Joi.number().integer().min(1).max(100).required()
    });
    
    return schema.validate(student);
}

app.listen (5000, ()=> {
    console.log('listening on port 5000...')
})
