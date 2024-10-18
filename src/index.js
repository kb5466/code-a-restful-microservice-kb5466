const express = require('express');
const {v4: uuidv4} = require('uuid');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let id = 1;
const users = [];
app.post('/users', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const user = {
        id: id,
        name: name,
        email: email
    };

    users.push(user);
    res.status(201).json(user);
    res.send(`ID:${id}\nNAME:${name}\nEMAIL:${email}`);
    id = id + 1;
});

app.get('/users/:id', (req, res) => {
    const in_id = parseInt(req.params.id);
    const user = users.find(u => u.id == in_id);
    if(user){
        res.status(200).json(user);
        res.send(`ID:${id}\nNAME:${name}\nEMAIL:${email}`)
    }
    else{
        res.status(404).json({message: 'User not found'});
    }
});

app.put('/users/:id', (req, res) => {
    const in_id = parseInt(req.params.id);
    const user = users.find(u => u.id == in_id);

    if(user){
        const name = req.body.name;
        const email = req.body.email;
        if(name) user.name = name;
        if(email) user.email = email;
        res.status(200).json(user);
        res.send(`ID:${id}\nNAME:${name}\nEMAIL:${email}`)
        user[in_id] = user;
    }
    else{
        res.status(404).json({message: 'User not found'});
    }
});

app.delete('/users/:id',(req,res) =>{
    const in_id = parseInt(req.params.id);
    const user_index = users.findIndex(u=> u.id == in_id);
    if(user_index !== -1){
        users.splice(user_index,1);
        
        res.status(204).send();
    }
    else{
        res.status(404).json({message: 'User not found'});
    }
});  

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing