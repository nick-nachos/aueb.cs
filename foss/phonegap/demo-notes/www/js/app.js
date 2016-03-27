'use strict';

(function(angular) {
    
    var moduleUtil = angular.module('gr.aueb.cs.foss.notes.util', []);
    
    var moduleHelper = angular.module('gr.aueb.cs.foss.notes.services.helpers', [
        moduleUtil.name
    ]);
    
    var moduleServicesInfrastructure = angular.module('gr.aueb.cs.foss.notes.services.infrastructure', [
        moduleUtil.name
    ]);
    
    var moduleDal = angular.module('gr.aueb.cs.foss.notes.dal', [
        moduleUtil.name
    ]);
    
    var moduleServicesData = angular.module('gr.aueb.cs.foss.notes.services.data', [
        moduleDal.name,
        moduleUtil.name
    ]);
    
    var moduleServicesUI = angular.module('gr.aueb.cs.foss.notes.services.ui', [
        moduleUtil.name
    ]);
    
    var moduleDirectivesGestures = angular.module('gr.aueb.cs.foss.notes.directives.gestures', [
        'mobile-angular-ui.gestures'
    ]);
    
    var moduleControllers = angular.module('gr.aueb.cs.foss.notes.controllers', [
        moduleUtil.name,
        moduleHelper.name,
        moduleServicesData.name,
        moduleServicesUI.name,
        moduleServicesInfrastructure.name
    ]);
    
    var app = angular.module('gr.aueb.cs.foss.notes', [
        'ngRoute',
        'mobile-angular-ui.components',
        'mobile-angular-ui.gestures',
        moduleControllers.name,
        moduleDirectivesGestures.name
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