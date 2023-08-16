import express from "express";
import {engine} from "express-handlebars"
import {Server} from "socket.io"
import __dirname from "./utils.js";
import cartRouter from "./routes/cart.router.js"
import messageRouter from "./routes/messege.router.js"
import viewsRouter from "./routes/views.router.js"
import ViewsRealTime from "./routes/realTimeProduct.router.js"
// import { saveProduct } from "./services/productUtils.js";
import {getAll, save, getById} from "./dao/dbManagers/products.js"
import productsRouter from "./routes/products.router.js"
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URL;
const connection = mongoose.connect(MONGO_URI);


// Configurar el motor de plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Configurar el directorio estático para archivos públicos
app.use(express.static("public"));

// Configurar el middleware para manejar las solicitudes JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Configurar las rutas para las vistas
app.use("/", viewsRouter);
app.use("/realtime", ViewsRealTime);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/chat", messageRouter);

// Iniciar el servidor HTTP
// httpServer.listen(PORT, () => {
//   console.log(`Servidor en ejecución en http://localhost:${PORT}`);
// });


const httpServer = app.listen(PORT, () => console.log(`Servidor en ejecución en http://localhost:${PORT}`));
// Configuración del lado del servidor
const io = new Server(httpServer);

// Configurar el evento de conexión de Socket.IO
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Manejar eventos personalizados
  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido:", data);

    // Enviar una respuesta al cliente
    socket.emit("respuesta", "Mensaje recibido correctamente");
  });

  // Escuchar evento 'agregarProducto' y emitir 'nuevoProductoAgregado'
  socket.on("agregarProducto", (newProduct) => {
    console.log("Nuevo producto recibido backend:", newProduct);
    save(newProduct);
    // Agregar el nuevo producto a la lista de productos
    io.emit("nuevoProductoAgregado", newProduct);
  });

  /*socket.on("productoEliminado", (productID) => {
    // Eliminar el producto de la lista en el cliente
    const productoElement = document.querySelector(`[data-id="${productID}"]`);
    if (productoElement) {
      productoElement.parentElement.remove();
    }
  });
  */

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});