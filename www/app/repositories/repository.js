app.factory("repository",repository)

function repository (){

    return {
        getForRegistration:getForRegistration,
        reLegalize:reLegalize
    }

    function reLegalize(legalizationCommand){
        return new Promise((resolve, reject) =>{
            resolve();
        });
    }

    function getForRegistration(registration){
        return new Promise((resolve,reject) => {
         resolve({
           data: [{
                id:1,
                registration:"KLI JP",
                model:"Volvo",
                brand:"Xc60",
                companyName:"Fhu JakubMrowca",
                legalizationType: "Card",
                tachograph: "Analog",
                dayToEnd: 31,
                driverName: "Jasiek fasola",
                dateFrom: Date.now(),
                tachographNr:"123123123",
                tachographSymbol: "1231",

            },
            {
                id:2,
                registration:"KLI HWDP",
                model:"Mercedes",
                brand:"Variot",
                companyName:"Fhu Jacek Walaszek",
                legalizationType: "Legalization",
                tachograph: "Analog",
                dayToEnd: 10,
                driverName: "Jakub Mrowca",
                dateFrom: Date.now(),
                tachographNr:"3333333",
                tachographSymbol: "414141",               
            },
            {
                id:3,
                registration:"KLI PEJA",
                model:"Iveco",
                brand:"Power",
                companyName:"Przewoz osob Sławomir",
                legalizationType: "Tachograph",
                tachograph: "Digital",
                dayToEnd: 2,
                driverName: "Maciek Gniecol",
                dateFrom: Date.now(),
                tachographNr:"1.23.121",
                tachographSymbol: "123213.33",               
            }]
        });
    });
    }

}