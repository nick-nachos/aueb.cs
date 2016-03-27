'use strict';

(function(angular) {
    
    angular.module('gr.aueb.cs.foss.notes.services.helpers').factory('noteHelper', [
        
        'objectUtil', 'stringUtil',
        
        function(objectUtil, stringUtil) {
            
            function NoteHelper() { }
            
            NoteHelper.prototype.isEmpty = function(note) {
                if (!stringUtil.isBlank(note.title)) {
                    return false;
                }
                
                return stringUtil.isBlank(note.text);
            };
            
            NoteHelper.prototype.getColor = function(note) {
                return objectUtil.isNull(note.color) ? 'rgb(255, 255, 255)' : note.color;
            };
            
            NoteHelper.prototype.containsText = function(note, text) {
                if (stringUtil.isBlank(text)) {
                    return true;
                }
                
                if (stringUtil.contains(note.title, text, true)) {
                    return true;
                }
                
                if (stringUtil.contains(note.text, text, true)) {
                    return true;
                }
                
                return false;
            };
            
            NoteHelper.prototype.listAvailableColors = function() {
                return [
                    { id: 'white', value: 'rgb(255, 255, 255)' },
                    { id: 'red', value: 'rgb(255, 138, 128)' },
                    { id: 'orange', value: 'rgb(255, 209, 128)' },
                    { id: 'yellow', value: 'rgb(255, 255, 141)' },
                    { id: 'gray', value: 'rgb(207, 216, 220)' },
                    { id: 'blue', value: 'rgb(128, 216, 255)' },
                    { id: 'teal', value: 'rgb(167, 255, 235)' },
                    { id: 'green', value: 'rgb(204, 255, 144)' }
                ];
            };
            
            return new NoteHelper();
        }
    ]);
    
})(window.angular);
