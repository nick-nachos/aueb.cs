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
            
            StringUtil.prototype.contains = function(text, pattern, caseInsensitive) {
                var textCoersed = this._coerseContains(text, caseInsensitive);
                var patternCoersed = this._coerseContains(pattern, caseInsensitive);
                
                return textCoersed.indexOf(patternCoersed) > -1;
            };
            
            StringUtil.prototype._coerseContains = function(text, caseInsensitive) {
                var coersed = this.isBlank(text) ? '' : text;
                
                return caseInsensitive ? coersed.toLowerCase() : coersed;
            };
            
            return new StringUtil();
        }
    ]);
    
})(window.angular);
