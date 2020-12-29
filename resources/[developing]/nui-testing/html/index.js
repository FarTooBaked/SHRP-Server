$(function () {
    function display(bool) {
        if (bool) {
            $("#container").show();
        } else {
            $("#container").hide();
        }
    }

    display(false)

    window.addEventListener('message', function(event) {

        var item = event.data;
        if (item.type === "ui") {
            if (item.status == true) {
                display(true)
            } else {
                display(false)
            }
        }
    })
    // if the person uses the escape key, it will exit
    document.onkeyup = function (data) {
        if (data.which == 27) {
            $.post('https://nui-testing/exit', JSON.stringify({}));
            return
        }
    };
    $("#custom_image").click(function () {
        $.post('https://nui-testing/debug', JSON.stringify({}));
        return
    })
    $("#close").click(function () {
        $.post('https://nui-testing/exit', JSON.stringify({}));
        return
    })
    //when the user clicks on the submit button, it will run
    $("#submit").click(function () {
        let inputValue1 = $("#input_name").val()
        if (inputValue1.length >= 100) {
            $.post("https://nui-testing/error", JSON.stringify({
                error: "Input was greater than 100"
            }))
            return
        } else if (!inputValue1) {
            $.post("https://nui-testing/error", JSON.stringify({
                error: "There was no value in the input field"
            }))
            return
        }
        // if there are no errors from above, we can send the data back to the original callback and hanndle it from there
        $.post('https://nui-testing/main', JSON.stringify({
            text: inputValue1,
        }));

        let inputValue2 = $("#input_password").val()
        if (inputValue2.length >= 100) {
            $.post("https://nui-testing/error", JSON.stringify({
                error: "Input was greater than 100"
            }))
            return
        } else if (!inputValue2) {
            $.post("https://nui-testing/error", JSON.stringify({
                error: "There was no value in the input field"
            }))
            return
        }
        // if there are no errors from above, we can send the data back to the original callback and hanndle it from there
        $.post('https://nui-testing/main', JSON.stringify({
            text: inputValue2,
        }));
        return;
    })
})
