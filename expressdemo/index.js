const express = require('express');
const app = express();
app.use(express.json());

const books = [
    { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
    { title: "1984", author: "George Orwell" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling" }
];

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get("/api/books", function (req, res) {
    res.send(books);
});

app.get("/api/books/:index", function (req, res) {
    if (!books[req.params.index]) return res.status(400).send("Book not found");
    res.send(books[req.params.index]);
});

app.put("/api/books/:index", function (req, res) {
    if (!books[req.params.index]) return res.status(400).send("Book not found");
    books[req.params.index] = { title: req.body.title, author: req.body.author };
    res.send(books[req.params.index]);
});

app.delete("/api/books/:index", function (req, res) {
    if (!books[req.params.index]) return res.status(400).send("Book not found");
    books.splice(req.params.index, 1);
    res.send(books);
});

app.post("/api/books", function (req, res) {
    const newBook = { title: req.body.title, author: req.body.author };
    books.push(newBook);
    res.send(newBook);
});

app.listen(3000);
