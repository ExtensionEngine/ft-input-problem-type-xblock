/* Javascript for FtInputXBlock. */
function FtInputXBlock(runtime, element) {
    var $element = $(element);
    var handlerUrl = runtime.handlerUrl(element, 'update_answer');

    $('#save-answer', element).click(function (eventObject) {
        var $input = $element.find('#user_input');
        var data = $input.val();

        $input.attr('placeholder', 'saving...');
        $input.val('');

        $.ajax({
                type: "POST",
                url: handlerUrl,
                data: JSON.stringify({'user_input': data})
            })
            .done(function(response){
                showNewInputInPlaceholder(response['user_input'])
            });
    });

    function showNewInputInPlaceholder(data) {
        var $input = $element.find('#user_input');
        $input.attr('placeholder', data);
        $input.val('');
    }

    $(function () {
        var $question = $element.find('.ft-question');
        var question_text = $question.text();
        $question.empty();

        var bold_text = '<span class="bolded-text">' + question_text.substr(0, question_text.indexOf('#')) + '</span>';
        var normal_text = question_text.substr(question_text.indexOf('#') + 1, question_text.length);

        $question.append(bold_text).append(normal_text);
    });
}
