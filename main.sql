-- Active: 1759236719174@@127.0.0.1@5432@db

CREATE DATABASE db;
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50) NOT NULL
);

INSERT INTO users(first_name, last_name, email, password, phone_number) 
 VALUES (
   'Bunyodbek', 'Gulomjonov', 'gulomjonovbunyodbek9@gmail.com', '12345', '+998939349340'),
 ('Dilshod', 'Karimov', 'dilshod.karimov@example.com', 'qwerty', '+998901234567'),
('Malika', 'Saidova', 'malika.saidova@example.com', 'abc123', '+998935551122'),
('Javlon', 'Rahmonov', 'javlon.rahmonov@example.com', 'mypassword', '+998977778899'),
('Aziza', 'Yuldasheva', 'aziza.yuldasheva@example.com', 'pass123', '+998931112233'),
('Sherzod', 'Bektemirov', 'sherzod.bektemirov@example.com', 'letmein', '+998994445566'),
('Lola', 'Rustamova', 'lola.rustamova@example.com', 'secure1', '+998909998877'),
('Islom', 'Tursunov', 'islom.tursunov@example.com', 'hello123', '+998939393939'),
('Madina', 'Xolmatova', 'madina.xolmatova@example.com', 'sunshine', '+998971234321'),
('Oybek', 'Usmonov', 'oybek.usmonov@example.com', 'welcome', '+998951112244');

SELECT * FROM users;

CREATE Table if NOT EXISTS posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NUll,
    content TEXT,
    slug VARCHAR(100) NOT NULL UNIQUE,
    user_id INT REFERENCES users(id)
);

-- Jadvalni yaratish
CREATE TABLE IF NOT EXISTS posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    slug VARCHAR(100) NOT NULL UNIQUE,
    user_id INT REFERENCES users(id)
);

-- 10 ta ma'lumot qo'shish
INSERT INTO posts (title, content, slug, user_id) VALUES
('My First Post', 'This is the content of the first post.', 'my-first-post', 1),
('Learning SQL', 'SQL is very useful for database management.', 'learning-sql', 2),
('Node.js Basics', 'Node.js allows JavaScript to run on the server.', 'nodejs-basics', 1),
('RESTful API Guide', 'How to build RESTful APIs with Express.', 'restful-api-guide', 3),
('PostgreSQL Tips', 'Some tips for working with PostgreSQL.', 'postgresql-tips', 2),
('Frontend vs Backend', 'Differences between frontend and backend development.', 'frontend-vs-backend', 1),
('Async/Await in JS', 'Using async/await makes asynchronous code easier.', 'async-await-js', 2),
('JavaScript Tricks', 'Some useful JavaScript tricks and tips.', 'javascript-tricks', 3),
('CSS Flexbox', 'Guide to CSS Flexbox layout.', 'css-flexbox', 1),
('Learning React', 'Basics of React and component-based development.', 'learning-react', 2);


SELECT * FROM posts;

---------------------------------------------------------

CREATE Table if not EXISTS comments(
    id SERIAL PRIMARY KEY,
    content VARCHAR(250) NOT NULL,
    post_id INT REFERENCES posts(id) NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    creat_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO comments (content, post_id, user_id)
VALUES
('Bu juda foydali post!', 1, 2),
('Rahmat, qiziqarli edi', 1, 3),
('Yana shu mavzuda yozsangiz yaxshi bo''lardi', 2, 1);

SELECT * from comments;

SELECT u.id, first_name, last_name, p.title, p.content  FROM users AS u INNER JOIN posts as p ON u.id=p.user_id;


