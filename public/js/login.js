const url = 'http://localhost:3000/api/auth/login'; 

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token); // Almacena el token
            localStorage.setItem('user', JSON.stringify(data.username)); // Guardar los datos del usuario (nombre, email, rol)
            
            // Decodificar el token JWT para obtener el rol del usuario
            const decodedToken = JSON.parse(atob(data.token.split('.')[1])); // Decodifica el token JWT
            const userRole = decodedToken.role; // Obtiene el rol del usuario

        alert('Inicio de sesión exitoso');
        // Redirigir a dashboard
        window.location.href = './dashboard.html';
    } else {
        alert(data);
    }
});
