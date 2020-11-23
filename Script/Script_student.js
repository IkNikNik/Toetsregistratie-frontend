/* Latest compiled and minified JavaScript included as External Resource */

$(document).ready(function () {
    $('.editBtn').click(function () {
        if ($('.editField').is('[readonly]')) {         //checks if it is already on readonly mode
            $('.editField').prop('readonly', false);    //turns the readonly off
            $('.editBtn').html('Edit On');              //Changes the text of the button
            $('.editBtn').css("background", "green");
            $('.editBtn').css("border", "green");
        } else {                                        //else we do other things
            $('.editField').prop('readonly', true);
            $('.editBtn').html('Edit Off');
            $('.editBtn').css("background", "red");
        }
    });

});

// tell the embed parent frame the height of the content
if (window.parent && window.parent.parent) {
    window.parent.parent.postMessage(["resultsFrame", {
        height: document.body.getBoundingClientRect().height,
        slug: "w4ynU"
    }], "*")
}

// always overwrite window.name, in case users try to set it manually
window.name = "result"
