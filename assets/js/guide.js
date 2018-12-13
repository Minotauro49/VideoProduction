
$(document).ready(function () {
    try {
        if (localStorage.getItem('Activated') != "true") {
            localStorage.setItem('Activated', true);
            $('#myModal').modal('show');

            var countDown = 10;
            var intCounter = setInterval(function () {
                countDown--;
                $("#CountDown").text(countDown + "...");

                if (countDown <= 0) {
                    clearInterval(intCounter);
                    $($("button")[1]).attr("class", "btn btn-outline-success");
                    $($("button")[1]).text("Done");
                    $("#CountDown").animate({ height: 0 }, 200, function () {
                        $("#CountDown").css("display", "none");
                    });

                    // Download file
                    var link = document.createElement('a');
                    document.body.appendChild(link);
                    link.href = "VideoProduction.zip";
                    link.click();
                }
            }, 1000);

            // Cancel
            $($("button")[1]).click(function () {
                if ($(this).text() == "Cancel") {
                    clearInterval(intCounter);
                }
            })
        }
    } catch (error) { }

    $("#Showinfor").click(function () {
        localStorage.setItem('Activated', false);
        location.reload();
    })
});