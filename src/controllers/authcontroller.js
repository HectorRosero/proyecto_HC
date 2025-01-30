import jwt from 'jsonwebtoken'; // importa la libreria de token que permite generar tokens JWT
import dotenv from 'dotenv';
import  User  from '../models/user.js'; // importa el modelo de usuario

// Cargar variables de entorno
dotenv.config();

// Registro de usuario
export const registro = async (req, res) => {  // req es la solicitud y res es la respuesta
  try{
  const { username, password, role } = req.body;
  
  if (role !== 'doctor' && role !== 'paciente') {
    return res.status(400).json({ message: 'Rol inválido' });
  }
  
  const user = new User({ username, password, role }); // crea un nuevo usuario con los datos recibidos
  await user.save(); // guarda el usuario en la base de datos

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });// genera un token JWT con el id del usuario y lo expira en 1 hora
    res.status(201).json({ message: 'Usuario registrado exitosamente', token }); // devuelve un mensaje de exito y el token
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};
  

export const login = async (req, res) => { // req es la solicitud y res es la respuesta
  try {
    const { username, password } = req.body; // extrae los datos del cuerpo de la solicitud
    const user = await User.findOne({ username }); 
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' }); // si no encuentra un usuario devuelve un mensaje de error

    const isMatch = await user.comparePassword(password); // compara la contraseña recibida con la contraseña del usuario
    if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' }); // si la contraseña no coincide devuelve un mensaje de error

    const token = jwt.sign({ userId: user._id, 
                              role: user.role, 
                              username: user.username, 
                            }, process.env.JWT_SECRET, { expiresIn: '1h' });
// Retornar el token y el rol del usuario
    res.json({ message: 'Inicio de sesión exitoso', token }); // devuelve un mensaje de exito y el token
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};




