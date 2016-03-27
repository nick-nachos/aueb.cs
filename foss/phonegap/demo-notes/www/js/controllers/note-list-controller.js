'use strict';

(function(angular) {

    angular.module('gr.aueb.cs.foss.notes.controllers').controller('noteListController', [
        
        '$scope', '$location', 'noteDataService', 'noteHelper', 'userPreferences', 'messageBox', 'orientation', 'appNavigator', 'arrayUtil',
        
        function($scope, $location, noteDataService, noteHelper, userPreferences, messageBox, orientation, appNavigator, arrayUtil) {
            
            $scope.activateSearchBar = function() {
                $scope.searchBarActive = true;
            };
            
            $scope.deactivateSearchBar = function() {
                $scope.searchBarActive = false;
                delete $scope.searchText;
            };
            
            $scope.toggleListType = function() {
                $scope.mosaicDisplay = !$scope.mosaicDisplay;
                userPreferences.setNoteViewMosaic($scope.mosaicDisplay);
            };
            
            $scope.editNote = function(note) {
                $location.url('/notes/' + note.id);
            };
            
            $scope.deleteNote = function(note) {
                noteDataService.deleteNoteById(note.id).then($scope.loadNotes);
            };
            
            $scope.containsNote = function(note, noteIndex, noteColumnIndex) {
                return noteIndex % $scope.noteColumnIndices.length === noteColumnIndex;
            };
            
            $scope.getNoteColor = function(note) {
                return noteHelper.getColor(note);
            };
            
            $scope.loadNotes = function() {
                noteDataService.getNotes().then($scope.onGetNotesSuccess, $scope.onGetNotesError);
            };
            
            $scope.onGetNotesSuccess = function(notes) {
                $scope.notes = notes;
            };
            
            $scope.onGetNotesError = function() {
                messageBox.alert('Failed to fetch list of notes. please try again later!');
            };
            
            $scope.onOrientationChange = function() {
                var noteColumnCount = orientation.landscape ? 3 : 2;
                $scope.noteColumnIndices = arrayUtil.range(0, noteColumnCount);
            };
            
            appNavigator.setBackAction(angular.noop, true);
            $scope.mosaicDisplay = userPreferences.isNoteViewMosaic();
            $scope.loadNotes();
            $scope.onOrientationChange();
            orientation.addOrientationListener($scope.onOrientationChange);
        }
    ]);
    
})(window.angular);
