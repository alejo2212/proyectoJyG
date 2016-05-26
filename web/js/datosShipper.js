$(document).ready(function () {
    if ($('#shipper_id').val() != '') {
//        alert('esta con un id');
        $.ajax({
            url: 'http://localhost/proyectoJyG/web/index.php/warehouse/ajaxTraerShipper',
            data: 'idShipper=' + $('#shipper_id').val(),
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                console.log(data);
                $(data.datos).each(function (index, element) {
                    $('#nombreR').val(element.primer_nombre + ' ' + element.segundo_nombre + ' ' + element.primer_apellido + ' ' + element.segundo_apellido);
                    $('#direccionR').val(element.direccion);
                    $('#ciudadR').val(element.ciudad);
                    $('#estadoR').val(element.depto);
                    $('#zipR').val(element.zip);
                    $('#paisR').val(element.pais);
                    $('#telR').val(element.telefono);
                    $('#emailR').val(element.correo);
                    $('#shipper_id').val(element.id);
                });
            }
        });
    }
    $('#btnBuscarShipper').click(function () {
//        alert('datos shipper');
        $.ajax({
            url: $('#urlBuscarShipper').val(),
            data: 'nomShipper=' + $('input[data-id="nomBuscarShipper"]').val(),
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
                $('#modalBuscar table[id="tblDatos"] tbody').html('');
                $(data.datos).each(function (index, element) {
                    $('#tblDatos tbody').append('<tr><input type="hidden" value="' + element.id + '" id="idShipper"><td>' + element.id + '</td><td>' + element.zip + '</td><td>' + element.primer_nombre + ' ' + element.segundo_nombre + ' ' + element.primer_apellido + ' ' + element.segundo_apellido + '</td></tr>');
                });
                var table = $('#tblDatos').DataTable();
                $('#tblDatos tbody').on('click', 'tr', function () {
                    var data = table.row(this).data();
                    var idShip = data[0];
                    
                    $.ajax({
                        url: 'http://localhost/proyectoJyG/web/index.php/warehouse/ajaxTraerShipper',
                        data: 'idShipper=' + idShip,
                        dataType: 'json',
                        type: 'POST',
                        success: function (data) {
                            console.log(data);
                            $(data.datos).each(function (index, element) {
                                $('#nombreR').val(element.primer_nombre + ' ' + element.segundo_nombre + ' ' + element.primer_apellido + ' ' + element.segundo_apellido);
                                $('#direccionR').val(element.direccion);
                                $('#ciudadR').val(element.ciudad);
                                $('#estadoR').val(element.depto);
                                $('#zipR').val(element.zip);
                                $('#paisR').val(element.pais);
                                $('#telR').val(element.telefono);
                                $('#emailR').val(element.correo);
                                $('#shipper_id').val(element.id);
                            });
                        }
                    });
                    $('#modalBuscar').modal('hide');
//                    alert('Has Hecho Clik en ' + data[0] + '\'s registro');
                });
                $('#modalBuscar').modal();
            }
        });
    });
});
    