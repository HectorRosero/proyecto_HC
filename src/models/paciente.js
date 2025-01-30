import mongoose from 'mongoose';

const pacienteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    medicalHistory: [{
        history: { type: String, required: true },
        clinic: { type: mongoose.Schema.Types.ObjectId, ref: 'clinica' }, // Referencia a la clínica
        createdAt: { type: Date, default: Date.now }
    }]
});


export default mongoose.model('paciente', pacienteSchema);