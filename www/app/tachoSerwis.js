var app = angular.module('tachoSerwis', []);
app.controller('mainCtrl', mainCtrl);

function mainCtrl($scope, repository, jsonParser) {
    var ctrl = this;
    ctrl.registration = ""
    ctrl.legArray = [];
    ctrl.legForCompany = [];
    ctrl.lastArray = [];
    ctrl.nip = ""
    ctrl.showLeg = false;
    var selectedLeg;
    var action;

    ctrl.findForReg = function () {
        ctrl.showSpinner = true;
        ctrl.showLeg = false;
        repository.getForRegistration(ctrl.registration).then(data => {
            ctrl.legArray = jsonParser.parseLegForRegistration(data);
            if (ctrl.legArray == false)
                ctrl.showLeg = false;
            else
                ctrl.showLeg = true;
            $scope.$apply();
            $('#Main').trigger('create');
            ctrl.showSpinner = false;
        });
    }

    ctrl.call = function (leg) {
        showConfirmBar("Czy chcesz zadzwonić?")

        action = function () {
            window.plugins.CallNumber.callNumber(function () { }, function () { }, selectedLeg.PhoneNumber, true);
        }

    }

    ctrl.relegalize = function () {
        showConfirmBar("Czy chcesz ponowić legalizacje?")

        action = function () {
            repository.reLegalize(selectedLeg.id).then(data => {
            });
        }
    }

    ctrl.sms = function () {
        showConfirmBar("Czy chcesz wysłać wiadomośc SMS?")

        action = function () {
            if (SMS) SMS.sendSMS([selectedLeg.PhoneNumber], getSmsText(), function () { }, function (str) { alert(str); });
        }

    }

    ctrl.findLast = function () {
        repository.getLast().then(data => {
            ctrl.lastArray = jsonParser.parseLegForRegistration(data);
            ctrl.showLeg = true;
            $scope.$apply();
            $('#Last').trigger('create');
        });
    }

    ctrl.showOptions = function (legalization) {
        ctrl.cancel();
        selectedLeg = legalization;
        var z = document.getElementById("navigateBar");
        z.style.height = "60px";
    }

    ctrl.hide = function () {
        var z = document.getElementById("navigateBar");
        z.style.height = "0px";
    }

    ctrl.findForNip = function () {
        ctrl.showSpinner = true;
        ctrl.showLeg = false;
        repository.getForNip(ctrl.nip).then(data => {
            ctrl.legForCompany = jsonParser.parseLegForRegistration(data);
            if (ctrl.legForCompany == false)
                ctrl.showLeg = false;
            else ctrl.showLeg = true;
            $scope.$apply();
            $('#Main').trigger('create');
            ctrl.showSpinner = false;
        });
    }

    ctrl.hideAll = function () {
        ctrl.hide();
        ctrl.showLeg = false;
        ctrl.cancel();
    }
    $(document).on("pageshow", "#Main", ctrl.hideAll);
    $(document).on("pageshow", "#Company", ctrl.hideAll);
    $(document).on("pageshow", "#Last", ctrl.hideAll);
    ctrl.findLast();

    function getSmsText() {
        if (selectedLeg.LegalizationType === "Legalization") {
            var text = "Dzień dobry, firma TachoSerwis chciała by przypomnieć o terminie legalizacji dla pojazdu: " + ctrl.selectedLeg.Registration + ", która dobiega końca: " + ctrl.selectedLeg.DateTo + " za: " + ctrl.selectedLeg.DayToEnd + " dni.";
            return text;
        }

        if (selectedLeg.LegalizationType === "Tachograph") {
            var text = "Dzień dobry, firma TachoSerwis chciała by przypomnieć o terminie odczytu tachografu dla pojazdu: " + ctrl.selectedLeg.Registration + ", który dobiega końca: " + ctrl.selectedLeg.DateTo + " za: " + ctrl.selectedLeg.DayToEnd + " dni.";
            return text;
        }

        if (selectedLeg.LegalizationType === "Card") {
            var text = "Dzień dobry, firma TachoSerwis chciała by przypomnieć o terminie odczytu karty warsztatowej, który dobiega końca: " + ctrl.selectedLeg.DateTo + " za: " + ctrl.selectedLeg.DayToEnd + " dni.";
            return text;
        }
    }

    function showConfirmBar(message) {
        var z = document.getElementById("confirmBar");
        z.style.height = "80px";
        ctrl.confirmMsg = message;
        var k = document.getElementById("navigateBar");
        k.style.height = "0px";
    }

    ctrl.cancel = function () {
        var z = document.getElementById("confirmBar");
        z.style.height = "0px";
        ctrl.confirmMsg = "";
        ctrl.selectedLeg = null;
    }

    ctrl.acceptAction = function () {
        var z = document.getElementById("confirmBar");
        z.style.height = "0px";
        ctrl.confirmMsg = "";

        action();
    }
}