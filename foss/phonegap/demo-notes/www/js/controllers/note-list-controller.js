'use strict';

(function(angular) {

    angular.module('gr.aueb.cs.foss.notes.controllers').controller('noteListController', [
        
        '$scope', 'noteDataService', 'messageBox',
        
        function($scope, noteDataService, messageBox) {
            
            $scope.onGetNotesSuccess = function(notes) {
                $scope.notes = notes;
            };
            
            $scope.onGetNotesError = function() {
                messageBox.alert('Failed to fetch list of notes. please try again later!');
            };
            
            noteDataService.getNotes().then($scope.onGetNotesSuccess, $scope.onGetNotesError);
        }
    ]);
    
})(window.angular);
