app.factory("repository", repository)

function repository() {

    return {
        getForRegistration: getForRegistration,
        reLegalize: reLegalize,
        getForNip: getForNip,
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

    function getForNip(nip) {
        return $.ajax({
            url: "http://czasnasolidarnosc.pl/TachoSerwis/getForNip.php",
            type: "POST",
            data: {
                nip: nip
            }
        });
    }
}