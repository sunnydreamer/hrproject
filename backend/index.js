const app = require('./app');
const connection = require("./config/db");

const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     res.send("Welcome to backend")
// });

connection.once('open', () => {
    app.listen(port, () => {
        console.log(`Server is up and running on: http://localhost:${port}`);
    });
});

