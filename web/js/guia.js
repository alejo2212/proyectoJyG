$(document).ready(function () {
//funcion para cambiar la posicion del <spam> que le da la animacion a la flecha en el modulo de ver para el detalle cuando se despliega
    $('#collapsedWareDeta').click(function () {
        var classe = $(this).children('spam').attr('class');
        if (classe === 'fa fa-chevron-right') {
            $(this).children('spam').removeClass();
            $(this).children('spam').addClass('fa fa-chevron-down');
        } else {
            $(this).children('spam').removeClass();
            $(this).children('spam').addClass('fa fa-chevron-right');
        }
    });
//funcion para agregar un producto
    $('#btn_add').click(function () {
        validar();
    });
//funcion para remover un producto
    $('#btn_remove').click(function () {
        remover();
    });
//funcion para asignar las dimenciones por defecto (0x0x0)
    $('#btn_defaulDmim').click(function () {
        defaultDimension();
    });
//funcion para guardar una guia. Antes verifica que el detalle tenga almenos un producto, si no es asi manda un mensaje de error debajo
//de la tabla
    $('#guardar').click(function () {
        if ($('#whgTable >tbody >tr').length === 0) {
            $('#noEnviar').css('background', 'rgba(248,80,50,0.20)');
            $('#noEnviar').css('display', 'block');

        } else {
            $('#guardar').attr('type', 'submit');
        }
    });

});

$(document).load('guia.js', function () {
    valorDeclarado();
    total();

});

//********************************************** FUNCIONES DE GUIA  ************************************
//function valFilas() {
//    var numF = $('#whgTable tbody tr').length;
//    if (numF === '' || numF === 0) {
//        $('body').append('<div class="modal fade" id="modalContenido" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Advertencia</h4></div><div class="modal-body"><p>Porfavor ingrese almenos un registro completo de la carga</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>');
//        $('#modalContenido').modal({show: true});
//        $('#peso').focus();
//    }
//}
function validar() {
    if ($('#peso').val() === '') {
        $('#Valpeso').addClass('has-error');
        $('#Hpeso').css('display', 'block');

    } else {
        if ($('#largo').val() === '' || $('#ancho').val() === '' || $('#alto').val() === '') {
            $('#Valdim').addClass('has-error');
            $('#Hdim').css('display', 'block');
        } else {
            if ($('#contiene').val() === '') {
                $('#Valconti').addClass('has-error');
                $('#Hcontiene').css('display', 'block');
            } else {
                if ($('#tracking').val() === '') {
                    $('#Valtrac').addClass('has-error');
                    $('#Htracking').css('display', 'block');
                } else {
                    agregar();
                }
            }
        }
    }
}
function deleteError(padre) {
    //valida si tiene elemento abuelo si el padre es igual a -> input-group
    if (padre.attr('class') == 'input-group') {
        padre.parent().removeClass('has-error');
        padre.parent().children('small').css('display', 'none');
    } else {
        padre.removeClass('has-error');
        padre.children('small').css('display', 'none');
    }
}

var cont = 0;
function agregar() {
    //tomo los valores de cada campo
    var peso = $('#peso').val();
    var largo = $('#largo').val();
    var alto = $('#alto').val();
    var ancho = $('#ancho').val();
    var contiene = $('#contiene').val();
    var tracking = $('#tracking').val();
    var tipoEmpaque = $('#tipoEmpaque').val();
//    cuento si hay filas en la tabla y si hay se la asigno a la variable contador (cont) para que incremente desde alli sino hay filas 
//    empieza automaticamte desde uno (1)
    if ($('#whgTable >tbody >tr').length != 0) {
        cont = $('#whgTable >tbody >tr').length;
    }
    cont++;//->contador de campos

    if ($('#contiene' + $('#btn_add').val()).val() == '') {
        $('body').append('<div class="modal fade" id="modalContenido" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Advertencia</h4></div><div class="modal-body"><p>Porfavor ingrese una descripcion del contenido de la caja o producto</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>');
        $('#modalContenido').modal({show: true});
        $('#contiene' + $('#btn_add').val()).focus();
    } else {
        //calcula el volumen total .toFixed(5)
        var volumen = (parseInt(largo) * parseInt(alto) * parseInt(ancho) / 166);
//                var volumen = volumen.toFixed(5);
        var vol = parseFloat(volumen.toFixed(2)) + parseFloat($('#guia_hija_volumen').val());
        $('#guia_hija_volumen').val(vol.toFixed(2));
        //creo la fila de la tabla con los campos asignados y colocando la variable cont en cada id
        var fila = '<tr id="fila' + cont + '"><td><input type="hidden" id="volumen' + cont + '" name="volumen[]" class="form-control" value="' + volumen.toFixed(2) + '"><input type="text" id="dimensiones' + cont + '" name="dimensiones[]" class="form-control" value="' + peso + ' Vol= ' + largo + 'x' + ancho + 'x' + alto + '" readonly></td><td><input type="text" id="contiene' + cont + '" name="contiene[]" class="form-control" value="' + contiene + '" readonly></td><td><input type="text" id="tempaque' + cont + '" name="tempaque[]" class="form-control" value="' + tipoEmpaque + '" readonly></td><td><input type="text" id="tracking' + cont + '" name="tracking[]" class="form-control" value="' + tracking + '" readonly></td><td><button class="btn btn-danger btn-xs" type="button" id="btn_remove" onclick="remover(' + cont + ')"><i class="fa fa-times"></i></button></td></tr>';
        //coloca una nueva fila en la tabla
        $('#whgTable').append(fila);
        var piesas = $('#whgTable >tbody >tr').length;
        //asigna la guia_hija_piesasidad que va tomanto de cada campo de  la tabla
        $('#guia_hija_piesas').val(piesas);
        //suma los pesos a medida que se agregan
        $('#pesoDim').val(parseInt($('#pesoDim').val()) + parseInt(peso));
        //le agrego el contador al boton agregar para validar las posiciones de los datos en la regilla
        $('#btn_add').val(cont);
        flete(0);
    }
}

