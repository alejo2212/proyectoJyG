$(document).ready(function () {
    if ($('#consignee_id').val() != '') {
//        alert('esta con un id');
        $.ajax({
            url: 'http://localhost/proyectoJyG/web/index.php/warehouse/ajaxTraerConsignee',
            data: 'idConsignee=' + $('#consignee_id').val(),
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                console.log(data);
                $(data.datos).each(function (index, element) {
                    $('#nombreD').val(element.primer_nombre + ' ' + element.segundo_nombre + ' ' + element.primer_apellido + ' ' + element.segundo_apellido);
                    $('#direccionD').val(element.direccion);
                    $('#ciudadD').val(element.ciudad);
                    $('#estadoD').val(element.depto);
                    $('#zipD').val(element.zip);
                    $('#paisD').val(element.pais);
                    $('#telD').val(element.telefono);
                    $('#emailD').val(element.correo);
                    $('#poBoxD').val(element.po_box);
                    $('#consignee_id').val(element.id);
                });
            }
        });
    }
    $('#btnBuscarConsignee').click(function () {
//        alert('datos shipper');
        $.ajax({
            url: $('#urlBuscarConsignee').val(),
            data: 'nomConsignee=' + $('input[data-id="nomBuscarConsignee"]').val(),
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                console.log(data);
                /**
                 * data = {
                 *  code = 200,
                 *  datos = [
                 *      {nombre: hola, cantidad: 2}
                 *      {nombre: coto, cantidad: 3}
                 *  ]
                 * }
                 */
                $('#modalBuscarConsignee table[id="tblDatosConsignee"] tbody').html('');
                $(data.datos).each(function (index, element) {
                    $('#tblDatosConsignee tbody').append('<tr><input type="hidden" value="' + element.id + '" id="idConsignee"><td>' + element.id + '</td><td>' + element.zip + '</td><td>' + element.primer_nombre + ' ' + element.segundo_nombre + ' ' + element.primer_apellido + ' ' + element.segundo_apellido + '</td></tr>');
                });
                var table = $('#tblDatosConsignee').DataTable();
                $('#tblDatosConsignee tbody').on('click', 'tr', function () {
                    var data = table.row(this).data();
                    var idShip = data[0];
                    $.ajax({
                        url: 'http://localhost/proyectoJyG/web/index.php/warehouse/ajaxTraerConsignee',
                        data: 'idConsignee=' + idShip,
                        dataType: 'json',
                        type: 'POST',
                        success: function (data) {
                            console.log(data);
                            $(data.datos).each(function (index, element) {
                                $('#nombreD').val(element.primer_nombre + ' ' + element.segundo_nombre + ' ' + element.primer_apellido + ' ' + element.segundo_apellido);
                                $('#direccionD').val(element.direccion);
                                $('#ciudadD').val(element.ciudad);
                                $('#estadoD').val(element.depto);
                                $('#zipD').val(element.zip);
                                $('#paisD').val(element.pais);
                                $('#telD').val(element.telefono);
                                $('#emailD').val(element.correo);
                                $('#poBoxD').val(element.po_box);
                                $('#consignee_id').val(element.id);
                            });
                        }
                    });
                    $('#modalBuscarConsignee').modal('hide');
//                    alert('Has Hecho Clik en ' + data[0] + '\'s registro');
                });
                $('#modalBuscarConsignee').modal();
            }
        });
    });
});
    