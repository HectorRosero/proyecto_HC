// Cargar clínicas
const url = 'http://localhost:3000/api/admin/users';

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token'); // Obtener el token almacenado en el localStorage
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificamos el token para obtener los datos
    const userRole = decodedToken.role;
    const usuario = decodedToken.usuario; // Extraemos el nombre de usuario
    const id = decodedToken.id; // Extraemos el id del usuario

    const accountIcon = document.getElementById('account-icon');
    const userInfoDiv = document.getElementById('user-info');
    accountIcon.textContent = `${usuario.charAt(0).toUpperCase()}`; // Muestra el nombre de usuario en el icono
  
  
    
  
    accountIcon.addEventListener('click', () => {
      // Al hacer clic en el icono, mostramos los detalles del usuario
      userInfoDiv.innerHTML = `
        <p><strong>Usuario:</strong> ${usuario}</p>
        <p><strong>Rol:</strong> ${userRole}</p>
      `;
      userInfoDiv.style.display = 'block'; // Muestra los detalles
    });

    document.getElementById('welcomeMessage').textContent = `¡Bienvenido ${usuario}!`;
   

async function loadClinics() {
    const response = await fetch('/api/clinics'); // Asegúrate de tener esta ruta en tu API
    const clinics = await response.json();
    const clinicSelect = document.getElementById('clinicSelect');

    clinics.forEach(clinic => {
        const option = document.createElement('option');
        option.value = clinic._id;
        option.textContent = clinic.name;
        clinicSelect.appendChild(option);
    });
}

// Al cargar el dashboard
window.onload = () => {
    loadClinics();
};

// Lógica para crear historia clínica
document.getElementById('createRecordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const patientId = document.getElementById('patientId').value;
    const medicalHistory = document.getElementById('medicalHistory').value;
    const clinicId = document.getElementById('clinicSelect').value;

    const response = await fetch('/api/patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, medicalHistory, clinicId })
    });

    if (response.ok) {
        alert('Historia clínica creada');
    } else {
        alert('Error al crear historia clínica');
    }
});

document.getElementById('logoutBtn').addEventListener('click', async(e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
  });
});