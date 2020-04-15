const express = require('express');
const bodyParser = require('body-parser');
const port = 4000;
const db = require('./queries');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));
app.use(cors());

app.get('/timesheets', db.getTimesheets);
app.post('/timesheets', db.createTimesheet);

app.get('/projects', db.getProjectView);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});