$(document).ready(function () {
    //validaciones de campos con bootstrapValidator
    $('#formShipper').bootstrapValidator({
        fields: {
            agencia_id: {
                validators: {
                    notEmpty: {
                        message: 'La Agencia es obligatoria'
                    }
                }
            },
            shipper_primer_nombre: {
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio'
                    }
                }
            },
            shipper_primer_apellido: {
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio'
                    }
                }
            },
            shipper_direccion: {
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio'
                    }
                }
            },
            shipper_telefono: {
                validators: {
                    notEmpty: {
                        message: 'El telefono es obligatorio'
                    },
                    digits: {
                        message: 'El telefono solo admite caracteres numericos'
                    }
                }
            },
            shipper_correo: {
                validators: {
                    emailAddress: {
                        message: 'Direccion de correo o email no valida'
                    }
                }
            },
            shipper_zip: {
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

