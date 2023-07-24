import { engine } from "express-handlebars";
import express from "express";
import { __dirName,__fileName } from "./utils.js";
import viewsRoutes from "./routes/views.router.js";
import viewsRealTime from "./routes/realTimeProduct.router.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { DeleteProduct, SaveProduct } from "./services/productUtils.js";


const app = express();
const httpServer = createServer(app);

const PORT = 8081;


// app.get("/", (req, res) => {
//     res.send("hola mundo");
//   });

// Configurar el motor de plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirName}/views`);

// Configurar el directorio estático para archivos públicos
app.use(express.static("public"));

// Configurar el middleware para manejar las solicitudes JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar las rutas para las vistas
app.use("/", viewsRoutes);
app.use("/realtime", viewsRealTime);

// Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

// Configuración del lado del servidor
const io = new Server(httpServer);

// Configurar el evento de conexión de Socket.IO
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido:", data);

    socket.emit("respuesta", "Mensaje recibido correctamente");
  });

  socket.on("agregarProducto", (newProduct) => {
    console.log("Nuevo producto recibido backend:", newProduct);
    SaveProduct(newProduct);
    io.emit("nuevoProductoAgregado", newProduct);
  });

  socket.on("DeleteProduct", productId=>{
    const {id} = productId
    DeleteProduct(id)
    socket.emit("producto eliminado", id)
  })


  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});