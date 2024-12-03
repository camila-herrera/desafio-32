import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data: posts } = await axios.get(urlBaseServer + "/posts");
    setPosts([...posts]);
  };

  const agregarPost = async () => {
    if (!titulo || !imgSrc || !descripcion) {
        alert("Todos los campos son obligatorios.");
        return;
    }
    const post = { titulo, img: imgSrc, descripcion, likes: 0 }; // linea modificada para poder conversar con el back img remplazo url y a likes se le asigno un valor por defecto ya que los codigos entregados para generar la tabla de datos no coiciden con esto.
    try {
        await axios.post(urlBaseServer + "/posts", post);
        getPosts();
    } catch (error) {
        console.error("Error al agregar el post:", error.response?.data || error.message);
        alert("Error: " + (error.response?.data || "Hubo un problema al agregar el post."));
    }
};


  // este método se utilizará en el siguiente desafío
  const like = async (id) => {
    await axios.put(urlBaseServer + `/posts/like/${id}`);
    getPosts();
  };

  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    await axios.delete(urlBaseServer + `/posts/${id}`);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;