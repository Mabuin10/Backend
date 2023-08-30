// import Swal from "sweetalert2";

const createUser = () => {
    const signupForm = document.getElementById("signupForm")
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        const name = document.getElementById("name").value
        const last_name = document.getElementById("last_name").value
        const mail = document.getElementById("email").value
        const password = document.getElementById("password").value

        const newUser = {
            name,
            last_name,
            mail,
            password
        }
console.log(newUser)
        await postUser(newUser).then(console.log({
            title: 'Usuario creado con éxito!',
            icon: 'success',
            confirmButtonText: 'Cool'
          }).then(() => {
            window.location.href = "/login"
          })).catch(console.log({
            title: 'El email ya se encuentra registrado',
            icon: 'Error',
            confirmButtonText: 'Cool'
          }))
    })
}

const postUser = async (newUser)=> {
    try{
        const response = await fetch("/session/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        console.log(response)
        const result = response.json()
        return result
    }
    catch (err) {
        console.log("Algo ha ocurrido al tratar de crear el usuario en el front", err)
    }
}

createUser()