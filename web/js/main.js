$(document).ready(function () {

    $(window).load(function () {
        var url = 'http://localhost' + window.location.pathname;
        $('#side-menu a').each(function () {
            var isFound = $(this).attr('href');
            if (isFound === url) {
                var padre = $(this).parent().addClass('active');
                var abuelo = padre.parent().addClass('in');
                abuelo.parent().addClass('active');
            }
        });
    });
    $(':file').filestyle({
        buttonBefore: true,
        buttonName: 'btn-primary',
        buttonText: ' Elija el archivo'
    });
    $('#chkAll').click(function () {
        $('input[name="chk[]"]').each(function () {
            if ($(this).is(':checked') == true && $('#chkAll').is(':checked') == true) {
            } else {
                $(this).prop('checked', true);
            }

            if ($(this).is(':checked') == true && $('#chkAll').is(':checked') == false) {
                $(this).removeAttr('checked');
            }
        });
    });
    setTimeout(function () {
        $(".alert-success").fadeOut(1500);
    }, 3000);
    $('.dataTables-example').DataTable({
//****************** funcion para cambiar de color valores numericos que se pasen de cierto limite *************
//        "createdRow": function ( row, data, index ) {
//            if ( data[5].replace(/[\$,]/g, '') * 1 > 150000 ) {//<- aqui va el limite o condicion. data[5]=la columna a evaluar
//                $('td', row).eq(5).addClass('highlight');
//            }
//        }
//****************** funcion para cambiar de color valores numericos que se pasen de cierto limite *************
//*********************** esta funcion se utiliza para mostrar sumatorias de valores al final de la tabla totalizandolas **************
//        "footerCallback": function ( row, data, start, end, display ) {
//            var api = this.api(), data;
//
//            // Remove the formatting to get integer data for summation
//            var intVal = function ( i ) {
//                return typeof i === 'string' ?
//                    i.replace(/[\$,]/g, '')*1 :
//                    typeof i === 'number' ?
//                        i : 0;
//            };
//
//            // Total over all pages
//            total = api
//                .column( 4 )
//                .data()
//                .reduce( function (a, b) {
//                    return intVal(a) + intVal(b);
//                }, 0 );
//
//            // Total over this page
//            pageTotal = api
//                .column( 4, { page: 'current'} )
//                .data()
//                .reduce( function (a, b) {
//                    return intVal(a) + intVal(b);
//                }, 0 );
//
//            // Update footer
//            $( api.column( 4 ).footer() ).html(
//                '$'+pageTotal +' ( $'+ total +' total)'
//            );
//        },
//*********************** esta funcion se utiliza para mostrar sumatorias de valores al final de la tabla totalizandolas **************
        "deferRender": true,
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Siguiente",
            },
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
            "info": "Mostrando _START_ a _END_ Registros de _TOTAL_",
            "search": "Buscar",
            "lengthMenu": "Mostrar _MENU_ Registros",
            "infoEmpty": "Mostrando 0 a 0 de 0 Registros",
            "emptyTable": "No hay datos disponibles en la tabla",
            "infoFiltered": "(Filtrando para _MAX_ Registros totales)",
            "zeroRecords": "No se encontraron registros coincidentes",
            "decimal": ",",
            "thousands": "."
        },
        stateSave: true,
        "stateDuration": 60 * 60 * 24,
//        dom: '<"html5buttons"B>lTfgitp',
        "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]], //sirve para indicar el numero de registros a visualizar en la tabla
//        "orden" : [[3, "desc" ]], // esta linea sirve para inicializar cualquier columna en la tabla (3=la columna 3 - desc=orden de esa columna)
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', },
            {extend: 'pdf', },
            {extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                }
            }
        ]

    });
    $('#btn_add').click(function () {
    });


});
function borrarEnMasa() {
    $('#gridMain').submit();
}
function fnClickAddRow() {
    $('#editable').dataTable().fnAddData([
        "Custom row",
        "New row",
        "New row",
        "New row",
        "New row"]);
}

function modalEliminar(id, url, urlHref, idModal) {
    $('#' + idModal).remove();
    $('body').append('<div class="modal fade" id="' + idModal + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="myModalLabel">Confirmar eliminación</h4></div><div class="modal-body">¿Desea eliminar el registro seleccionado?</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button><button type="button" class="btn btn-primary" onclick="eliminarRegistro(' + id + ', \'' + url + '\', \'' + urlHref + '\')"><i id="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i> Aceptar</button></div></div></div></div>');
    $('#loading').hide();
    $('#' + idModal).modal({show: true});
}

function eliminarRegistro(id, url, urlHref) {
    $.ajax({
        url: url,
        data: 'id=' + id,
        dataType: 'json', // xml html script
        type: 'POST', // GET PUT DELET
        success: function (data) {
            if (data.code == 200) {
                window.location.href = urlHref;
            } else {
                $('#modal' + id).modal('toggle');
                $('body').append('<div class="modal fade" id="modalError" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="myModalLabel">ERROR EN TRANSACCIÓN</h4></div><div class="modal-body">' + data.error + '</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Aceptar</button></div></div></div></div>');
                $('#modalError').modal({show: true});
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            data = {
                error: jqXHR + ' - ' + textStatus + ' - ' + errorThrown
            }
            $('#modal' + id).modal('toggle');
            $('body').append('<div class="modal fade" id="modalError" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="myModalLabel">ERROR EN TRANSACCIÓN</h4></div><div class="modal-body">' + data.error + '</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Aceptar</button></div></div></div></div>');
            $('#modalError').modal({show: true});
        },
        beforeSend: function () {
            $('#loading').show();
        },
        complete: function () {
            $('#loading').hide();
        },
    });
}

$(document).ready(function () {
    // $('#mvcIcon').hide();
    $('#mvcIcon .mvcPointer').click(function () {
        $('#mvcMain').toggle(150);
        $('#mvcIcon').toggle(150);
    });
    $('#mvcMain .mvcPointer').click(function () {
        $('#mvcMain').toggle(150);
        $('#mvcIcon').toggle(150);
    });
});
