const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UsuariosSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROL']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    },
});

// Antes de guardar el usuario en la base de datos, encriptamos la contraseña
UsuariosSchema.pre('save', async function(next) {
    // Solo encriptar la contraseña si ha sido modificada
    if (!this.isModified('password')) {
        return next();
    }

    // Generar una sal (salt)
    const salt = await bcrypt.genSalt(10);

    // Hashear la contraseña con la sal
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

module.exports = model('usuario', UsuariosSchema);
