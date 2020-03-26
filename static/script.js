function getFormData($form){
    var form_data = $form.serializeArray();
    var index_form_data = {};

    $.map(form_data, function(n, i){
        index_form_data[n['name']] = n['value'];
    });
    return index_form_data;
}

function func()
{
    var array = getFormData($(form));
    var body = array['body'];
    var position_x = parseFloat(array['position_x']);
    var position_y = parseFloat(array['position_y']);
    var position_z = parseFloat(array['position_z']);
    var position_unit = array['position_unit'];
    var velocity_x = parseFloat(array['velocity_x']);
    var velocity_y = parseFloat(array['velocity_y']);
    var velocity_z = parseFloat(array['velocity_z']);
    var velocity_unit = array['velocity_unit'];
    var velocity_value = [velocity_x, velocity_y, velocity_z];
    var velocity = {
        "value": velocity_value,
        "unit": velocity_unit
    };
    var position_value = [position_x, position_y, position_z];
    var position = {
        "value": position_value,
        "unit": position_unit
    };
    var final_data = {
        "body": body,
        "position": position,
        "velocity": velocity
    };

    return JSON.stringify(final_data);

}

function Orbit(){
    $.ajax({
        url: "https://poliastro-api.herokuapp.com/orbit",
        type: "POST",
        crossDomain: true,
        data: func(),
        dataType: "json",
        headers:{"content-type": "application/json"},

        error: function (xhr, status) {
            alert("Something Went Wrong");
        }
    })
        .done(function(data) {
            var api = document.getElementById('api');
            var pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data,undefined, 4);
            api.appendChild(pre);
        });
}

function Orbit_plot(){
    $.ajax({
        url: "https://poliastro-api.herokuapp.com/orbit-plot",
        type: "POST",
        crossDomain: true,
        data: func(),
        dataType: "json",
        headers:{"content-type": "application/json"},

        error: function (xhr, status) {
            alert("Something Went Wrong");
        }
    })
        .done(function( data ) {
            graph = document.createElement('div');
            graph.id = 'orbit-plot';
            document.body.appendChild(graph);
            Plotly.newPlot(graph, data.data, data.layout);
        });
}
