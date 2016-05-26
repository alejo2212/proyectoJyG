$(document).ready(function () {
    //validaciones de campos con bootstrapValidator
    $('#formAgencia').bootstrapValidator({
        message: 'El valor ingresado no es valido',
        fields: {
            agencia_descripcion: {
                validators: {
                    notEmpty: {
                        message: 'El nombre es obligatorio'
                    }
                }
            },
            agencia_responsable: {
                validators: {
                    notEmpty: {
                        message: 'El responsable es obligatorio'
                    }
                }
            },
            agencia_direccion: {
                validators: {
                    notEmpty: {
                        message: 'La direccion es obligatorio'
                    }
                }
            },
            agencia_telefono: {
                validators: {
                    notEmpty: {
                        message: 'El telefono es obligatorio'
                    },
                    digits: {
                        message: 'El telefono solo admite caracteres numericos'
                    }
                }
            },
            agencia_zip: {
                validators: {
                    notEmpty: {
                        message: 'El zip es obligatorio'
                    },
                    usZipCode: {
                        message: 'Codigo Zip no valido'
                    }
                }
            }
        }
    });
});

