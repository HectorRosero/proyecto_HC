//const url='http://localhost:3000/api/auth/registro';
const url='https://proyecto-hc.vercel.app/api/auth/registro';
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('role').value;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
    });

    if (response.ok) {
        alert('Registro exitoso');
        window.location.href = 'login.html'; // Redirigir a inicio de sesión
    } else {
        alert('Error en el registro');
    }
});
