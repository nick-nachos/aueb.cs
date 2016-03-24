'use strict';

(function(angular) {
    
    var moduleUtil = angular.module('gr.aueb.cs.foss.notes.util', []);
    
    var moduleDal = angular.module('gr.aueb.cs.foss.notes.dal', [
        moduleUtil.name
    ]);
    
    var moduleServicesData = angular.module('gr.aueb.cs.foss.notes.services.data', [
        moduleDal.name,
        moduleUtil.name
    ]);
    
    var moduleServicesUI = angular.module('gr.aueb.cs.foss.notes.services.ui', []);
    
    var moduleControllers = angular.module('gr.aueb.cs.foss.notes.controllers', [
        moduleServicesData.name,
        moduleServicesUI.name
    ]);
    
    var app = angular.module('gr.aueb.cs.foss.notes', [
        'ngRoute',
        moduleControllers.name
    ]);
    
    app.config([
        
        '$routeProvider',
        
        function($routeProvider) {
            $routeProvider.
                when('/notes', {
                    templateUrl: 'markup/pages/note-list.html',
                    controller: 'noteListController'
                }).
                when('/notes/new', {
                    templateUrl: 'markup/pages/note-editor.html',
                    controller: 'noteEditorController'
                }).
                when('/notes/:noteId', {
                    templateUrl: 'markup/pages/note-editor.html',
                    controller: 'noteEditorController'
                }). 
                otherwise({
                    redirectTo: '/notes'
                });
        }
    ]);
    
})(window.angular);