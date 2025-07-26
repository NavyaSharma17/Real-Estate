// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api/realestate', require('./routes/realEstateRoutes'));
// app.use('/api/maids', require('./routes/maidRoutes'));

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(Server running on port ${PORT});
// });

const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const fs = require('fs');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Serve static files from the 'frontendrev' directory
app.use(express.static(path.join(__dirname, 'frontendrev')));

// Route to serve frontpage.html as the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontendrev/frontpage.html'));
});

app.post('/add', (req, res) => {
    const obj = req.body;

    // Append the obj to .json by fs
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        
        if (!data) {
            fs.writeFile('./data.json', JSON.stringify([obj], null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return;
                }

                res.json(obj);
            });
            return;
        }

        const properties = JSON.parse(data);
        properties.push(obj);

        fs.writeFile('./data.json', JSON.stringify(properties, null, 2), (err) => {
            if (err) {
                console.error(err);
                return;
            }

            res.json(obj);
        });
    });
})

app.get('/get', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(data);
        res.json(JSON.parse(data));
    });
})

// Routes
app.use('/api/realestate', require('./routes/realEstateRoutes'));
app.use('/api/maids', require('./routes/maidRoutes'));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


