const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
let id = 1;
const users = [];

app.post('/users', (req, res) => {
    const email = req.body.email;
    const name = req.body.name
    const user = {
        id: id,
        name: name,
        email: email
    };

    users.push(user);
    res.status(201).json(user);  // Only one response, sending JSON
    id++;
});

app.get('/users/:id', (req, res) => {
    const in_id = parseInt(req.params.id);
    const user = users.find(u => u.id === in_id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.put('/users/:id', (req, res) => {
    const in_id = parseInt(req.params.id);
    const user = users.find(u => u.id === in_id);

    if (user) {
        const email = req.body.email;
        const name = req.body.name;
        if (name) user.name = name;
        if (email) user.email = email;
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE /users/:id - Delete user by ID
app.delete('/users/:id', (req, res) => {
    const in_id = parseInt(req.params.id);
    const user_index = users.findIndex(u => u.id === in_id);
    
    if (user_index !== -1) {
        users.splice(user_index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing with this code
