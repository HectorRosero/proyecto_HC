import  clinica  from '../models/clinica.js';
import paciente from '../models/paciente.js';

// Obtener historia clínica de un paciente
export const ObtenerHistoriaPaciente = async (req, res) => {
    const paciente = await paciente.findById(req.params.id).populate('medicalHistory.clinica');
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    res.json(paciente);
};

// Agregar historia clínica
export const adicionarhistoriapaciente = async (req, res) => {
    const { pacienteId, medicalHistory, clinicaId } = req.body;

    const paciente = await paciente.findById(pacienteId);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    const historyEntry = {
        history: medicalHistory,
        clinica: clinicaId
    };

    paciente.medicalHistory.push(historyEntry);
    await paciente.save();
    res.status(201).send('Historia clínica agregada');
};
