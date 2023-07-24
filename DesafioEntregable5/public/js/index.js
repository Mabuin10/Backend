const socket = io();

socket.emit("connection", "nuevo cliente conectado");

document.getElementById("productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const productId = document.getElementById("productId").value;
  const productName = document.getElementById("productName").value;
  const productTitle = document.getElementById("productTitle").value;
  const productDescription =
    document.getElementById("productDescription").value;
  const productPrice = document.getElementById("productPrice").value;
  const productThumbnail = document.getElementById("productThumbnail").value;

  console.log(
    "Nuevo producto agregado:",
    productId,
    productName,
    productTitle,
    productDescription,
    productPrice,
    productThumbnail
  );
  // Enviar el producto al servidor a través del socket
  socket.emit("agregarProducto", {
    id: productId,
    name: productName,
    title: productTitle,
    description: productDescription,
    price: productPrice,
    thumbnail: productThumbnail,
  });

  // Limpiar el campo del formulario
  document.getElementById("productName").value = "";
  location.reload();
});

// Obtener la lista de productos inicial desde el servidor
socket.on("initialProductList", (productList) => {
  updateProductList(productList);
});

// Agregar un nuevo producto a la lista
socket.on("nuevoProductoAgregado", (newProduct) => {
  const productList = document.getElementById("productList");
  const li = document.createElement("li");
  li.textContent = newProduct.name;

  productList.appendChild(li);
});

// Actualizar la lista de productos
function updateProductList(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = product.name;
    productList.appendChild(li);
  });
}

function updateProductList(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${product.name}</h3>
      <p>Título: ${product.title}</p>
      <p>Descripción: ${product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Thumbnail: ${product.thumbnail}</p>
      <button class="btnEliminar" id="${product.id}">Eliminar</button>
    `;

    productList.appendChild(li);
  });
}

const deleteButton = document.querySelectorAll(".btnEliminar");
deleteButton.forEach((button) => {
  button.addEventListener("click", () => {
    const id = parseInt(button.id);
    const productId = {
      id: id,
    };
    socket.emit("DeleteProduct", productId);
    location.reload();
  });
});
