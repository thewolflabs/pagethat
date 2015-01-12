// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('pagethat', ['ionic','ngRoute','pagethat.controllers'])

.run(function($ionicPlatform, $rootScope, $state, $location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	  openFB.init({appId: '354998024658576',tokenStore: window.localStorage});
	  
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'loginController'
    })
  
  
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'loginController'
    })

    .state('app.post', {
      url: "/post",
      views: {
        'menuContent' :{
          templateUrl: "templates/post.html",
		  controller: 'facebookController'
        }
      }
    })
    .state('app.facebook', {
      url: "/facebook",
      views: {
        'menuContent' :{
          templateUrl: "templates/facebook.html",
          controller: 'facebookController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

