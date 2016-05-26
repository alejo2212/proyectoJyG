$(document).ready(function () {
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
    $('#btn_add').click(function () {
        validar();
//            agregar();
    });
    $('#btn_remove').click(function () {
        remover();
    });
    $('#btn_defaulDmim').click(function () {
        defaultDimension();
    });
    $('#guardar').click(function () {
        if ($('#whgTable >tbody >tr').length === 0) {
            $('#noEnviar').css('background', 'rgba(248,80,50,0.20)');
            $('#noEnviar').css('display', 'block');

        } else {
            $('#guardar').attr('type', 'submit');
        }
    });
});
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

    cont++;//->contador de campos
    if ($('#contiene' + $('#btn_add').val()).val() == '') {
        $('body').append('<div class="modal fade" id="modalContenido" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Advertencia</h4></div><div class="modal-body"><p>Porfavor ingrese una descripcion del contenido de la caja o producto</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div></div>');
        $('#modalContenido').modal({show: true});
        $('#contiene' + $('#btn_add').val()).focus();
    } else {
        //calcula el volumen total .toFixed(5)
        var volumen = (parseInt(largo) * parseInt(alto) * parseInt(ancho) / 166);
//                var volumen = volumen.toFixed(5);
        var vol = parseFloat(volumen.toFixed(2)) + parseFloat($('#volumen').val());
        $('#volumen').val(vol.toFixed(2));
        //creo la fila de la tabla con los campos asignados y colocando la variable cont en cada id
        var fila = '<tr id="fila' + cont + '"><td><input type="hidden" id="volumen' + cont + '" name="volumen[]" class="form-control" value="' + volumen.toFixed(2) + '"><input type="text" id="dimensiones' + cont + '" name="dimensiones[]" class="form-control" value="' + peso + ' Vol= ' + largo + 'x' + ancho + 'x' + alto + '" readonly></td><td><input type="text" id="contiene' + cont + '" name="contiene[]" class="form-control" value="' + contiene + '" readonly></td><td><input type="text" id="tempaque' + cont + '" name="tempaque[]" class="form-control" value="' + tipoEmpaque + '" readonly></td><td><input type="text" id="tracking' + cont + '" name="tracking[]" class="form-control" value="' + tracking + '" readonly></td><td><button class="btn btn-danger btn-xs" type="button" id="btn_remove" onclick="remover(' + cont + ')"><i class="fa fa-times"></i></button></td></tr>';
        //coloca una nueva fila en la tabla
        $('#whgTable').append(fila);
        var cant = $('#whgTable >tbody >tr').length;
        //asigna la cantidad que va tomanto de cada campo de  la tabla
        $('#cant').val(cant);
        //suma los pesos a medida que se agregan
        $('#pesoDim').val(parseInt($('#pesoDim').val()) + parseInt(peso));

        //le agrego el contador al boton agregar para validar las posiciones de los datos en la regilla
        $('#btn_add').val(cont);
        $('#noEnviar').css('display', 'none');
    }
}
//funcion para remover un producto

function remover(id) {
    if ($('#whgTable >tbody >tr').length === 1) {
        $('#noEnviar').css('background', 'rgba(248,80,50,0.20)');
        $('#noEnviar').css('display', 'block');
    } else {
        var re = parseFloat($('#volumen').val()) - parseFloat($('#volumen' + id).val());
        $('#volumen').val(re.toFixed(2));
        $('#cant').val($('#cant').val() - 1);
        var string = $('#dimensiones' + id).val();

        var valor = parseFloat(string.substring(0, 4));
        $('#pesoDim').val($('#pesoDim').val() - valor);
        $('#fila' + id).remove();
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
    }
}
//funcion para asignar las dimenciones por defecto (0x0x0)

//        function defaultDimension() {
//            $('#largo').val(0);
//            $('#ancho').val(0);
//            $('#alto').val(0);
//        };

