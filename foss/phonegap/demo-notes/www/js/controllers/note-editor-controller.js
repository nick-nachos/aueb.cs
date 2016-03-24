'use strict';

(function(angular) {

    angular.module('gr.aueb.cs.foss.notes.controllers').controller('noteEditorController', [
        
        '$scope', '$routeParams', '$location', 'noteDataService', 'messageBox', 'objectUtil',
        
        function($scope, $routeParams, $location, noteDataService, messageBox, objectUtil) {
            
            $scope.onGetNoteSuccess = function(note) {
                $scope.note = note;
                $scope.initSuccess = true;
            };
            
            $scope.onGetNoteError = function() {
                $scope.note = { };
                $scope.initSuccess = false;
                messageBox.alert('Failed to get note data, please try again later.');
            };
            
            $scope.close = function() {
                if ($scope.initSuccess) {
                    noteDataService.saveNote($scope.note).then(function() {
                        $scope.goBack();
                    });
                }
                else {
                    $scope.goBack();
                }
            };
            
            $scope.goBack = function() {
                $location.url('/notes');
            };
            
            if (objectUtil.isNull($routeParams.noteId)) {
                $scope.onGetNoteSuccess({
                    title: null,
                    text: null
                });
            }
            else {
                noteDataService.getNoteById($routeParams.noteId).then($scope.onGetNoteSuccess, $scope.onGetNoteError);
            }
        }
    ]);
    
})(window.angular);
