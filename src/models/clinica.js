import  mongoose  from 'mongoose';

const clinicaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true }
});

export default mongoose.model('clinica', clinicaSchema);

