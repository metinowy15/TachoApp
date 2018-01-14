var app = angular.module('tachoSerwis', []);
app.controller('mainCtrl', mainCtrl);

function mainCtrl($scope,repository,jsonParser){
    var ctrl = this;
    ctrl.registration = ""
    ctrl.legArray = [];
    ctrl.showLeg = false;

    ctrl.findForReg = function(){
        repository.getForRegistration(ctrl.registration).then(data => {
            ctrl.legArray = jsonParser.parseLegForRegistration(data);
            ctrl.showLeg = true;
            $scope.$apply();
        });
    }

    ctrl.reLegalize = function (legalizationId){
        repository.reLegalize(legalizationId).then(data => {
            ctrl.findForReg();
        });
    }
}

app.controller('lastCtrl', lastCtrl);

function lastCtrl($scope,repository,jsonParser){
    var ctrl = this;
    ctrl.registration = ""
    ctrl.legArray = [];
    ctrl.showLeg = false;

    ctrl.findLast = function(){
        repository.getLast().then(data => {
            ctrl.legArray = jsonParser.parseLegForRegistration(data);
            console.log(ctrl.legArray);
            ctrl.showLeg = true;
            $scope.$apply();
        });
    }
    ctrl.findLast();

    ctrl.call = function (leg){
        window.plugins.CallNumber.callNumber(function(){}, function(){}, leg.PhoneNumber, true);
    }

    ctrl.reLegalize = function (legalizationId){
        repository.reLegalize(legalizationId).then(data => {
            ctrl.findLast();
        });
    }
}