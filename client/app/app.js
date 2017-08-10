System.register("app/app.config", [], function (exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    function routeConfig($routeProvider, $locationProvider) {
        'ngInject';
        $routeProvider
            .otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
    }
    exports_1("routeConfig", routeConfig);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("app/app.constants", [], function (exports_2, context_2) {
    'use strict';
    var __moduleName = context_2 && context_2.id;
    var angular;
    return {
        setters: [],
        execute: function () {
            angular = require('angular');
            exports_2("default", angular.module('runpurposeApp.constants', [])
                .constant('appConfig', require('../../server/config/environment/shared'))
                .name);
        }
    };
});
System.register("components/util/util.service", [], function (exports_3, context_3) {
    'use strict';
    var __moduleName = context_3 && context_3.id;
    /**
     * The Util service is for thin, globally reusable, utility functions
     */
    function UtilService($window) {
        'ngInject';
        var Util = {
            /**
             * Return a callback or noop function
             *
             * @param  {Function|*} cb - a 'potential' function
             * @return {Function}
             */
            safeCb: function (cb) {
                return (angular.isFunction(cb)) ? cb : angular.noop;
            },
            /**
             * Parse a given url with the use of an anchor element
             *
             * @param  {String} url - the url to parse
             * @return {Object}     - the parsed url, anchor element
             */
            urlParse: function (url) {
                var a = document.createElement('a');
                a.href = url;
                // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
                if (a.host === '') {
                    a.href = a.href;
                }
                return a;
            },
            /**
             * Test whether or not a given url is same origin
             *
             * @param  {String}           url       - url to test
             * @param  {String|String[]}  [origins] - additional origins to test against
             * @return {Boolean}                    - true if url is same origin
             */
            isSameOrigin: function (url, origins) {
                url = Util.urlParse(url);
                origins = (origins && [].concat(origins)) || [];
                origins = origins.map(Util.urlParse);
                origins.push($window.location);
                origins = origins.filter(function (o) {
                    var hostnameCheck = url.hostname === o.hostname;
                    var protocolCheck = url.protocol === o.protocol;
                    // 2nd part of the special treatment for IE fix (see above):
                    // This part is when using well-known ports 80 or 443 with IE,
                    // when $window.location.port==='' instead of the real port number.
                    // Probably the same cause as this IE bug: https://goo.gl/J9hRta
                    var portCheck = url.port === o.port || (o.port === '' && (url.port === '80' || url.port === '443'));
                    return hostnameCheck && protocolCheck && portCheck;
                });
                return origins.length >= 1;
            }
        };
        return Util;
    }
    exports_3("UtilService", UtilService);
    var angular;
    return {
        setters: [],
        execute: function () {
            angular = require('angular');
        }
    };
});
System.register("components/util/util.module", ["components/util/util.service"], function (exports_4, context_4) {
    'use strict';
    var __moduleName = context_4 && context_4.id;
    var angular, util_service_1;
    return {
        setters: [
            function (util_service_1_1) {
                util_service_1 = util_service_1_1;
            }
        ],
        execute: function () {
            angular = require('angular');
            exports_4("default", angular.module('runpurposeApp.util', [])
                .factory('Util', util_service_1.UtilService)
                .name);
        }
    };
});
System.register("components/auth/interceptor.service", [], function (exports_5, context_5) {
    'use strict';
    var __moduleName = context_5 && context_5.id;
    function authInterceptor($rootScope, $q, $cookies, $location, Util) {
        'ngInject';
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
                    config.headers.Authorization = 'Bearer ' + $cookies.get('token');
                }
                return config;
            },
            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookies.remove('token');
                }
                return $q.reject(response);
            }
        };
    }
    exports_5("authInterceptor", authInterceptor);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/auth/router.decorator", [], function (exports_6, context_6) {
    'use strict';
    var __moduleName = context_6 && context_6.id;
    function routerDecorator($rootScope, $location, Auth) {
        'ngInject';
        // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (!next.authenticate) {
                return;
            }
            if (typeof next.authenticate === 'string') {
                Auth.hasRole(next.authenticate).then(function (has) {
                    if (has) {
                        return;
                    }
                    event.preventDefault();
                    return Auth.isLoggedIn().then(function (is) {
                        $location.path(is ? '/' : '/login');
                    });
                });
            }
            else {
                Auth.isLoggedIn().then(function (is) {
                    if (is) {
                        return;
                    }
                    event.preventDefault();
                    $location.path('/login');
                });
            }
        });
    }
    exports_6("routerDecorator", routerDecorator);
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("components/auth/auth.service", [], function (exports_7, context_7) {
    'use strict';
    var __moduleName = context_7 && context_7.id;
    function AuthService($location, $http, $cookies, $q, appConfig, Util, User) {
        'ngInject';
        var safeCb = Util.safeCb;
        var currentUser = new _User();
        var userRoles = appConfig.userRoles || [];
        /**
         * Check if userRole is >= role
         * @param {String} userRole - role of current user
         * @param {String} role - role to check against
         */
        var hasRole = function (userRole, role) {
            return userRoles.indexOf(userRole) >= userRoles.indexOf(role);
        };
        if ($cookies.get('token') && $location.path() !== '/logout') {
            currentUser = User.get();
        }
        var Auth = {
            /**
             * Authenticate user and save token
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - function(error, user)
             * @return {Promise}
             */
            login: function (_a, callback) {
                var email = _a.email, password = _a.password;
                return $http.post('/auth/local', { email: email, password: password })
                    .then(function (res) {
                    $cookies.put('token', res.data.token);
                    currentUser = User.get();
                    return currentUser.$promise;
                })
                    .then(function (user) {
                    safeCb(callback)(null, user);
                    return user;
                })["catch"](function (err) {
                    Auth.logout();
                    safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            },
            /**
             * Delete access token and user info
             */
            logout: function () {
                $cookies.remove('token');
                currentUser = new _User();
            },
            /**
             * Create a new user
             *
             * @param  {Object}   user     - user info
             * @param  {Function} callback - function(error, user)
             * @return {Promise}
             */
            createUser: function (user, callback) {
                return User.save(user, function (data) {
                    $cookies.put('token', data.token);
                    currentUser = User.get();
                    return safeCb(callback)(null, user);
                }, function (err) {
                    Auth.logout();
                    return safeCb(callback)(err);
                }).$promise;
            },
            /**
             * Change password
             *
             * @param  {String}   oldPassword
             * @param  {String}   newPassword
             * @param  {Function} callback    - function(error, user)
             * @return {Promise}
             */
            changePassword: function (oldPassword, newPassword, callback) {
                return User.changePassword({ id: currentUser._id }, { oldPassword: oldPassword, newPassword: newPassword }, function () {
                    return safeCb(callback)(null);
                }, function (err) {
                    return safeCb(callback)(err);
                }).$promise;
            },
            /**
             * Gets all available info on a user
             *
             * @param  {Function} [callback] - function(user)
             * @return {Promise}
             */
            getCurrentUser: function (callback) {
                var value = _.get(currentUser, '$promise')
                    ? currentUser.$promise
                    : currentUser;
                return $q.when(value)
                    .then(function (user) {
                    safeCb(callback)(user);
                    return user;
                }, function () {
                    safeCb(callback)({});
                    return {};
                });
            },
            /**
             * Gets all available info on a user
             *
             * @return {Object}
             */
            getCurrentUserSync: function () {
                return currentUser;
            },
            /**
             * Check if a user is logged in
             *
             * @param  {Function} [callback] - function(is)
             * @return {Promise}
             */
            isLoggedIn: function (callback) {
                return Auth.getCurrentUser(undefined)
                    .then(function (user) {
                    var is = _.get(user, 'role');
                    safeCb(callback)(is);
                    return is;
                });
            },
            /**
             * Check if a user is logged in
             *
             * @return {Bool}
             */
            isLoggedInSync: function () {
                return !!_.get(currentUser, 'role');
            },
            /**
             * Check if a user has a specified role or higher
             *
             * @param  {String}     role     - the role to check against
             * @param  {Function} [callback] - function(has)
             * @return {Promise}
             */
            hasRole: function (role, callback) {
                return Auth.getCurrentUser(undefined)
                    .then(function (user) {
                    var has = hasRole(_.get(user, 'role'), role);
                    safeCb(callback)(has);
                    return has;
                });
            },
            /**
              * Check if a user has a specified role or higher
              *
              * @param  {String} role - the role to check against
              * @return {Bool}
              */
            hasRoleSync: function (role) {
                return hasRole(_.get(currentUser, 'role'), role);
            },
            /**
             * Check if a user is an admin
             *   (synchronous|asynchronous)
             *
             * @param  {Function|*} callback - optional, function(is)
             * @return {Bool|Promise}
             */
            isAdmin: function () {
                return Auth.hasRole
                    .apply(Auth, [].concat.apply(['admin'], arguments));
            },
            /**
             * Check if a user is an admin
             *
             * @return {Bool}
             */
            isAdminSync: function () {
                return Auth.hasRoleSync('admin');
            },
            /**
             * Get auth token
             *
             * @return {String} - a token string used for authenticating
             */
            getToken: function () {
                return $cookies.get('token');
            }
        };
        return Auth;
    }
    exports_7("AuthService", AuthService);
    var _User;
    return {
        setters: [],
        execute: function () {
            // @flow
            _User = (function () {
                function _User() {
                    this._id = '';
                    this.name = '';
                    this.email = '';
                    this.role = '';
                    this.$promise = undefined;
                }
                return _User;
            }());
        }
    };
});
System.register("components/auth/user.service", [], function (exports_8, context_8) {
    'use strict';
    var __moduleName = context_8 && context_8.id;
    function UserResource($resource) {
        'ngInject';
        return $resource('/api/users/:id/:controller', {
            id: '@_id'
        }, {
            changePassword: {
                method: 'PUT',
                params: {
                    controller: 'password'
                }
            },
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            }
        });
    }
    exports_8("UserResource", UserResource);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/auth/auth.module", ["app/app.constants", "components/util/util.module", "components/auth/interceptor.service", "components/auth/router.decorator", "components/auth/auth.service", "components/auth/user.service"], function (exports_9, context_9) {
    'use strict';
    var __moduleName = context_9 && context_9.id;
    function addInterceptor($httpProvider) {
        'ngInject';
        $httpProvider.interceptors.push('authInterceptor');
    }
    var angular, app_constants_1, util_module_1, ngCookies, interceptor_service_1, router_decorator_1, auth_service_1, user_service_1, ngRoute;
    return {
        setters: [
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            },
            function (util_module_1_1) {
                util_module_1 = util_module_1_1;
            },
            function (interceptor_service_1_1) {
                interceptor_service_1 = interceptor_service_1_1;
            },
            function (router_decorator_1_1) {
                router_decorator_1 = router_decorator_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }
        ],
        execute: function () {
            angular = require('angular');
            ngCookies = require('angular-cookies');
            ngRoute = require('angular-route');
            exports_9("default", angular.module('runpurposeApp.auth', [
                app_constants_1["default"],
                util_module_1["default"],
                ngCookies,
                ngRoute
            ])
                .factory('authInterceptor', interceptor_service_1.authInterceptor)
                .run(router_decorator_1.routerDecorator)
                .factory('Auth', auth_service_1.AuthService)
                .factory('User', user_service_1.UserResource)
                .config(['$httpProvider', addInterceptor])
                .name);
        }
    };
});
System.register("app/account/account.routes", [], function (exports_10, context_10) {
    'use strict';
    var __moduleName = context_10 && context_10.id;
    function routes($routeProvider) {
        'ngInject';
        $routeProvider
            .when('/login', {
            template: require('./login/login.html'),
            controller: 'LoginController',
            controllerAs: 'vm'
        })
            .when('/logout', {
            name: 'logout',
            referrer: '/',
            template: '',
            controller: function ($location, $route, Auth) {
                var referrer = $route.current.params.referrer ||
                    $route.current.referrer ||
                    '/';
                Auth.logout();
                $location.path(referrer);
            }
        })
            .when('/signup', {
            template: require('./signup/signup.html'),
            controller: 'SignupController',
            controllerAs: 'vm'
        })
            .when('/settings', {
            template: require('./settings/settings.html'),
            controller: 'SettingsController',
            controllerAs: 'vm',
            authenticate: true
        });
    }
    exports_10("default", routes);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("app/account/login/login.controller", [], function (exports_11, context_11) {
    'use strict';
    var __moduleName = context_11 && context_11.id;
    var LoginController;
    return {
        setters: [],
        execute: function () {
            LoginController = (function () {
                /*@ngInject*/
                function LoginController(Auth, $location) {
                    this.user = {
                        name: '',
                        email: '',
                        password: ''
                    };
                    this.errors = { login: undefined };
                    this.submitted = false;
                    this.Auth = Auth;
                    this.$location = $location;
                }
                LoginController.prototype.login = function (form) {
                    var _this = this;
                    this.submitted = true;
                    if (form.$valid) {
                        this.Auth.login({
                            email: this.user.email,
                            password: this.user.password
                        })
                            .then(function () {
                            // Logged in, redirect to home
                            _this.$location.path('/');
                        })["catch"](function (err) {
                            _this.errors.login = err.message;
                        });
                    }
                };
                return LoginController;
            }());
            exports_11("default", LoginController);
        }
    };
});
System.register("app/account/login/index", ["app/account/login/login.controller"], function (exports_12, context_12) {
    'use strict';
    var __moduleName = context_12 && context_12.id;
    var angular, login_controller_1;
    return {
        setters: [
            function (login_controller_1_1) {
                login_controller_1 = login_controller_1_1;
            }
        ],
        execute: function () {
            angular = require('angular');
            exports_12("default", angular.module('runpurposeApp.login', [])
                .controller('LoginController', login_controller_1["default"])
                .name);
        }
    };
});
System.register("app/account/settings/settings.controller", [], function (exports_13, context_13) {
    'use strict';
    var __moduleName = context_13 && context_13.id;
    var SettingsController;
    return {
        setters: [],
        execute: function () {
            SettingsController = (function () {
                /*@ngInject*/
                function SettingsController(Auth) {
                    this.user = {
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    };
                    this.errors = { other: undefined };
                    this.message = '';
                    this.submitted = false;
                    this.Auth = Auth;
                }
                SettingsController.prototype.changePassword = function (form) {
                    var _this = this;
                    this.submitted = true;
                    if (form.$valid) {
                        this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
                            .then(function () {
                            _this.message = 'Password successfully changed.';
                        })["catch"](function () {
                            form.password.$setValidity('mongoose', false);
                            _this.errors.other = 'Incorrect password';
                            _this.message = '';
                        });
                    }
                };
                return SettingsController;
            }());
            exports_13("default", SettingsController);
        }
    };
});
System.register("app/account/settings/index", ["app/account/settings/settings.controller"], function (exports_14, context_14) {
    'use strict';
    var __moduleName = context_14 && context_14.id;
    var angular, settings_controller_1;
    return {
        setters: [
            function (settings_controller_1_1) {
                settings_controller_1 = settings_controller_1_1;
            }
        ],
        execute: function () {
            angular = require('angular');
            exports_14("default", angular.module('runpurposeApp.settings', [])
                .controller('SettingsController', settings_controller_1["default"])
                .name);
        }
    };
});
System.register("app/account/signup/signup.controller", [], function (exports_15, context_15) {
    'use strict';
    var __moduleName = context_15 && context_15.id;
    var angular, SignupController;
    return {
        setters: [],
        execute: function () {
            // @flow
            angular = require('angular');
            SignupController = (function () {
                /*@ngInject*/
                function SignupController(Auth, $location) {
                    this.user = {
                        name: '',
                        email: '',
                        password: ''
                    };
                    this.errors = {};
                    this.submitted = false;
                    this.Auth = Auth;
                    this.$location = $location;
                }
                SignupController.prototype.register = function (form) {
                    var _this = this;
                    this.submitted = true;
                    if (form.$valid) {
                        return this.Auth.createUser({
                            name: this.user.name,
                            email: this.user.email,
                            password: this.user.password
                        })
                            .then(function () {
                            // Account created, redirect to home
                            _this.$location.path('/');
                        })["catch"](function (err) {
                            err = err.data;
                            _this.errors = {};
                            // Update validity of form fields that match the mongoose errors
                            angular.forEach(err.errors, function (error, field) {
                                form[field].$setValidity('mongoose', false);
                                _this.errors[field] = error.message;
                            });
                        });
                    }
                };
                return SignupController;
            }());
            exports_15("default", SignupController);
        }
    };
});
System.register("app/account/signup/index", ["app/account/signup/signup.controller"], function (exports_16, context_16) {
    'use strict';
    var __moduleName = context_16 && context_16.id;
    var angular, signup_controller_1;
    return {
        setters: [
            function (signup_controller_1_1) {
                signup_controller_1 = signup_controller_1_1;
            }
        ],
        execute: function () {
            angular = require('angular');
            exports_16("default", angular.module('runpurposeApp.signup', [])
                .controller('SignupController', signup_controller_1["default"])
                .name);
        }
    };
});
System.register("components/oauth-buttons/index", [], function (exports_17, context_17) {
    'use strict';
    var __moduleName = context_17 && context_17.id;
    function OauthButtonsController($window) {
        'ngInject';
        this.loginOauth = function (provider) {
            $window.location.href = '/auth/' + provider;
        };
    }
    exports_17("OauthButtonsController", OauthButtonsController);
    var angular;
    return {
        setters: [],
        execute: function () {
            angular = require('angular');
            exports_17("default", angular.module('runpurposeApp.oauthButtons', [])
                .directive('oauthButtons', function () {
                return {
                    template: require('./oauth-buttons.html'),
                    restrict: 'EA',
                    controller: OauthButtonsController,
                    controllerAs: 'OauthButtons',
                    scope: {
                        classes: '@'
                    }
                };
            })
                .name);
        }
    };
});
System.register("app/account/index", ["app/account/account.routes", "app/account/login/index", "app/account/settings/index", "app/account/signup/index", "components/oauth-buttons/index"], function (exports_18, context_18) {
    'use strict';
    var __moduleName = context_18 && context_18.id;
    var angular, ngRoute, account_routes_1, login_1, settings_1, signup_1, oauth_buttons_1;
    return {
        setters: [
            function (account_routes_1_1) {
                account_routes_1 = account_routes_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (signup_1_1) {
                signup_1 = signup_1_1;
            },
            function (oauth_buttons_1_1) {
                oauth_buttons_1 = oauth_buttons_1_1;
            }
        ],
        execute: function () {
            angular = require('angular');
            ngRoute = require('angular-route');
            exports_18("default", angular.module('runpurposeApp.account', [
                ngRoute,
                login_1["default"],
                settings_1["default"],
                signup_1["default"],
                oauth_buttons_1["default"]
            ])
                .config(account_routes_1["default"])
                .run(function ($rootScope) {
                'ngInject';
                $rootScope.$on('$routeChangeStart', function (event, next, current) {
                    if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
                        next.referrer = current.originalPath;
                    }
                });
            })
                .name);
        }
    };
});
System.register("app/admin/admin.routes", [], function (exports_19, context_19) {
    'use strict';
    var __moduleName = context_19 && context_19.id;
    function routes($routeProvider) {
        'ngInject';
        $routeProvider
            .when('/admin', {
            template: require('./admin.html'),
            controller: 'AdminController',
            controllerAs: 'admin',
            authenticate: 'admin'
        });
    }
    exports_19("default", routes);
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("app/admin/admin.controller", [], function (exports_20, context_20) {
    'use strict';
    var __moduleName = context_20 && context_20.id;
    var AdminController;
    return {
        setters: [],
        execute: function () {
            AdminController = (function () {
                /*@ngInject*/
                function AdminController(User) {
                    // Use the User $resource to fetch all users
                    this.users = User.query();
                }
                AdminController.prototype["delete"] = function (user) {
                    user.$remove();
                    this.users.splice(this.users.indexOf(user), 1);
                };
                return AdminController;
            }());
            exports_20("default", AdminController);
        }
    };
});
System.register("app/admin/index", ["app/admin/admin.routes", "app/admin/admin.controller"], function (exports_21, context_21) {
    'use strict';
    var __moduleName = context_21 && context_21.id;
    var angular, admin_routes_1, admin_controller_1;
    return {
        setters: [
            function (admin_routes_1_1) {
                admin_routes_1 = admin_routes_1_1;
            },
            function (admin_controller_1_1) {
                admin_controller_1 = admin_controller_1_1;
            }
        ],
        execute: function () {
            angular = require('angular');
            exports_21("default", angular.module('runpurposeApp.admin', [
                'runpurposeApp.auth',
                'ngRoute'
            ])
                .config(admin_routes_1["default"])
                .controller('AdminController', admin_controller_1["default"])
                .name);
        }
    };
});
System.register("components/navbar/navbar.component", [], function (exports_22, context_22) {
    'use strict';
    var __moduleName = context_22 && context_22.id;
    var angular, NavbarComponent;
    return {
        setters: [],
        execute: function () {
            /* eslint no-sync: 0 */
            angular = require('angular');
            NavbarComponent = (function () {
                function NavbarComponent($location, Auth) {
                    'ngInject';
                    this.menu = [{
                            'title': 'Home',
                            'link': '/'
                        }, {
                            title: 'Events',
                            link: '/events'
                        }];
                    this.isCollapsed = true;
                    this.$location = $location;
                    this.isLoggedIn = Auth.isLoggedInSync;
                    this.isAdmin = Auth.isAdminSync;
                    this.getCurrentUser = Auth.getCurrentUserSync;
                }
                NavbarComponent.prototype.isActive = function (route) {
                    return route === this.$location.path();
                };
                return NavbarComponent;
            }());
            exports_22("NavbarComponent", NavbarComponent);
            exports_22("default", angular.module('directives.navbar', [])
                .component('navbar', {
                template: require('./navbar.html'),
                controller: NavbarComponent
            })
                .name);
        }
    };
});
System.register("components/footer/footer.component", [], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var angular, FooterComponent;
    return {
        setters: [],
        execute: function () {
            angular = require('angular');
            FooterComponent = (function () {
                function FooterComponent() {
                }
                return FooterComponent;
            }());
            exports_23("FooterComponent", FooterComponent);
            exports_23("default", angular.module('directives.footer', [])
                .component('footer', {
                template: require('./footer.html'),
                controller: FooterComponent
            })
                .name);
        }
    };
});
System.register("app/main/main.routes", [], function (exports_24, context_24) {
    'use strict';
    var __moduleName = context_24 && context_24.id;
    function routes($routeProvider) {
        'ngInject';
        $routeProvider
            .when('/', {
            template: '<main></main>'
        });
    }
    exports_24("default", routes);
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("app/main/main.component", ["app/main/main.routes"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var angular, ngRoute, main_routes_1, MainController;
    return {
        setters: [
            function (main_routes_1_1) {
                main_routes_1 = main_routes_1_1;
            }
        ],
        execute: function () {
            angular = require('angular');
            ngRoute = require('angular-route');
            MainController = (function () {
                /*@ngInject*/
                function MainController($http) {
                    this.awesomeThings = [];
                    this.newThing = '';
                    this.$http = $http;
                }
                MainController.prototype.$onInit = function () {
                    var _this = this;
                    this.$http.get('/api/things').then(function (response) {
                        _this.awesomeThings = response.data;
                    });
                };
                MainController.prototype.addThing = function () {
                    if (this.newThing) {
                        this.$http.post('/api/things', { name: this.newThing });
                        this.newThing = '';
                    }
                };
                MainController.prototype.deleteThing = function (thing) {
                    this.$http["delete"]('/api/things/' + thing._id);
                };
                return MainController;
            }());
            exports_25("MainController", MainController);
            exports_25("default", angular.module('runpurposeApp.main', [
                ngRoute
            ])
                .config(main_routes_1["default"])
                .component('main', {
                template: require('./main.html'),
                controller: MainController
            })
                .name);
        }
    };
});
System.register("components/events/events.routes", [], function (exports_26, context_26) {
    'use strict';
    var __moduleName = context_26 && context_26.id;
    function default_1($routeProvider) {
        'ngInject';
        $routeProvider
            .when('/events', {
            template: '<events></events>'
        });
    }
    exports_26("default", default_1);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/events/events.component", ["components/events/events.routes"], function (exports_27, context_27) {
    'use strict';
    var __moduleName = context_27 && context_27.id;
    var angular, ngRoute, events_routes_1, EventsComponent;
    return {
        setters: [
            function (events_routes_1_1) {
                events_routes_1 = events_routes_1_1;
            }
        ],
        execute: function () {
            angular = require('angular');
            ngRoute = require('angular-route');
            EventsComponent = (function () {
                /*@ngInject*/
                function EventsComponent() {
                    this.message = 'Hello';
                }
                return EventsComponent;
            }());
            exports_27("EventsComponent", EventsComponent);
            exports_27("default", angular.module('runpurposeApp.events', [ngRoute])
                .config(events_routes_1["default"])
                .component('events', {
                template: require('./events.html'),
                controller: EventsComponent,
                controllerAs: 'eventsCtrl'
            })
                .name);
        }
    };
});
System.register("components/eventDetails/eventDetails.routes", [], function (exports_28, context_28) {
    'use strict';
    var __moduleName = context_28 && context_28.id;
    function default_2($routeProvider) {
        'ngInject';
        $routeProvider
            .when('/eventDetails', {
            template: '<event-details></event-details>'
        });
    }
    exports_28("default", default_2);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/eventDetails/eventDetails.component", ["components/eventDetails/eventDetails.routes"], function (exports_29, context_29) {
    'use strict';
    var __moduleName = context_29 && context_29.id;
    var angular, ngRoute, eventDetails_routes_1, EventDetailsComponent;
    return {
        setters: [
            function (eventDetails_routes_1_1) {
                eventDetails_routes_1 = eventDetails_routes_1_1;
            }
        ],
        execute: function () {
            angular = require('angular');
            ngRoute = require('angular-route');
            EventDetailsComponent = (function () {
                /*@ngInject*/
                function EventDetailsComponent() {
                    this.message = 'Hello';
                }
                return EventDetailsComponent;
            }());
            exports_29("EventDetailsComponent", EventDetailsComponent);
            exports_29("default", angular.module('runpurposeApp.eventDetails', [ngRoute])
                .config(eventDetails_routes_1["default"])
                .component('eventDetails', {
                template: require('./eventDetails.html'),
                controller: EventDetailsComponent,
                controllerAs: 'eventDetailsCtrl'
            })
                .name);
        }
    };
});
System.register("components/createEvent/createEvent.routes", [], function (exports_30, context_30) {
    'use strict';
    var __moduleName = context_30 && context_30.id;
    // Restrict 'user' role from viewing /createEvent route
    function default_3($routeProvider) {
        'ngInject';
        $routeProvider
            .when('/createEvent', {
            template: '<create-event></create-event>',
            authenticate: 'admin'
        });
    }
    exports_30("default", default_3);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/createEvent/createEvent.component", ["components/createEvent/createEvent.routes"], function (exports_31, context_31) {
    'use strict';
    var __moduleName = context_31 && context_31.id;
    var angular, ngRoute, createEvent_routes_1, CreateEventComponent;
    return {
        setters: [
            function (createEvent_routes_1_1) {
                createEvent_routes_1 = createEvent_routes_1_1;
            }
        ],
        execute: function () {
            angular = require('angular');
            ngRoute = require('angular-route');
            CreateEventComponent = (function () {
                /*@ngInject*/
                function CreateEventComponent() {
                    this.message = 'Hello';
                }
                return CreateEventComponent;
            }());
            exports_31("CreateEventComponent", CreateEventComponent);
            exports_31("default", angular.module('runpurposeApp.createEvent', [ngRoute])
                .config(createEvent_routes_1["default"])
                .component('createEvent', {
                template: require('./createEvent.html'),
                controller: CreateEventComponent,
                controllerAs: 'createEventCtrl'
            })
                .name);
        }
    };
});
System.register("app/profile/profile.routes", [], function (exports_32, context_32) {
    'use strict';
    var __moduleName = context_32 && context_32.id;
    function default_4($routeProvider) {
        'ngInject';
        $routeProvider
            .when('/profile', {
            template: '<profile></profile>'
        });
    }
    exports_32("default", default_4);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("app/profile/profile.component", ["app/profile/profile.routes"], function (exports_33, context_33) {
    'use strict';
    var __moduleName = context_33 && context_33.id;
    var angular, ngRoute, profile_routes_1, ProfileComponent;
    return {
        setters: [
            function (profile_routes_1_1) {
                profile_routes_1 = profile_routes_1_1;
            }
        ],
        execute: function () {
            angular = require('angular');
            ngRoute = require('angular-route');
            ProfileComponent = (function () {
                function ProfileComponent($location, Auth) {
                    'ngInject';
                    this.$location = $location;
                    this.isLoggedIn = Auth.isLoggedInSync;
                    this.getCurrentUser = Auth.getCurrentUserSync;
                }
                ProfileComponent.prototype.isActive = function (route) {
                    return route === this.$location.path();
                };
                return ProfileComponent;
            }());
            exports_33("ProfileComponent", ProfileComponent);
            exports_33("default", angular.module('runpurposeApp.profile', [ngRoute])
                .config(profile_routes_1["default"])
                .component('profile', {
                template: require('./profile.html'),
                controller: ProfileComponent
            })
                .name);
        }
    };
});
System.register("app/app", ["app/app.config", "components/auth/auth.module", "app/account/index", "app/admin/index", "components/navbar/navbar.component", "components/footer/footer.component", "app/main/main.component", "app/app.constants", "components/util/util.module", "components/events/events.component", "components/eventDetails/eventDetails.component", "components/createEvent/createEvent.component", "app/profile/profile.component", "./app.scss"], function (exports_34, context_34) {
    'use strict';
    var __moduleName = context_34 && context_34.id;
    var angular, ngCookies, ngResource, ngSanitize, ngRoute, uiBootstrap, app_config_1, auth_module_1, account_1, admin_1, navbar_component_1, footer_component_1, main_component_1, app_constants_2, util_module_2, events_component_1, eventDetails_component_1, createEvent_component_1, profile_component_1;
    return {
        setters: [
            function (app_config_1_1) {
                app_config_1 = app_config_1_1;
            },
            function (auth_module_1_1) {
                auth_module_1 = auth_module_1_1;
            },
            function (account_1_1) {
                account_1 = account_1_1;
            },
            function (admin_1_1) {
                admin_1 = admin_1_1;
            },
            function (navbar_component_1_1) {
                navbar_component_1 = navbar_component_1_1;
            },
            function (footer_component_1_1) {
                footer_component_1 = footer_component_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            },
            function (app_constants_2_1) {
                app_constants_2 = app_constants_2_1;
            },
            function (util_module_2_1) {
                util_module_2 = util_module_2_1;
            },
            function (events_component_1_1) {
                events_component_1 = events_component_1_1;
            },
            function (eventDetails_component_1_1) {
                eventDetails_component_1 = eventDetails_component_1_1;
            },
            function (createEvent_component_1_1) {
                createEvent_component_1 = createEvent_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            angular = require('angular');
            // import ngAnimate from 'angular-animate';
            ngCookies = require('angular-cookies');
            ngResource = require('angular-resource');
            ngSanitize = require('angular-sanitize');
            ngRoute = require('angular-route');
            uiBootstrap = require('angular-ui-bootstrap');
            angular.module('runpurposeApp', [
                ngCookies,
                ngResource,
                ngSanitize,
                ngRoute,
                uiBootstrap,
                auth_module_1["default"],
                account_1["default"],
                admin_1["default"], navbar_component_1["default"],
                footer_component_1["default"],
                main_component_1["default"],
                app_constants_2["default"],
                events_component_1["default"],
                eventDetails_component_1["default"],
                createEvent_component_1["default"],
                profile_component_1["default"],
                util_module_2["default"]
            ])
                .config(app_config_1.routeConfig)
                .run(function ($rootScope, $location, Auth) {
                'ngInject';
                // Redirect to login if route requires auth and you're not logged in
                $rootScope.$on('$stateChangeStart', function (event, next) {
                    Auth.isLoggedIn(function (loggedIn) {
                        if (next.authenticate && !loggedIn) {
                            $location.path('/login');
                        }
                    });
                });
            });
            angular
                .element(document)
                .ready(function () {
                angular.bootstrap(document, ['runpurposeApp'], {
                    strictDi: true
                });
            });
        }
    };
});
