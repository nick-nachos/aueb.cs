'use strict';

(function(angular) {
    
    angular.module('gr.aueb.cs.foss.notes.util').factory('objectUtil', [
        
        function() {
            
            function ObjectUtil() { }
            
            ObjectUtil.prototype.isNull = function(value) {
                return angular.isUndefined(value) || value === null;
            };
            
            ObjectUtil.prototype.copy = function(value) {
                return angular.copy(value);
            };
            
            return new ObjectUtil();
        }
    ]);
    
})(window.angular);
