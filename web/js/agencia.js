$(document).ready(function () {
//        $('#agencia_logo').load(function () {
//        alert('entro logo');
//        console.log('imagen cargada correctamente');
//    });
    $('#btn_remove').click(function () {
        remover();
    });
    $('#collapsedLocalidad').click(function () {
        var classe = $(this).children('spam').attr('class');
        if (classe === 'fa fa-chevron-right') {
            $(this).children('spam').removeClass();
            $(this).children('spam').addClass('fa fa-chevron-down');
        } else {
            $(this).children('spam').removeClass();
            $(this).children('spam').addClass('fa fa-chevron-right');
        }
    });
    $('#guardar').click(function () {
//        alert($('#agencia_logo').val());
        if ($('#agencia_logo').val() === '') {
            $('#agencia_logo').parent().addClass('has-error');
            $('#Mlogo').css('display', 'block');
        } else {
            $('#agencia_logo').parent().removeClass('has-error');
            $('#Mlogo').css('display', 'none');
        }
        if ($('#detalleAgencia >tbody >tr').length === 0) {
//            $('#sinDatos').css('display', 'block');
            $('#noEnviar').css('background', 'rgba(248,80,50,0.20)');
            $('#noEnviar').css('display', 'block');
//            alert("No hay filas en la tabla!!");
        } else {
            $('button').attr('type', 'submit');
        }
    });
    $('#btn_add').click(function () {
        validar();
    });
});
function validar() {

    if ($('#servicios').val() === '') {
        $('#servicio').addClass('has-error');
        $('#Mservi').css('display', 'block');
    } else {
        if ($('#tarifaP').val() === '') {
            $('#classTarifaP').addClass('has-error');
            $('#MtarifaP').css('display', 'block');
        } else {
            if (isNaN($('#tarifaP').val())) {
                $('#classTarifaP').addClass('has-error');
                $('#MtarifaP').text('Solo ingrese carcteres numericos');
                $('#MtarifaP').css('display', 'block');
            } else {
                if ($('#tarifaA').val() === '') {
                    $('#classTarifaA').addClass('has-error');
                    $('#MtarifaA').css('display', 'block');
                } else {
                    if (isNaN($('#tarifaA').val())) {
                        $('#classTarifaA').addClass('has-error');
                        $('#MtarifaA').text('Solo ingrese carcteres numericos');
                        $('#MtarifaA').css('display', 'block');
                    } else {
                        if ($('#seguro').val() === '') {
                            $('#classSeguro').addClass('has-error');
                            $('#Mseguro').css('display', 'block');
                        } else {
                            agregar();
                        }
                    }
                }
            }
        }
    }
}
var cont = 0;
function agregar() {
    $('#noEnviar').css('display', 'none')
    var servi = $('#servicios option:selected').text();
    var serviId = $('#servicios').val();
    var tariP = $('#tarifaP').val();
    var tariA = $('#tarifaA').val();
    var segu = $('#seguro').val();
    cont++;
    $('#detalleAgencia').append('<tr id="fila' + cont + '"><td><input type="hidden" id="servi" name="servi[]" value="' + serviId + '" class="form-control" readonly><input type="text" id="serviN" name="serviN[]" value="' + servi + '" class="form-control" readonly></td><td><input type="text" id="tariP" name="tariP[]" value="' + tariP + '" class="form-control" readonly></td><td><input type="text" id="tariA" name="tariA[]" value="' + tariA + '" class="form-control" readonly></td><td><input type="text" id="segu" name="segu[]" value="' + segu + '" class="form-control" readonly></td><td><button class="btn btn-danger btn-xs" type="button" id="btn_remove" onclick="remover(' + cont + ')"><i class="fa fa-times"></i></button></td></tr>');
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

function remover(id) {
    $('#fila' + id).remove();
    cont--;
}
function removerDetalle(id, url) {
//        $('#fila' + id).remove();
//        ids[contArray] = id;
//        contArray++;
//        $('#idsDetalle').val(ids);
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
//        alert('ids= ' + ids);

}

function traerDeptos(url, select) {
//        alert('&Depto=' + $(select).find('option:selected').data('iddepto'));
    if ($(select).val() == 0) {
        $('.ajaxLoadDepto').children().remove().end().append('<option selected value="0">Seleccione un Pais</option>');
        $('.ajaxLoadDepto').addClass('disabled').attr('disabled', 'true');
    } else {
        $.ajax({
            url: url,
            data: 'id=' + $(select).find('option:selected').data('idpais'),
            dataType: 'json',
            type: 'POST',
            success: function (data) {
//                    data = {
//                        datos: [
//                            {id: 1, insumo: 'Julian'},
//                            {id: 2, insumo: 'Jhonny'}
//                        ]
//                    };
                $('.ajaxLoadDepto').children().remove().end().append('<option selected value="0">Seleccione</option>');
                $(data.datos).each(function (index, value) {
                    $('.ajaxLoadDepto').append('<option data-iddepto="' + value.id + '" value="' + value.id + '">' + value.descripcion + '</option>');
                });
                $('.ajaxLoadDepto').removeClass('disabled').removeAttr('disabled');
            }
        });
    }
}

function traerCiudades(url, select) {
//        alert('&Depto=' + $(select).find('option:selected').data('iddepto'));
    if ($(select).val() == 0) {
        $('.ajaxLoadCiu').children().remove().end().append('<option selected value="">Seleccione un Departamento</option>');
        $('.ajaxLoadCiu').addClass('disabled').attr('disabled', 'true');
    } else {
        $.ajax({
            url: url,
            data: 'id=' + $(select).find('option:selected').data('iddepto'),
            dataType: 'json',
            type: 'POST',
            success: function (data) {
//                    data = {
//                        datos: [
//                            {id: 1, insumo: 'Julian'},
//                            {id: 2, insumo: 'Jhonny'}
//                        ]
//                    };
                $('.ajaxLoadCiu').children().remove().end().append('<option selected value="">Seleccione</option>');
                $(data.datosC).each(function (index, value) {
                    $('.ajaxLoadCiu').append('<option value="' + value.id + '">' + value.nombre + '</option>');
                });
                $('.ajaxLoadCiu').removeClass('disabled').removeAttr('disabled');
                $('.ajaxLoadCiu').removeAttr('readonly');
            }
        });
    }
}