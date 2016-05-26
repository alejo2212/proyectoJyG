$(document).ready(function () {
    //validaciones de campos con bootstrapValidator
    $('#formWarehouseGuia').bootstrapValidator({
        message: 'El valor ingresado no es valido',
        fields: {
            nombreR: {
                validators: {
                    notEmpty: {
                        message: 'El nombre es obligatorio'
                    }
                }
            },
            direccionR: {
                validators: {
                    notEmpty: {
                        message: 'La direccion es obligatoria'
                    }
                }
            },
            ciudadR: {
                validators: {
                    notEmpty: {
                        message: 'La ciudad es obligatoria'
                    }
                }
            },
            estadoR: {
                validators: {
                    notEmpty: {
                        message: 'El estado es obligatorio'
                    }
                }
            },
            zipR: {
                validators: {
                    notEmpty: {
                        message: 'El zip es obligatorio'
                    }
                }
            },
            paisR: {
                validators: {
                    notEmpty: {
                        message: 'El pais es obligatorio'
                    }
                }
            },
            nombreD: {
                validators: {
                    notEmpty: {
                        message: 'El nombre es obligatorio'
                    }
                }
            },
            direccionD: {
                validators: {
                    notEmpty: {
                        message: 'La direccion es obligatoria'
                    }
                }
            },
            ciudadD: {
                validators: {
                    notEmpty: {
                        message: 'La ciudad es obligatoria'
                    }
                }
            },
            paisD: {
                validators: {
                    notEmpty: {
                        message: 'El pais es obligatorio'
                    }
                }
            },
            zipD: {
                validators: {
                    notEmpty: {
                        message: 'El C.P es obligatorio'
                    }
                }
            }
        }
    });
});

