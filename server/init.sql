CREATE ROLE timesheet_api_user WITH LOGIN PASSWORD 'password';
CREATE TABLE timesheets (
  ID SERIAL PRIMARY KEY,
  timesheet_date DATE NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  project_name VARCHAR(255) NOT NULL,
  project_code VARCHAR(15) NOT NULL,
  billable_hours NUMERIC NOT NULL,
  billable BOOLEAN NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  billable_rate INT NOT NULL
);
 
 COPY timesheets(timesheet_date, client_name, project_name, project_code, billable_hours, billable, first_name, last_name, billable_rate)
 FROM '/Users/timpacius/dev/giant-machines/server/GM_Coding_Exercise_Sample_Data_-_GM_Coding_Exercise_Sample_Data.csv' DELIMITER ',' CSV HEADER;

 GRANT USAGE ON SCHEMA public TO timesheet_api_user;
 GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO timesheet_api_user;
 GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO timesheet_api_user;