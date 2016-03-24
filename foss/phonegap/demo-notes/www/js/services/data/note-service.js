'use strict';

(function(angular) {
    
    angular.module('gr.aueb.cs.foss.notes.services.data').factory('noteDataService', [
        
        'noteRepository', 'objectUtil',
        
        function(noteRepository, objectUtil) {
            
            function NoteDataService() { }
            
            NoteDataService.prototype.getNotes = function() {
                return noteRepository.getNotes();
            };
            
            NoteDataService.prototype.getNoteById = function(noteId) {
                return noteRepository.getNoteById(noteId);
            };
            
            NoteDataService.prototype.saveNote = function(note) {
                if (objectUtil.isNull(note.id)) {
                    return noteRepository.createNote(note);
                }
                else {
                    return noteRepository.updateNote(note);
                }
            };
            
            NoteDataService.prototype.deleteNoteById = function(noteId) {
                return noteRepository.deleteNoteById(noteId);
            };
            
            return new NoteDataService();
        }
    ]);
    
})(window.angular);
