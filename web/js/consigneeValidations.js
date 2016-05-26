$(document).ready(function () {
    //validaciones de campos con bootstrapValidator
    $('#formConsignee').bootstrapValidator({
        fields: {
            agencia_id: {
                validators: {
                    notEmpty: {
                        message: 'La Agencia es obligatoria'
                    }
                }
            },
            consignee_primer_nombre: {
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio'
                    }
                }
            },
            consignee_primer_apellido: {
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio'
                    }
                }
            },
            consignee_direccion: {
                validators: {
                    notEmpty: {
                        message: 'Este campo es obligatorio'
                    }
                }
            },
            consignee_telefono: {
                validators: {
                    notEmpty: {
                        message: 'El telefono es obligatorio'
                    },
                    digits: {
                        message: 'El telefono solo admite caracteres numericos'
                    }
                }
            },
            consignee_correo: {
                validators: {
                    emailAddress: {
                        message: 'Direccion de correo o email no valida'
                    }
                }
            },
            consignee_zip: {
                validators: {
                    notEmpty: {
                        message: 'El zip es obligatorio'
                    },
                    usZipCode: {
                        message: 'Codigo Zip no valido'
                    }
                }
            },
            shipper_id: {
                validators: {
                    notEmpty: {
                        message: 'El Shipper o Remitente es obligatorio'
                    }
                }
            }
            ,
            tipo_identificacion_id: {
                validators: {
                    notEmpty: {
                        message: 'El Tipo de Identificacion es obligatorio'
                    }
                }
            },
            consignee_documento: {
                validators: {
                    notEmpty: {
                        message: 'El numero de documento es obligatorio'
                    }
                }
            }
        }
    });
});

