const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'likeme',
    allowExitOnIdle: true
});

const agregarPost = async (titulo, img, descripcion, likes) => {
    try {
        const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
        const values = [titulo, img, descripcion, likes];
        await pool.query(consulta, values);
        console.log("Post agregado con éxito");    } 
    catch (error) {
        console.error("Error al agregar el post:", error.message);
        throw new Error("No se pudo agregar el post.");}
};

const obtenerPost = async () => {
    try {
        const { rows } = await pool.query("SELECT * FROM posts ORDER BY id DESC");
        return rows;} 
    catch (error) {
        console.error("Error al obtener los posts:", error.message);
        throw new Error("No se pudieron obtener los posts.");}
};

module.exports = { agregarPost, obtenerPost };
