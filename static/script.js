function getFormData($form){
    var form_data = $form.serializeArray();
    var index_form_data = {};

    $.map(form_data, function(n, i){
        index_form_data[n['name']] = n['value'];
    });
    return index_form_data;
}

function jsonify_data()
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
    var data = {
        "body": body,
        "position": position,
        "velocity": velocity
    };
    return JSON.stringify(data);
}

function requests(){
    $.ajax({
        url: "https://poliastro-api-alcnpgpvvq-uc.a.run.app/orbit",
        type: "POST",
        crossDomain: true,
        data: jsonify_data(),
        dataType: "json",
        headers:{"content-type": "application/json"},

        error: function (xhr, status) {
            alert("Something Went Wrong");
        }
    })
        .done(function( data ) {
            document.getElementById("api").innerHTML = JSON.stringify(data,undefined, 4);

        });
}

