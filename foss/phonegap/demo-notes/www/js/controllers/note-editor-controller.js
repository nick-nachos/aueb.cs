'use strict';

(function(angular) {

    angular.module('gr.aueb.cs.foss.notes.controllers').controller('noteEditorController', [
        
        '$scope', '$routeParams', '$location', 'noteDataService', 'messageBox', 'noteHelper', 'appNavigator', 'objectUtil',
        
        function($scope, $routeParams, $location, noteDataService, messageBox, noteHelper, appNavigator, objectUtil) {
            
            $scope.onGetNoteSuccess = function(note) {
                $scope.note = note;
            };
            
            $scope.onGetNoteError = function() {
                $scope.note = { };
                messageBox.alert('Failed to get note data, please try again later.').then($scope.goBack);
            };
            
            $scope.close = function() {
                if (!$scope.isNewNote() || !noteHelper.isEmpty($scope.note)) {
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
            
            $scope.isNewNote = function() {
                return objectUtil.isNull($routeParams.noteId);
            };
            
            appNavigator.setBackAction($scope.close);
            
            if ($scope.isNewNote()) {
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
