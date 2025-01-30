import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['doctor', 'paciente'], required: true }
});

UserSchema.pre('save', async function(next) { // Usa el método pre para ejecutar una función antes de guardar el usuario y el async para esperar a que termine la función
  if (!this.isModified('password')) return next(); // Si la contraseña no ha sido modificada, no hace nada
  this.password = await bcrypt.hash(this.password, 10); // Cifra la contraseña con bcrypt
});


// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function(candidatePassword) { // Define un método para comparar la contraseña ingresada con la contraseña cifrada
  return bcrypt.compare(candidatePassword, this.password); // Compara la contraseña ingresada con la contraseña cifrada
};

export default mongoose.model('User', UserSchema);
