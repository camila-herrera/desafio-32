const { agregarPost, obtenerPost } = require('./funciones');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.listen(3000, () => console.log("SERVIDOR ENCENDIDO"));

app.get("/posts", async (req, res) => {
    try {const posts = await obtenerPost();
        res.json(posts);} 
    catch (error) {
        res.status(500).send("Error al obtener los posts: " + error.message);}}
);

app.post("/posts", async (req, res) => {
    try {const { titulo, img, descripcion, likes } = req.body;
        if (!titulo || !img || !descripcion || likes === undefined) {
            return res.status(400).send("Faltan datos obligatorios.");}
            await agregarPost(titulo, img, descripcion, likes);
            res.status(201).send("Post agregado con éxito.");} 
    catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar el post.");}}
);