'use strict';

(function(angular) {
    
    angular.module('gr.aueb.cs.foss.notes.dal').factory('noteRepository', [
        
        '$q', '$window', 'objectUtil', 'arrayUtil',
        
        function($q, $window, objectUtil, arrayUtil) {
            
            function NoteRepository() { }
            
            NoteRepository._LOCAL_STORAGE_KEY = 'gr.aueb.cs.foss.notes.dal';
            
            NoteRepository.prototype.getNotes = function() {
                var deferred = $q.defer();
                
                if (objectUtil.isNull(this._notes)) {
                    var notes = angular.fromJson($window.localStorage[NoteRepository._LOCAL_STORAGE_KEY]);
                    this._notes = objectUtil.isNull(notes) ? [] : notes;
                }
                
                deferred.resolve(this._notes);
                
                return deferred.promise;
            };
            
            NoteRepository.prototype.getNoteById = function(noteId) {
                var deferred = $q.defer();
                var that = this;
                
                this.getNotes().then(function(notes) {
                    deferred.resolve(that._getNoteById(notes, noteId));
                }, function(error) {
                    deferred.reject(error);
                });
                
                return deferred.promise;
            };
            
            NoteRepository.prototype.createNote = function(note) {
                var deferred = $q.defer();
                var that = this;
                
                this.getNotes().then(function(notes) {
                    deferred.resolve(that._createNote(notes, note));
                }, function(error) {
                    deferred.reject(error);
                });
                
                return deferred.promise;
            };
            
            NoteRepository.prototype.updateNote = function(note) {
                var deferred = $q.defer();
                var that = this;
                
                this.getNotes().then(function(notes) {
                    that._updateNote(notes, note);
                    deferred.resolve();
                }, function(error) {
                    deferred.reject(error);
                });
                
                return deferred.promise;
            };
            
            NoteRepository.prototype.deleteNoteById = function(noteId) {
                var deferred = $q.defer();
                var that = this;
                
                this.getNotes().then(function(notes) {
                    that._deleteNoteById(notes, noteId);
                    deferred.resolve();
                }, function(error) {
                    deferred.reject(error);
                });
                
                return deferred.promise;
            };
            
            NoteRepository.prototype._getNoteById = function(notes, noteId) {
                var note = arrayUtil.getFirstMatch(notes, function(note) {
                    return note.id == noteId;
                });
                
                return objectUtil.copy(note);
            };
            
            NoteRepository.prototype._createNote = function(notes, note) {
                var noteToSave = objectUtil.copy(note);
                var maxNoteId = 0;
                    
                arrayUtil.forEach(notes, function(n) {
                    if (maxNoteId === null || n.id > maxNoteId) {
                        maxNoteId = n.id;
                    }
                });

                noteToSave.id = maxNoteId + 1;
                notes.unshift(noteToSave);
                this._persistToLocalStorage(notes);
                
                return noteToSave.id;
            };
            
            NoteRepository.prototype._updateNote = function(notes, note) {
                var noteToSave = objectUtil.copy(note);
                
                var noteIndex = arrayUtil.indexOfMatch(notes, function(n) {
                    return n.id === noteToSave.id;
                });

                notes[noteIndex] = noteToSave;
                this._persistToLocalStorage(notes);
            };
            
            NoteRepository.prototype._deleteNoteById = function(notes, noteId) {
                var noteIndex = arrayUtil.indexOfMatch(notes, noteId);
                
                if (noteIndex > -1) {
                    notes.splice(noteIndex, 1);
                }
                
                this._persistToLocalStorage(notes);
            };
            
            NoteRepository.prototype._persistToLocalStorage = function(notes) {
                $window.localStorage[NoteRepository._LOCAL_STORAGE_KEY] = angular.toJson(notes);
            };
            
            return new NoteRepository();
        }
    ]);
    
})(window.angular);
