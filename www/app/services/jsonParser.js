app.factory("jsonParser", jsonParser);

function jsonParser() {
    return { parseLegForRegistration: parseLegForRegistration }

    function parseLegForRegistration(data) {
        var parseData = JSON.parse(data);
        var legArray = parseData.leg;

        for (let i = 0; i < legArray.length; i++) {
            legArray[i].DriverName = legArray[i].FirstName + " " + legArray[i].LastName;
            setDateTo(legArray[i]);
        }

        return legArray;
    }

    function setDateTo(leg) {
        var dateTo;
        var dateFrom = new Date(leg.DateFrom)
        if (leg.LegalizationType === 'Legalization')
            dateTo = addDays(dateFrom, 730)
        if (leg.LegalizationType === 'Card')
            dateTo = addDays(dateFrom, 30)
        if (leg.LegalizationType === 'Tachograph')
            dateTo = addDays(dateFrom, 91)
        leg.DateTo = dateTo.toISOString().slice(0,10);
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}