import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import * as dotenv from "dotenv";
import cors from "cors";
import { save, deleteProduct} from "./dao/dbManager/products.manager.js";
import { addMessages } from "./dao/dbManager/chats.manager.js";
// Routes
import viewRouter from "./routes/viewsRouter.js";
import productsRouter from "./routes/products.router.js";
import realTimeProductsRouter from "./routes/realTimeProducts.router.js";
import cartRouter from "./routes/cart.router.js";
import messageRouter from "./routes/message.router.js"

dotenv.config();
const app = express();

const port = process.env.PORT || 8080;
const publicRoot = "./public";
const MONGO_URI = process.env.MONGO_URL;

const connection = mongoose.connect(MONGO_URI);
connection.then(() => {
  console.log("Conexion a la base de datos exitosa");
}),
  (error) => {
    console.log("Error en la conexion a la base de datos", error);
  };

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicRoot));
app.use(cors());

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Routes
app.use("/", viewRouter);
app.use("/api/products", productsRouter);
app.use("/realTime", realTimeProductsRouter);
app.use("/api/carts", cartRouter);
app.use("/chat", messageRouter);

// Iniciar el Server
const httpServer = app.listen(port, () => {
  console.log(
    `Servidor en ejecucion en : http://localhost:${httpServer.address().port}`
  );
});
httpServer.on("error", (error) => console.log(`Error: ${error}`));

// Configuración del lado del servidor
const io = new Server(httpServer);

// Configurar el evento de conexión de Socket.IO
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  socket.on("message", (data) => {
    console.log(data);

    // Enviar una respuesta al cliente
    socket.emit("respuesta", "Mensaje recibido correctamente");
  });
  socket.on("addProduct", (product) => {
    save(product);
    console.log('Producto creado: ', product )
  });
  socket.on("deleteProduct", (productId) => {
    const { id } = productId;
    deleteProduct(id);
    console.log('Producto Eliminado: ', id )
  });
  socket.on("user-message", (obj) => {
    addMessages(obj);
    io.emit("new-message", obj);
  });
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});
