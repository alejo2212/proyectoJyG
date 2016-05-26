$(document).ready(function () {
    $('#collapsedLocalidad').click(function () {
        var classe = $(this).children('spam').attr('class');
        if (classe === 'fa fa-chevron-right') {
            $('#collapsedLocalidad').children('spam').removeClass();
            $('#collapsedLocalidad').children('spam').addClass('fa fa-chevron-down');
        } else {
            $('#collapsedLocalidad').children('spam').removeClass();
            $('#collapsedLocalidad').children('spam').addClass('fa fa-chevron-right');
        }
    });
});
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
