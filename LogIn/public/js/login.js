let form = document.getElementById("loginForm")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let mail = document.getElementById("email").value
    let password = document.getElementById("password").value
    login(mail, password)
})

const login = async (mail, password) => {
    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ mail, password })
    })
    
    const data = await response.json()
    console.log(data.status)
    
    if (data.status === "OK") {
        setTimeout(() => {
            window.location.href = "http://localhost:8080/home"
        }, 1000)
    } else {
        alert("Usuario no válido")
    }
}