const { Pool } = require('pg');


const pool = new Pool({
    user: 'timesheet_api_user',
    host: 'localhost',
    database: 'timesheet_api',
    password: 'password',
    port: 5432,
});

const getTimesheets = (req, res) => {
    pool.query('SELECT * FROM timesheets;', (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        } res.status(200).json(results.rows);
    });
}

const getProjectView = (req, res) => {
    pool.query(
        `with subtotal as (
            SELECT project_name, client_name, billable, SUM(billable_hours) AS hours, SUM(billable_hours)*billable_rate as billable_amount 
            FROM timesheets GROUP BY project_name, client_name, billable, billable_rate 
            ORDER BY project_name
        )
        SELECT project_name, client_name, billable, SUM(hours) AS hours, SUM(billable_amount) as billable_amount from subtotal GROUP BY project_name, client_name, billable ORDER BY client_name`,
        (error, results) => {
            if(error) {
                console.log(error);
                throw error;
            } res.status(200).json(results.rows);
        });
}

const createTimesheet = (req, res) => {
    const {
        timesheet_date,
        client_name,
        project_name,
        project_code,
        billable_hours,
        billable,
        first_name,
        last_name,
        billable_rate
    } = req.body;

    pool.query(`INSERT INTO timesheets(timesheet_date, client_name, project_name, project_code, billable_hours,
                billable, first_name, last_name, billable_rate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING ID, timesheet_date, client_name, project_name, project_code, billable_hours,
                billable, first_name, last_name, billable_rate`,
                [timesheet_date, client_name, project_name, project_code, billable_hours, billable, first_name, last_name, billable_rate],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        throw error;
                    } res.status(201).json(results.rows[0]);
                }
            );
}


module.exports = {
    getTimesheets,
    getProjectView,
    createTimesheet
};

// 'SELECT project_name, client_name, billable, SUM(billable_hours) AS hours, SUM(billable_hours)*billable_rate as billable_amount FROM timesheets GROUP BY project_name, client_name, billable, billable_rate ORDER BY project_name;'
// 'WHERE '
// `
// SELECT project_name, client_name, billable, billable_rate, SUM(billable_hours) AS hours, SUM(billable_hours)*billable_rate as billable_amount FROM timesheets
// `

// `
// SELECT project_name, client_name, billable, billable_rate, billable_hours AS hours, SUM(billable_hours)*billable_rate as billable_amount FROM timesheets GROUP BY project_name, client_name, billable, billable_hours, billable_rate ORDER BY project_name;
// `

// `
// SELECT project_name, client_name, billable, SUM(hours) AS hours, SUM(billable_amount) as billable_amount from query1
// (SELECT project_name, client_name, billable, SUM(billable_hours) AS hours, SUM(billable_hours)*billable_rate as billable_amount 
// FROM timesheets GROUP BY project_name, client_name, billable, billable_rate 
// ORDER BY project_name ) as query1;

// `

// `
// with subtotal as (
//     SELECT project_name, client_name, billable, SUM(billable_hours) AS hours, SUM(billable_hours)*billable_rate as billable_amount 
//     FROM timesheets GROUP BY project_name, client_name, billable, billable_rate 
//     ORDER BY project_name
// )
// SELECT project_name, client_name, billable, SUM(hours) AS hours, SUM(billable_amount) as billable_amount from subtotal GROUP BY project_name, client_name, billable ORDER BY project_name, billable;
// `