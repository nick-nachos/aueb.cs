'use strict';

(function(angular) {

    angular.module('gr.aueb.cs.foss.notes.controllers').controller('noteListController', [
        
        '$scope', '$location', 'noteDataService', 'messageBox', 'orientation', 'arrayUtil',
        
        function($scope, $location, noteDataService, messageBox, orientation, arrayUtil) {
            
            $scope.editNote = function(note) {
                $location.url('/notes/' + note.id);
            };
            
            $scope.containsNote = function(noteIndex, noteColumnIndex) {
                return noteIndex % $scope.noteColumnIndices.length === noteColumnIndex;
            };
            
            $scope.onGetNotesSuccess = function(notes) {
                $scope.notes = notes;
            };
            
            $scope.onGetNotesError = function() {
                messageBox.alert('Failed to fetch list of notes. please try again later!');
            };
            
            $scope.onOrientationChange = function() {
                if (orientation.landscape) {
                    $scope.noteColumnIndices = arrayUtil.range(0, 3);
                }
                else {
                    $scope.noteColumnIndices = arrayUtil.range(0, 2);
                }
            };
            
            noteDataService.getNotes().then($scope.onGetNotesSuccess, $scope.onGetNotesError);
            $scope.onOrientationChange();
            orientation.addOrientationListener($scope.onOrientationChange);
        }
    ]);
    
})(window.angular);
