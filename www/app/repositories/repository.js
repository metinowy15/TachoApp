app.factory("repository", repository)

function repository() {

    return {
        getForRegistration: getForRegistration,
        reLegalize: reLegalize,
        getLast: getLast,
        getForNip: getForNip
    }

    function reLegalize(legalizationCommand) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    function getForNip(nip){
        return $.ajax({
            url: "http://solidarnosclukowica.pl/TachoSerwis/getFornNip.php",
            type: "POST",
            data: {
                nip: nip
            }
        });
    }

    function getLast() {
        return $.ajax({
            url: "http://solidarnosclukowica.pl/TachoSerwis/getLast.php",
            type: "POST"
        });
    }

    function getForRegistration(registration) {
        return $.ajax({
            url: "http://solidarnosclukowica.pl/TachoSerwis/getForRegistration.php",
            type: "POST",
            data: {
                registration: registration
            }
        });
    }
}