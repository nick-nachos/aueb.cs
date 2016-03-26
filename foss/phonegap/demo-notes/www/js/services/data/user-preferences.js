'use strict';

(function(angular) {
    
    angular.module('gr.aueb.cs.foss.notes.services.data').factory('userPreferences', [
        
        '$window', 'objectUtil',
        
        function($window, objectUtil) {
            function UserPreferences() {
                this._loadPreferences();
            }
            
            UserPreferences._LOCAL_STORAGE_KEY = 'gr.aueb.cs.foss.notes.prefs';
            
            UserPreferences.prototype.isNoteViewMosaic = function() {
                var value = this._prefs.noteViewMosaic;
                
                return objectUtil.isNull(value) ? true : value;
            };
            
            UserPreferences.prototype.setNoteViewMosaic = function(value) {
                this._prefs.noteViewMosaic = value;
                this._savePreferences();
            };
            
            UserPreferences.prototype._loadPreferences = function() {
                var prefs = angular.fromJson($window.localStorage[UserPreferences._LOCAL_STORAGE_KEY]);
                this._prefs = objectUtil.isNull(prefs) ? { } : prefs;
            };
            
            UserPreferences.prototype._savePreferences = function() {
                $window.localStorage[UserPreferences._LOCAL_STORAGE_KEY] = angular.toJson(this._prefs);
            };
            
            return new UserPreferences();
        }
    ]);
    
})(window.angular);
