var PathAPI2 = "https://ods.org.mx/v2/API/";
$(document).ready(function(){
	$('#sel_estados').hide();
	get_tematica(PCveInd);
	$('#listado_indicadores').change(function(){
		//alert( $('#listado_indicadores select').val() );
		window.location.href = ''+$('#listado_indicadores select').val();
		$('#listaselect #i'+PCveInd).attr('selected','selected');
	});

$('select').material_select();

});

function get_tematica(PCveInd){
	var url = PathAPI2 + 'Tematica/Todos';
    var parametros =  {"PIdioma":"ES"}
    $.ajax({
      type: 'POST',
      url: url,
      data: parametros,
      success: function( data, textStatus, jqxhr ) {
         crea_lista(data,PCveInd);
      },
      async:false
    });
}

function crea_lista(data, PCveInd){
	var contenido =  '<select id="listaselect">';
	var contenedor  = $('#listado_indicadores');
	for (var i = 0; i < data.length; i++) {
		contenido = contenido + '<optgroup label="'+ data[i].Abrevia_des +'">';
		for (var j = 0; j < data[i].Meta.length; j++) {

			console.log(data.length);
			console.log(data[i].Meta.length);
			console.log(data[i].Meta[j].Indicador.length);

			for (var k = 0; k < data[i].Meta[j].Indicador.length; k++) {
				var clave_arb     = data[i].Meta[j].Indicador[k].ClaveInd_arb;
				var codigo_dg     = data[i].Meta[j].Indicador[k].DesGeo.Codigo_dg;
				var descrip_des   = data[i].Meta[j].Indicador[k].Descrip_des;
				var codigo_des    = data[i].Meta[j].Indicador[k].Codigo_des;
				contenido = contenido + '<option id="i'+clave_arb+'" value="indicadores.html?objetivo='+data[i].Codigo_des+'&meta='+data[i].Meta[j].Clave_arb+'&indicador='+clave_arb+'&codigo='+codigo_dg+'&obj='+data[i].Clave_arb+'">'+data[i].Meta[j].Indicador[k].Codigo_des +' '+  data[i].Meta[j].Indicador[k].Descrip_des+'</option>';
			}
		}
		contenido = contenido + '</optgroup>';
	}
	contenido = contenido + '</select>';
	contenedor.html(contenido);

	$('#listaselect').material_select();

	$('#listaselect #i'+PCveInd).attr('selected','selected');


}
