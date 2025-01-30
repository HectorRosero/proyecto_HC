import express from 'express';
import { ObtenerHistoriaPaciente, adicionarhistoriapaciente} from '../controllers/pacientecontroller.js';
const router = express.Router();

router.get('/:id', ObtenerHistoriaPaciente);
router.post('/', adicionarhistoriapaciente);



export default router;