function flete(remover) {
    //*****************************          calcular el flete   **********************************************************
    var vol = $('#guia_hija_volumen').val();
    var flete = $('#guia_hija_flete').val();
    var valflete = 10;
//      alert('volumen='+vol);
    if (parseFloat(vol) >= 0 && parseFloat(vol) <= 1) {
        $('#guia_hija_flete').val(valflete);
    }
    if (remover == 1) {
            $('#guia_hija_flete').val(parseFloat(flete) - 5);
    } else {
        if (parseFloat(vol) > 1) {
            $('#guia_hija_flete').val(parseFloat(flete) + 5);
        }
    }

    $('#noEnviar').css('display', 'none');
    total();
}

function remover(id) {
    if ($('#whgTable >tbody >tr').length === 1) {
        $('#noEnviar').css('background', 'rgba(248,80,50,0.20)');
        $('#noEnviar').css('display', 'block');
    } else {
        var re = parseFloat($('#guia_hija_volumen').val()) - parseFloat($('#volumen' + id).val());

        $('#guia_hija_volumen').val(re.toFixed(2));
        $('#guia_hija_piesas').val($('#guia_hija_piesas').val() - 1);
        var string = $('#dimensiones' + id).val();
        var valor = parseFloat(string.substring(0, 4));
        $('#pesoDim').val($('#pesoDim').val() - valor);
        $('#fila' + id).remove();
        flete(1);
        total();
    }
}

function removerDetalle(id, url) {
    if ($('#whgTable >tbody >tr').length === 1) {
        $('#noEnviar').css('background', 'rgba(248,80,50,0.20)');
        $('#noEnviar').css('display', 'block');
    } else {
        $.ajax({
            type: "POST",
            url: url,
            data: 'id=' + id,
            success: function () {
                $('#delete-ok').empty();
                $('#delete-ok').append('<div>Se ha eliminado correctamente el registro ' + $('#serviN' + id).val() + '.</div>').fadeIn("slow");
                $('#fila' + id).remove();
            }
        });
        flete(1);
        total();
    }
}

function total() {
    //**************************   asignacion de valores para el calculo total   **************************
    $('#guia_hija_peso').val($('#pesoDim').val());
    $('#guia_hija_peso_cobrado').val($('#pesoDim').val());

    var valor = parseFloat($('#guia_hija_valor').val());
    var flete = parseFloat($('#guia_hija_flete').val());
    var valDeclarado = parseFloat($('#guia_hija_valor_declarado').val());
    var seguro = parseFloat($('#guia_hija_seguro').val());
    var paAduana = parseFloat($('#guia_hija_pa_aduana').val());
    var cargosAdd = parseFloat($('#guia_hija_cargos_adicionales').val());
    var otrosCargos = parseFloat($('#guia_hija_otros_cargos').val());
    var desto = parseFloat($('#guia_hija_descuento').val());
//        alert(valDeclarado);
    $('#guia_hija_total').val(valor + valDeclarado + flete + seguro + paAduana + cargosAdd + otrosCargos - desto);
//**************************   Fin asignacion de valores para el calculo total   flete+ valDeclarado+ seguro + paAduana + cargosAdd + otrosCargos + desto **************************
}

function valorDeclarado() {
    var valDeclarado = $('#guia_hija_valor_declarado_p').val();

    $('#guia_hija_valor_declarado').val(valDeclarado * 28 / 100);

    var desto = valDeclarado * 5 / 100;
    $('#guia_hija_seguro').val(desto);
}
