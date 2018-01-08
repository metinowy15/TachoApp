var app = angular.module('tachoSerwis', []);

app.controller('mainCtrl', mainCtrl);

function mainCtrl($scope,repository){
    var ctrl = this;
    ctrl.message = "Jo se jest z tad"
    ctrl.registration = ""
    ctrl.legArray = [];
    ctrl.showLeg = false;

    ctrl.findForReg = function(){
        repository.getForRegistration(ctrl.registration).then(data => {
            ctrl.legArray = data.data;
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