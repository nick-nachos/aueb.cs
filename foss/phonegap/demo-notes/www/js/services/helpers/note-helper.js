'use strict';

(function(angular) {
    
    angular.module('gr.aueb.cs.foss.notes.services.helpers').factory('noteHelper', [
        
        'stringUtil',
        
        function(stringUtil) {
            
            function NoteHelper() { }
            
            NoteHelper.prototype.isEmpty = function(note) {
                if (!stringUtil.isBlank(note.title)) {
                    return false;
                }
                
                return stringUtil.isBlank(note.text);
            };
            
            return new NoteHelper();
        }
    ]);
    
})(window.angular);
