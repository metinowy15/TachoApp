app.factory("repository", repository)

function repository() {

    return {
        getForRegistration: getForRegistration,
        reLegalize: reLegalize,
        getLast: getLast
    }

    function reLegalize(legalizationCommand) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    function getLast() {
        return $.ajax({
            url: "http://czasnasolidarnosc.pl/TachoSerwis/getLast.php",
            type: "POST"
        });
    }

    function getForRegistration(registration) {
        return $.ajax({
            url: "http://czasnasolidarnosc.pl/TachoSerwis/getForRegistration.php",
            type: "POST",
            data: {
                registration: registration
            }
        });
    }
}