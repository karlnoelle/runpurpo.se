$(function () {
    let $form = $('.create-event-form');

    function submitForm () {
        let name = $form.find('.event-name input').val();
        let date = $form.find('.event-date input').val();
        let time = $form.find('.event-time input').val();
        let location = $form.find('.event-location input').val();
        let address = $form.find('.event-address input').val();
        let description = $form.find('.event-description textarea').val();
        // Add validation, default values.

        let event = {
            'name': name,
            'date': date,
            'time': time,
            'location': location,
            'address': address,
            'description': description,
        };
        $.ajax({
            contentType: 'application/json',
            data: JSON.stringify(event),
            error: function(data, sStatus) {
                alert('you failed! ' + sStatus);
            },
            method: 'POST',
            success: function(data, sStatus) {
                // TODO: redirect.
                alert(`success! ${data._id}`);
            },
            url: '/api/create-event',
        });
    }
    $('button.submit-form').click(function(e) {
        e.stopPropagation();
        submitForm();
    });
});
