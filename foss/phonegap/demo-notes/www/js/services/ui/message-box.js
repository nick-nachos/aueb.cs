'use strict';

(function(angular) {

    angular.module('gr.aueb.cs.foss.notes.services.ui').factory('messageBox', [
        
        '$q', '$window',
        
        function($q, $window) {
            
            function MessageBox() { }
            
            MessageBox.prototype.alert = function(message) {
                var deferred = $q.defer();
                $window.alert(message);
                deferred.resolve();
                
                return deferred.promise;
            };
            
            return new MessageBox();
        }
    ]);
    
})(window.angular);
