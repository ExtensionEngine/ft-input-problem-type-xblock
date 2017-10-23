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
                messageSavedFeedback(response['user_input']);
                $element.find('#save-answer').addClass('disabled');
            })
            .fail(function () {
                $element.find('.feedback-message')
                    .addClass('error')
                    .text('An error occurred while saving. Please, try again later.');
            });
    });

    // FEATURE: save & restore input state
    // we preserve input state in window variable,
    // so when you navigate through course units in courseware page,
    // your XBlock updates from the state which it had on page load

    // restore input value
    $element.find('textarea').ready(function(){
        if (window.xblocksData && window.xblocksData[handlerUrl]) {
            $element.find('textarea').val(window.xblocksData[handlerUrl]);
        }
    });

    // save input value
    $element.find('textarea').on('keyup', function() {
        if (!window.xblocksData) {
            window.xblocksData = {};
        }

        window.xblocksData[handlerUrl] = $(this).val();
    });

    function messageSavedFeedback(data) {
        $element.find('#user_input').val(data);

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
