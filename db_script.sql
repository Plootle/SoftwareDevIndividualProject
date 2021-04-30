#create table
CREATE TABLE IF NOT EXISTS showTable(
    id SERIAL PRIMARY KEY, 
    show VARCHAR(255), 
    review VARCHAR(7999), 
    revdate TIMESTAMP
    );