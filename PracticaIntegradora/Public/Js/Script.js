const postMyData = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/pets/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const datos = await response.json();
      return datos;
    } catch (err) {
      console.log(err);
    }
  };
  
  document.getElementById("createPet").addEventListener("submit", (event) => {
    const name = document.getElementById("name").value;
    const specie = document.getElementById("specie").value;
    const adopted = document.getElementById("adopted").value ? true : false;
    const birthDate = document.getElementById("birthDate").value;
    const image = document.getElementById("birthDate").value;
    const data = { name, specie, adopted, birthDate, image };
    postMyData(data)
      .then(alert("creado exitosamente"))
      .catch((err) => console.log("error"));
  });