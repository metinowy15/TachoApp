app.factory("jsonParser", jsonParser);

function jsonParser() {
    return { parseLegForRegistration: parseLegForRegistration }

    function parseLegForRegistration(data) {
        if(data == "[]")
            return false;
        var parseData = JSON.parse(data);
        var legArray = parseData.leg;
        for (let i = 0; i < legArray.length; i++) {
            var nameFirst = legArray[i].FirstName =="null" || legArray[i].FirstName == null ? "" : legArray[i].FirstName;
            var nameLast = legArray[i].LastName =="null" || legArray[i].LastName == null ? "" : legArray[i].LastName;
            
            legArray[i].DriverName = nameFirst+ " " + nameLast;
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

        var dT = moment(leg.DateTo);
        var dN = moment();
        
        leg.DayToEnd = Math.round(dT.diff(dN,'days'),1);
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}