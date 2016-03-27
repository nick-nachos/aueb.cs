'use strict';

(function(angular) {
    
    angular.module('gr.aueb.cs.foss.notes.util').factory('stringUtil', [
        
        'objectUtil',
        
        function(objectUtil) {
            
            function StringUtil() { }
            
            StringUtil.prototype.isEmpty = function(str) {
                return objectUtil.isNull(str) || str === '';
            };
            
            StringUtil.prototype.isBlank = function(str) {
                return this.isEmpty(str) || str.trim() === '';
            };
            
            return new StringUtil();
        }
    ]);
    
})(window.angular);
