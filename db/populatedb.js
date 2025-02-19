import pkg from 'pg';

const { Client } = pkg;

const SQL_CREATE_TABLES = `
    CREATE TABLE IF NOT EXISTS genres (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS developers (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255),
        description TEXT,
        released_at DATE,
        genre_id INTEGER,
        developer_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_genre 
            FOREIGN KEY (genre_id)
            REFERENCES genres(id) 
            ON DELETE SET NULL 
            ON UPDATE CASCADE,
        CONSTRAINT fk_developer 
            FOREIGN KEY (developer_id) 
            REFERENCES developers(id) 
            ON DELETE SET NULL 
            ON UPDATE CASCADE

    );
`;

const SQL_INSERT_DATA = `
    INSERT INTO genres (name) VALUES
    ('Action'),
    ('Adventure'),
    ('RPG'),
    ('Simulation'),
    ('Strategy')
    ON CONFLICT DO NOTHING;

    INSERT INTO developers (name) VALUES
    ('Naughty Dog'),
    ('CD Projekt Red'),
    ('Bethesda Game Studios'),
    ('Electronic Arts'),
    ('Square Enix')
    ON CONFLICT DO NOTHING;

    INSERT INTO games (name, description, released_at, genre_id, developer_id) VALUES
    ('The Last of Us', 'An action-adventure game set in a post-apocalyptic world.', '2013-06-14', 1, 1),
    ('The Witcher 3: Wild Hunt', 'An open-world RPG with a rich story and deep character development.', '2015-05-19', 3, 2),
    ('Skyrim', 'An open-world RPG where players explore the province of Skyrim.', '2011-11-11', 3, 3),
    ('FIFA 22', 'A football simulation game with real teams and players.', '2021-10-01', 4, 4),
    ('Final Fantasy VII', 'A classic RPG that follows Cloud Strife and his companions in their quest to save the world.', '1997-01-01', 3, 5)
    ON CONFLICT DO NOTHING;

`;

async function main(){
    const client = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    });

    try {
        await client.connect();

        await client.query(SQL_CREATE_TABLES);
        console.log("Tables created successfully");

        await client.query(SQL_INSERT_DATA);
        console.log("Data inserted successfully");
    } catch (error) {
        console.log("Error executing query : " + error.message)
    } finally {
        await client.end();
    }
}

main();
