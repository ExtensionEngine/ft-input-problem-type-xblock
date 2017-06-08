/* Javascript for FtInputXBlock. */
function FtInputXBlock(runtime, element) {
    var $element = $(element);
    var handlerUrl = runtime.handlerUrl(element, 'update_answer');

    $('#save-answer', element).click(function (eventObject) {
        var $input = $element.find('#user_input');
        var data = $input.val();

        $element.find('.feedback-message').text('saving...');

        $.ajax({
                type: "POST",
                url: handlerUrl,
                data: JSON.stringify({'user_input': data})
            })
            .done(function (response) {
                messageSavedFeedback(response['user_input'])
            })
            .fail(function () {
                $element.find('.feedback-message')
                    .addClass('error')
                    .text('An error occurred while saving. Please, try again later.');
            });
    });

    function messageSavedFeedback(data) {
        var $input = $element.find('#user_input');
        $input.val(data);

        $element.find('.feedback-message')
            .addClass('success')
            .text('Your changes have been saved.');
    }

    /* auto expand textarea in regarding amount of the text */
    $('textarea#user_input').each(function () {
        if ($(this).val() !== '') {
            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
        } else {
            this.setAttribute('style', 'height:2rem;overflow-y:hidden;');
        }
    }).on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });


    /* Split question into bold + normal text, depending on '#' within string (if exists) */
    $(function () {
        var $question = $element.find('.ft-question');
        var question_text = $question.text();
        $question.empty();

        var bold_text = '<span class="bolded-text">' + question_text.substr(0, question_text.indexOf('#')) + '</span>';
        var normal_text = question_text.substr(question_text.indexOf('#') + 1, question_text.length);

        $question.append(bold_text).append(normal_text);
    });
}
