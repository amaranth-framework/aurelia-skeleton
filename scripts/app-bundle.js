define('app',['exports', 'aurelia-framework', 'aurelia-configuration', 'aurelia-i18n', 'aurelia-api', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaConfiguration, _aureliaI18n, _aureliaApi, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaApi.Config, _aureliaConfiguration.AureliaConfiguration, _aureliaEventAggregator.EventAggregator, _aureliaI18n.I18N), _dec(_class = function () {
        function App(api, config, i18n, events) {
            _classCallCheck(this, App);

            this.config = config;
            this.i18n = i18n;

            this.rest = api.getEndpoint('rest');

            this.configApi = api.getEndpoint('config');
            this.events = events;

            this.logger = _aureliaFramework.LogManager.getLogger('app.js');
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
            config.title = 'Planteaza pentru Romania';
            if (window.location.hostname !== 'localhost' && window.location.port !== 9000) {
                config.options.pushState = true;
            }
            config.mapUnknownRoutes('templates/status/404');
            this.mapRoutes(config);

            this.router = router;
        };

        App.prototype.mapRoutes = function mapRoutes(config) {
            config.map([{
                route: ['', 'home'],
                redirect: 'dashboard'
            }, {
                route: 'dashboard',
                name: 'dashboard',
                moduleId: 'templates/home/home',
                nav: true,
                title: 'Dashboard',
                group: 'left-general'
            }, {
                route: 'forms',
                name: 'forms',
                moduleId: 'templates/forms/forms',
                nav: true,
                title: 'Forms',
                group: 'left-forms' }, {
                route: 'tables',
                name: 'tables',
                moduleId: 'templates/tables/tables',
                nav: true,
                title: 'Tables',
                group: 'left-forms'
            }]);
        };

        App.prototype.mapRoutesFromREST = function mapRoutesFromREST(config) {
            var _this = this;

            this.configApi.find(this.config.get('locale') + '/routes.json').then(function (response) {
                response.forEach(function (route) {
                    route.settings = route.settings || {};
                    route.moduleId = PLATFORM.moduleName(route.moduleId, route.name);
                    _this.router.addRoute(route);
                });

                _this.router.refreshNavigation();

                var REQUEST = _this.requestedRoute(_this.router.routes);

                _this.router.navigateToRoute(REQUEST.route, REQUEST.params, { replace: true });
                _this.site.ready = true;
            });
        };

        App.prototype.requestedRoute = function requestedRoute(routes) {
            var path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').length ? window.location.pathname.replace(/^\//, '').replace(/\/$/, '').split('/') : null;
            var matchedRoute = path ? '404' : 'home';
            var matchedParams = {};
            var isFound = false;

            if (path) {
                routes.forEach(function (r) {
                    var components = r.route.split('/');
                    var isMatch = true;
                    var params = {};

                    if (!isFound) {
                        for (var index in components) {
                            if (components.length !== path.length) {
                                isMatch = false;
                                break;
                            }

                            if (components[index].match(/^\:/) && path[index]) {
                                params[components[index].replace(/^\:/, '')] = path[index];
                                continue;
                            }

                            if (components[index] !== path[index]) {
                                isMatch = false;
                                break;
                            }
                        }

                        if (isMatch) {
                            isFound = true;
                            matchedRoute = r.name;
                            matchedParams = params;
                        }
                    }
                });

                if (window.location.search.length) {
                    window.location.search.slice(1).split('&').map(function (param) {
                        var paramPair = param.split('=');
                        matchedParams[paramPair[0]] = paramPair[1];
                    });
                }
            }

            return { route: matchedRoute, params: matchedParams };
        };

        return App;
    }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', 'aurelia-i18n', 'aurelia-validation', './environment', 'i18next-xhr-backend'], function (exports, _aureliaI18n, _aureliaValidation, _environment, _i18nextXhrBackend) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;

    var _environment2 = _interopRequireDefault(_environment);

    var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function configure(aurelia) {
        aurelia.use.standardConfiguration().feature('resources');

        if (_environment2.default.debug) {
            aurelia.use.developmentLogging();
        }

        if (_environment2.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }

        aurelia.use.plugin('aurelia-animator-css').plugin('aurelia-configuration').plugin('aurelia-validation').plugin('aurelia-api', function (config) {
            config.registerEndpoint('rest', '/ws/', {
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).setDefaultEndpoint('api');
        }).plugin('aurelia-i18n', function (instance) {
            instance.i18next.use(_i18nextXhrBackend2.default);
        });

        aurelia.start().then(function () {
            return aurelia.setRoot();
        });
    }
});
define('features/utils',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.extend = extend;
    exports.className = className;
    exports.parentClassName = parentClassName;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function extend(deep, target) {
        var NULL = [null, 'null'];

        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
        }

        args.forEach(function (object) {
            for (var key in object) {
                if (NULL.includes(object[key])) {
                    target[key] = null;
                    continue;
                }

                if (deep && _typeof(object[key]) === 'object' && !Array.isArray(object[key])) {
                    target[key] = extend(deep, target[key] || {}, object[key]);
                } else {
                    target[key] = object[key];
                }
            }
        });
        return target;
    }

    function className(obj) {
        var isConstructor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var _className = isConstructor ? obj.name : obj.constructor.name;
        if (typeof _className === 'undefined') {
            _className = (isConstructor ? obj : obj.constructor).toString().match(/ ([^ ]+)\(/)[1];
        }
        return _className;
    }

    function parentClassName(obj) {
        var parentClass = Object.getPrototypeOf(obj.constructor);
        if (typeof parentClass === 'undefined') {
            throw new Error('Could not determine parent class name for ' + className(obj) + '. Does it extend any class?');
        }
        return className(parentClass, true);
    }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('components/nav/nav',['exports', 'features/views/component', 'lodash'], function (exports, _component, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ComponentNav = undefined;

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ComponentNav = exports.ComponentNav = function (_Component) {
        _inherits(ComponentNav, _Component);

        function ComponentNav() {
            var _temp, _this, _ret;

            _classCallCheck(this, ComponentNav);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.defaultSettings = {
                style: '',
                styles: {},

                content: {},

                service: {},
                services: {},

                routes: [],
                filter: {}
            }, _this.overrideSettingsKey = 'components.nav', _temp), _possibleConstructorReturn(_this, _ret);
        }

        ComponentNav.prototype.findRoutes = function findRoutes(names) {
            var _this2 = this;

            return names.map(function (name) {
                return _this2.findRoute(name);
            });
        };

        ComponentNav.prototype.findRoute = function findRoute(name) {
            return _lodash2.default.find(this.router.routes, { name: name }) || { name: name };
        };

        _createClass(ComponentNav, [{
            key: 'filteredRoutes',
            get: function get() {
                return _lodash2.default.filter(this.settings.routes.length ? this.settings.routes : this.router.routes, this.settings.filter);
            }
        }, {
            key: 'isNavbarNav',
            get: function get() {
                return this.settings.style && this.settings.style.match(/navbar-nav/);
            }
        }]);

        return ComponentNav;
    }(_component.Component);
});
define('features/views/component',['exports', 'features/views/view'], function (exports, _view) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Component = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Component = exports.Component = function (_View) {
    _inherits(Component, _View);

    function Component() {
      var _temp, _this, _ret;

      _classCallCheck(this, Component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _View.call.apply(_View, [this].concat(args))), _this), _this.defaultSettings = {
        style: '',
        styles: {},

        content: {},

        service: {},
        services: {} }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Component;
  }(_view.View);
});
define('features/views/model',['exports', 'features/views/component'], function (exports, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Model = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Model = exports.Model = function (_Component) {
    _inherits(Model, _Component);

    function Model() {
      _classCallCheck(this, Model);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return Model;
  }(_component.Component);
});
define('features/views/template',['exports', 'features/views/view'], function (exports, _view) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Template = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Template = exports.Template = function (_View) {
        _inherits(Template, _View);

        function Template() {
            var _temp, _this, _ret;

            _classCallCheck(this, Template);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, _View.call.apply(_View, [this].concat(args))), _this), _this.modelDefaultSettings = {
                template: '',

                style: '',
                styles: {},

                content: {},

                service: {},
                services: {} }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        Template.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
            _View.prototype.activate.call(this, params, routeConfig, navigationInstruction);

            this.routeModuleId = this.routeConfig.moduleId;

            var BODY = document.querySelector('body');

            BODY.className.split(' ').forEach(function (name) {
                if (/^page-/.test(name)) {
                    document.querySelector('body').className = BODY.className.replace(name, '').trim();
                }
            });

            if (this.settings && this.settings.style) {
                this.settings.style.split(' ').forEach(function (name) {
                    document.querySelector('body').className += ' page-' + name;
                });
            }
        };

        Template.prototype.determineActivationStrategy = function determineActivationStrategy() {
            return 'replace';
        };

        Template.prototype.getViewStrategy = function getViewStrategy() {
            this.logger.debug('getViewStrategy', this.routeModuleId, this.settings.template);
            return (!this.settings || !this.settings.template || typeof this.settings.template !== 'string' ? this.routeModuleId : this.settings.template) + '.html';
        };

        return Template;
    }(_view.View);
});
define('features/views/view',['exports', 'aurelia-configuration', 'aurelia-api', 'aurelia-event-aggregator', 'aurelia-framework', 'aurelia-i18n', 'aurelia-router', 'uuid-js', 'features/utils'], function (exports, _aureliaConfiguration, _aureliaApi, _aureliaEventAggregator, _aureliaFramework, _aureliaI18n, _aureliaRouter, _uuidJs, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.View = undefined;

  var _uuidJs2 = _interopRequireDefault(_uuidJs);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var View = exports.View = (_dec = (0, _aureliaFramework.inject)(_aureliaApi.Config, _aureliaConfiguration.AureliaConfiguration, _aureliaEventAggregator.EventAggregator, _aureliaI18n.I18N, _aureliaRouter.Router), _dec(_class = function () {
    function View(api, config, events, i18n, router) {
      _classCallCheck(this, View);

      this.rest = api.getEndpoint('rest');

      this.configApi = api.getEndpoint('config');
      if (i18n) {
        this.i18n = i18n;
      }
      this.config = config;
      this.events = events;
      this.router = router;

      this.__uuid = _uuidJs2.default.create(4);

      this.logger = _aureliaFramework.LogManager.getLogger((0, _utils.parentClassName)(this) + '/' + (0, _utils.className)(this));
    }

    View.prototype.activate = function activate() {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length === 1) {
        var model = args.shift();

        for (var p in model) {
          this[p] = model[p];
        }
      }

      if (args.length > 1) {
        this.params = args.shift();

        this.routeConfig = args.shift();

        this.navigationInstruction = args.shift();

        this.settings = this.routeConfig ? this.routeConfig.settings : {};
      }

      this.mergeSettings();

      this.events.subscribeOnce('session:ready', function (result) {
        return !_this.initialized ? _this.init() : false;
      });

      if (!this.initialized) {
        this.init();
      }
    };

    View.prototype.bind = function bind(bindingContext, overrideContext) {
      this.parent = overrideContext.parentOverrideContext.bindingContext;
    };

    View.prototype.init = function init() {};

    View.prototype.mergeSettings = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var defaultSettings;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.settings = this.settings || {};

                if (!this.defaultSettings) {
                  _context.next = 18;
                  break;
                }

                defaultSettings = (0, _utils.extend)(true, this.modelDefaultSettings || {}, this.defaultSettings || {});

                delete this.modelDefaultSettings;
                _context.t0 = _utils.extend;
                _context.t1 = {};
                _context.t2 = defaultSettings;
                _context.t3 = this.overrideSettings;
                _context.t4 = this.settings;

                if (!(this.settings && this.settings._settingsPath)) {
                  _context.next = 15;
                  break;
                }

                _context.next = 12;
                return this.configApi.get(this.settings._settingsPath + '.json');

              case 12:
                _context.t5 = _context.sent;
                _context.next = 16;
                break;

              case 15:
                _context.t5 = {};

              case 16:
                _context.t6 = _context.t5;
                this.settings = (0, _context.t0)(true, _context.t1, _context.t2, _context.t3, _context.t4, _context.t6);

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function mergeSettings() {
        return _ref.apply(this, arguments);
      }

      return mergeSettings;
    }();

    View.prototype.toString = function toString() {
      return 'view@' + this.__uuid;
    };

    _createClass(View, [{
      key: 'overrideSettings',
      get: function get() {
        if (!this.overrideSettingsKey || this.overrideSettingsKey.length === 0) {
          throw new Error('Class \'' + (0, _utils.className)(this) + '\' has no \'overrideSettings\' defined.');
        }
        if (!this._overrideSettings) {
          this._overrideSettings = this.config.get(this.overrideSettingsKey) || {};
        }

        return this._overrideSettings;
      }
    }, {
      key: 'style',
      get: function get() {
        return (this.settings.style || '') + ' ' + (this.settings.layout || '');
      }
    }]);

    return View;
  }()) || _class);
});
define('models/user/user',['exports', 'features/views/model'], function (exports, _model) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.User = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var User = exports.User = function (_Model) {
    _inherits(User, _Model);

    function User() {
      var _temp, _this, _ret;

      _classCallCheck(this, User);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Model.call.apply(_Model, [this].concat(args))), _this), _this.defaultSettings = {
        style: '',
        styles: {},

        content: {},

        service: {},
        services: {} }, _this.overrideSettingsKey = 'models.user', _this.name = 'John Doe', _this.email = 'john@doe.com', _this.image = 'https://scontent.fotp3-3.fna.fbcdn.net/v/t1.0-1/p160x160/18740252_1314787368636643_6264909807224683_n.jpg?oh=159ffc5fe2c448015e79974826077374&oe=59C7445D', _temp), _possibleConstructorReturn(_this, _ret);
    }

    return User;
  }(_model.Model);
});
define('templates/home/home',['exports', 'features/views/template'], function (exports, _template) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Home = exports.Home = function (_Template) {
    _inherits(Home, _Template);

    function Home() {
      _classCallCheck(this, Home);

      return _possibleConstructorReturn(this, _Template.apply(this, arguments));
    }

    return Home;
  }(_template.Template);
});
define('templates/status/404',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Error404 = exports.Error404 = function Error404() {
        _classCallCheck(this, Error404);
    };
});
define('templates/tables/tables',['exports', 'features/views/template'], function (exports, _template) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TemplateTables = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var TemplateTables = exports.TemplateTables = function (_Template) {
		_inherits(TemplateTables, _Template);

		function TemplateTables() {
			var _temp, _this, _ret;

			_classCallCheck(this, TemplateTables);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Template.call.apply(_Template, [this].concat(args))), _this), _this.modelDefaultSettings = {
				template: '',

				style: '',
				styles: {},

				content: {},

				service: {},
				services: {} }, _this.overrideSettingsKey = 'templates.tables', _temp), _possibleConstructorReturn(_this, _ret);
		}

		return TemplateTables;
	}(_template.Template);
});
define('components/demo/table/simple',['exports', 'components/helper/table/table'], function (exports, _table) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ComponentTableDemoSimple = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var ComponentTableDemoSimple = exports.ComponentTableDemoSimple = function (_ComponentHelperTable) {
		_inherits(ComponentTableDemoSimple, _ComponentHelperTable);

		function ComponentTableDemoSimple() {
			var _temp, _this, _ret;

			_classCallCheck(this, ComponentTableDemoSimple);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, _ComponentHelperTable.call.apply(_ComponentHelperTable, [this].concat(args))), _this), _this.defaultSettings = {
				style: '',
				styles: {},

				content: {},

				service: 'general.json',
				services: {} }, _this.overrideSettingsKey = 'components.table-demo-simple', _temp), _possibleConstructorReturn(_this, _ret);
		}

		ComponentTableDemoSimple.prototype.init = function init() {
			var _this2 = this;

			_ComponentHelperTable.prototype.init.call(this);
			this.logger.debug('View service: ', this.settings.service);
			this.setTableLoading();
			setTimeout(function () {
				if (_this2.settings.service && (typeof _this2.settings.service === 'string' || _this2.settings.service.endpoint !== undefined)) {
					var args = [typeof _this2.settings.service === 'string' ? _this2.settings.service : _this2.settings.service.endpoint, typeof _this2.settings.service === 'string' ? {} : _this2.settings.service.params];
					_this2.logger.debug('Calling service: ', _this2.settings.service.method || 'find', args);
					_this2.rest.find.apply(_this2.rest, args).then(function (result) {
						_this2.logger.debug('service result', result);
						_this2.thead = ['#', 'Name', 'Age', 'Email', 'Company', 'Balance'];
						_this2.tbody = result.map(function (_, i) {
							return [_.index, _.name.first + ' ' + _.name.last, _.age, _.email, _.company, _.balance];
						});
						_this2.setTableLoaded();
						_this2.logger.debug('thead', _this2.thead);
						_this2.logger.debug('tbody', _this2.tbody);
					}).catch(function (error) {
						return _this2.logger.warn('service failed', error);
					});
				}
			}, 1000);
		};

		return ComponentTableDemoSimple;
	}(_table.ComponentHelperTable);
});
define('components/helper/content/content',['exports', 'features/views/component', 'aurelia-framework'], function (exports, _component, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ComponentHelperContent = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var _dec, _class;

  var ComponentHelperContent = exports.ComponentHelperContent = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Loader), _dec(_class = function (_Component) {
    _inherits(ComponentHelperContent, _Component);

    function ComponentHelperContent(loader) {
      _classCallCheck(this, ComponentHelperContent);

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

      _this.defaultSettings = {
        layout: '',
        styles: {
          inner: ''
        }
      };
      _this.overrideSettingsKey = 'components.helper-content';


      _this.loader = loader;
      return _this;
    }

    return ComponentHelperContent;
  }(_component.Component)) || _class);
});
define('components/helper/logo/logo',['exports', 'features/views/component'], function (exports, _component) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ComponentHelperLogo = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ComponentHelperLogo = exports.ComponentHelperLogo = function (_Component) {
        _inherits(ComponentHelperLogo, _Component);

        function ComponentHelperLogo() {
            var _temp, _this, _ret;

            _classCallCheck(this, ComponentHelperLogo);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.defaultSettings = {
                style: '',
                styles: {},

                content: {},

                service: {},
                services: {} }, _this.overrideSettingsKey = 'components.helper-logo', _temp), _possibleConstructorReturn(_this, _ret);
        }

        return ComponentHelperLogo;
    }(_component.Component);
});
define('components/helper/table/table',['exports', 'features/views/component', 'chance'], function (exports, _component, _chance) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ComponentHelperTable = undefined;

  var _chance2 = _interopRequireDefault(_chance);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var ComponentHelperTable = exports.ComponentHelperTable = function (_Component) {
    _inherits(ComponentHelperTable, _Component);

    function ComponentHelperTable() {
      _classCallCheck(this, ComponentHelperTable);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

      _this.defaultSettings = {
        style: '',
        styles: {},

        content: {},

        service: {},
        services: {} };
      _this.overrideSettingsKey = 'components.helper-table';


      if (_this.buildRandom) {
        _this.buildRandom();
      } else {
        var chance = new _chance2.default();
        var random = Math.trunc(Math.random() * 1000) % 10 + 1;
        _this.thead = ['#'].concat(Array(random).fill().map(function (_, i) {
          return chance.string({ length: 5 });
        }));
        _this.tbody = Array(random).fill().map(function (_, i) {
          return [i].concat(Array(random).fill().map(function (_, i) {
            return chance.string({ length: 5 });
          }));
        });
      }
      return _this;
    }

    ComponentHelperTable.prototype.setTableLoading = function setTableLoading() {
      this.logger.debug('table-id', this.__uuid.toString(), $('#table-' + this.__uuid));
      $('#table-' + this.__uuid).addClass('table--loading');
    };

    ComponentHelperTable.prototype.setTableLoaded = function setTableLoaded() {
      var _this2 = this;

      setTimeout(function () {
        _this2.logger.debug('table-id', _this2.__uuid.toString(), $('#table-' + _this2.__uuid));
        $('#table-' + _this2.__uuid).removeClass('table--loading');
      }, 500);
    };

    ComponentHelperTable.prototype.exportToCSV = function exportToCSV() {
      var csv = [this.thead.join(',')];
      this.tbody.forEach(function (row, i) {
        return csv.push(row.join(','));
      });
      csv = csv.join('\n');
      this.logger.debug('table-csv-gernerate', csv);
      window.location.href = 'data:text/csv;charset=UTF-8,' + csv;
    };

    return ComponentHelperTable;
  }(_component.Component);
});
define('components/nav/left/left',['exports', 'components/helper/content/content', 'jquery'], function (exports, _content) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ComponentNavLeft = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ComponentNavLeft = exports.ComponentNavLeft = function (_ComponentHelperConte) {
        _inherits(ComponentNavLeft, _ComponentHelperConte);

        function ComponentNavLeft() {
            var _temp, _this, _ret;

            _classCallCheck(this, ComponentNavLeft);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, _ComponentHelperConte.call.apply(_ComponentHelperConte, [this].concat(args))), _this), _this.defaultSettings = {
                style: '',
                styles: {},

                content: {},

                service: {},
                services: {},

                toggle: true,

                components: [{
                    type: 'left-logo',
                    module: 'components/helper/logo/logo'
                }, {
                    type: 'left-profile',
                    module: 'models/user/user',
                    view: 'models/user/left-profile.html'
                }, {
                    type: 'left-nav',
                    module: 'components/nav/nav',
                    settings: {
                        content: {
                            title: 'General'
                        },
                        filter: { group: 'left-general', nav: true }
                    }
                }, {
                    type: 'left-nav',
                    module: 'components/nav/nav',
                    settings: {
                        content: {
                            title: 'Forms, Tables & Widgets'
                        },
                        filter: { group: 'left-forms', nav: true }
                    }
                }]
            }, _this.overrideSettingsKey = 'components.nav-left', _temp), _possibleConstructorReturn(_this, _ret);
        }

        ComponentNavLeft.prototype.init = function init() {
            _ComponentHelperConte.prototype.init.call(this);

            if (this.settings.toggle) {
                this.settings.components.push({
                    type: 'left-toggle',
                    module: 'components/nav/toggle/toggle'
                });
            }

            this.logger.debug('left-nav', this.settings);
        };

        ComponentNavLeft.prototype.attached = function attached() {
            var _this2 = this;

            this.toggleEvent = this.events.subscribe('nav-left:toggle', function () {
                return _this2.toggle();
            });

            var toggleTimeout = null;
            $('nav-left').on('mouseover', function () {
                $('nav-left .component--left-toggle').addClass('toggle');
                clearTimeout(toggleTimeout);
                toggleTimeout = setTimeout(function () {
                    return $('nav-left .component--left-toggle').removeClass('toggle');
                }, 3000);
            });
        };

        ComponentNavLeft.prototype.detached = function detached() {
            this.toggleEvent.dispose();
        };

        return ComponentNavLeft;
    }(_content.ComponentHelperContent);
});
define('components/nav/toggle/toggle',['exports', 'features/views/component'], function (exports, _component) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ComponentNavToggle = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ComponentNavToggle = exports.ComponentNavToggle = function (_Component) {
        _inherits(ComponentNavToggle, _Component);

        function ComponentNavToggle() {
            var _temp, _this, _ret;

            _classCallCheck(this, ComponentNavToggle);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.defaultSettings = {
                style: '',
                styles: {},

                content: {},

                service: {},
                services: {},

                routes: [],
                filter: {}
            }, _this.overrideSettingsKey = 'components.nav-toggle', _temp), _possibleConstructorReturn(_this, _ret);
        }

        return ComponentNavToggle;
    }(_component.Component);
});
define('components/nav/top/top',['exports', 'components/helper/content/content'], function (exports, _content) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ComponentNavTop = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ComponentNavTop = exports.ComponentNavTop = function (_ComponentHelperConte) {
        _inherits(ComponentNavTop, _ComponentHelperConte);

        function ComponentNavTop() {
            var _temp, _this, _ret;

            _classCallCheck(this, ComponentNavTop);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, _ComponentHelperConte.call.apply(_ComponentHelperConte, [this].concat(args))), _this), _this.defaultSettings = {
                style: '',
                styles: {},

                content: {},

                service: {},
                services: {},

                components: [{
                    type: 'navbar-nav-left',
                    module: 'components/nav/nav',
                    settings: {
                        style: 'navbar-nav'
                    }
                }, {
                    type: 'top-user',
                    module: 'components/nav/top/user/user',
                    settings: {
                        style: 'navbar-nav'
                    }
                }, {
                    type: 'top-inbox',
                    module: 'components/nav/top/inbox/inbox'
                }],

                navbar: {
                    style: 'navbar-nav'
                }
            }, _this.overrideSettingsKey = 'components.nav-top', _temp), _possibleConstructorReturn(_this, _ret);
        }

        ComponentNavTop.prototype.toggleLeftNav = function toggleLeftNav() {};

        return ComponentNavTop;
    }(_content.ComponentHelperContent);
});
define('components/nav/top/inbox/inbox',['exports', 'features/views/component'], function (exports, _component) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ComponentNavTopInbox = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ComponentNavTopInbox = exports.ComponentNavTopInbox = function (_Component) {
        _inherits(ComponentNavTopInbox, _Component);

        function ComponentNavTopInbox() {
            var _temp, _this, _ret;

            _classCallCheck(this, ComponentNavTopInbox);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.defaultSettings = {
                style: '',
                styles: {},

                content: {},

                service: {},
                services: {} }, _this.overrideSettingsKey = 'components.nav-top-inbox', _temp), _possibleConstructorReturn(_this, _ret);
        }

        return ComponentNavTopInbox;
    }(_component.Component);
});
define('components/nav/top/user/user',['exports', 'features/views/component'], function (exports, _component) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ComponentNavTopUser = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ComponentNavTopUser = exports.ComponentNavTopUser = function (_Component) {
        _inherits(ComponentNavTopUser, _Component);

        function ComponentNavTopUser() {
            var _temp, _this, _ret;

            _classCallCheck(this, ComponentNavTopUser);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.defaultSettings = {
                style: '',
                styles: {},

                content: {},

                service: {},
                services: {} }, _this.overrideSettingsKey = 'components.nav-top-user', _temp), _possibleConstructorReturn(_this, _ret);
        }

        return ComponentNavTopUser;
    }(_component.Component);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.min.css\"></require><require from=\"app.css\"></require><nav-left><compose containerless view-model=\"components/nav/left/left\"></compose></nav-left><content><nav-top><compose containerless view-model=\"components/nav/top/top\"></compose></nav-top><main-app><router-view></router-view></main-app><footer></footer></content></template>"; });
define('text!components/nav/nav.html', ['module'], function(module) { module.exports = "<template><ul if.bind=\"filteredRoutes.length\" class=\"nav\" class.bind=\"style\"><li repeat.for=\"route of filteredRoutes\"><a if.bind=\"!isNavbarNav\" click.trigger=\"router.navigateToRoute(route.name, route.params || {})\" href=\"#\">${route.title}</a> <a if.bind=\"isNavbarNav\" click.trigger=\"router.navigateToRoute(route.name, route.params || {})\" href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">${route.title} <span if.bind=\"route.routes && route.routes.length\" class=\"caret\"></span></a><ul if.bind=\"route.routes && route.routes.length\" class.bind=\"isNavbarNav ? 'dropdown-menu' : 'nav'\"><li repeat.for=\"subroute of findRoutes(route.routes || [])\"><a if.bind=\"!isNavbarNav\" click.trigger=\"router.navigateToRoute(subroute.name, subroute.params || {})\" href=\"#\">${subroute.title}</a> <a if.bind=\"isNavbarNav\" click.trigger=\"router.navigateToRoute(subroute.name, subroute.params || {})\" href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">${subroute.title} <span if.bind=\"subroute.routes && subroute.routes.length\" class=\"caret\"></span></a><ul if.bind=\"subroute.routes && subroute.routes.length\" class.bind=\"isNavbarNav ? 'dropdown-menu' : 'nav'\"><li repeat.for=\"subsubroute of findRoutes(subroute.routes || [])\"><a href=\"#\" click.trigger=\"router.navigateToRoute(subsubroute.name, subsubroute.params || {})\">${subsubroute.title}</a></li></ul></li></ul></li></ul></template>"; });
define('text!models/user/left-profile.html', ['module'], function(module) { module.exports = "<template><require from=\"./left-profile.css\"></require><div class=\"left-nav__profile clearfix\"><div class=\"left-nav__profile-pic\"><img src.bind=\"image || 'images/img.jpg'\" alt=\"...\" class=\"img-circle profile_img\"></div><div class=\"left-nav__profile-info\"><span>Welcome,</span><h2>${name}</h2></div></div></template>"; });
define('text!models/user/top-nav.html', ['module'], function(module) { module.exports = "<template><a href=\"javascript:;\" href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"><img src.bind=\"image || 'images/img.jpg'\" alt=\"\"> ${name} <span class=\"caret\"></span></a></template>"; });
define('text!app.css', ['module'], function(module) { module.exports = "/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */\n/* FONT PATH\n * -------------------------- */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url('../fonts/fontawesome-webfont.eot?v=4.7.0');\n  src: url('../fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('../fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('../fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), url('../fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('../fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n.fa {\n  display: inline-block;\n  font: normal normal normal 14px/1 FontAwesome;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n/* makes the font 33% larger relative to the icon container */\n.fa-lg {\n  font-size: 1.33333333em;\n  line-height: 0.75em;\n  vertical-align: -15%;\n}\n.fa-2x {\n  font-size: 2em;\n}\n.fa-3x {\n  font-size: 3em;\n}\n.fa-4x {\n  font-size: 4em;\n}\n.fa-5x {\n  font-size: 5em;\n}\n.fa-fw {\n  width: 1.28571429em;\n  text-align: center;\n}\n.fa-ul {\n  padding-left: 0;\n  margin-left: 2.14285714em;\n  list-style-type: none;\n}\n.fa-ul > li {\n  position: relative;\n}\n.fa-li {\n  position: absolute;\n  left: -2.14285714em;\n  width: 2.14285714em;\n  top: 0.14285714em;\n  text-align: center;\n}\n.fa-li.fa-lg {\n  left: -1.85714286em;\n}\n.fa-border {\n  padding: .2em .25em .15em;\n  border: solid 0.08em #eee;\n  border-radius: .1em;\n}\n.fa-pull-left {\n  float: left;\n}\n.fa-pull-right {\n  float: right;\n}\n.fa.fa-pull-left {\n  margin-right: .3em;\n}\n.fa.fa-pull-right {\n  margin-left: .3em;\n}\n/* Deprecated as of 4.4.0 */\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n.fa.pull-left {\n  margin-right: .3em;\n}\n.fa.pull-right {\n  margin-left: .3em;\n}\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8);\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n  -ms-transform: scale(-1, 1);\n  transform: scale(-1, 1);\n}\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n  -ms-transform: scale(1, -1);\n  transform: scale(1, -1);\n}\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  filter: none;\n}\n.fa-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle;\n}\n.fa-stack-1x,\n.fa-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n.fa-stack-1x {\n  line-height: inherit;\n}\n.fa-stack-2x {\n  font-size: 2em;\n}\n.fa-inverse {\n  color: #fff;\n}\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n.fa-glass:before {\n  content: \"\\f000\";\n}\n.fa-music:before {\n  content: \"\\f001\";\n}\n.fa-search:before {\n  content: \"\\f002\";\n}\n.fa-envelope-o:before {\n  content: \"\\f003\";\n}\n.fa-heart:before {\n  content: \"\\f004\";\n}\n.fa-star:before {\n  content: \"\\f005\";\n}\n.fa-star-o:before {\n  content: \"\\f006\";\n}\n.fa-user:before {\n  content: \"\\f007\";\n}\n.fa-film:before {\n  content: \"\\f008\";\n}\n.fa-th-large:before {\n  content: \"\\f009\";\n}\n.fa-th:before {\n  content: \"\\f00a\";\n}\n.fa-th-list:before {\n  content: \"\\f00b\";\n}\n.fa-check:before {\n  content: \"\\f00c\";\n}\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: \"\\f00d\";\n}\n.fa-search-plus:before {\n  content: \"\\f00e\";\n}\n.fa-search-minus:before {\n  content: \"\\f010\";\n}\n.fa-power-off:before {\n  content: \"\\f011\";\n}\n.fa-signal:before {\n  content: \"\\f012\";\n}\n.fa-gear:before,\n.fa-cog:before {\n  content: \"\\f013\";\n}\n.fa-trash-o:before {\n  content: \"\\f014\";\n}\n.fa-home:before {\n  content: \"\\f015\";\n}\n.fa-file-o:before {\n  content: \"\\f016\";\n}\n.fa-clock-o:before {\n  content: \"\\f017\";\n}\n.fa-road:before {\n  content: \"\\f018\";\n}\n.fa-download:before {\n  content: \"\\f019\";\n}\n.fa-arrow-circle-o-down:before {\n  content: \"\\f01a\";\n}\n.fa-arrow-circle-o-up:before {\n  content: \"\\f01b\";\n}\n.fa-inbox:before {\n  content: \"\\f01c\";\n}\n.fa-play-circle-o:before {\n  content: \"\\f01d\";\n}\n.fa-rotate-right:before,\n.fa-repeat:before {\n  content: \"\\f01e\";\n}\n.fa-refresh:before {\n  content: \"\\f021\";\n}\n.fa-list-alt:before {\n  content: \"\\f022\";\n}\n.fa-lock:before {\n  content: \"\\f023\";\n}\n.fa-flag:before {\n  content: \"\\f024\";\n}\n.fa-headphones:before {\n  content: \"\\f025\";\n}\n.fa-volume-off:before {\n  content: \"\\f026\";\n}\n.fa-volume-down:before {\n  content: \"\\f027\";\n}\n.fa-volume-up:before {\n  content: \"\\f028\";\n}\n.fa-qrcode:before {\n  content: \"\\f029\";\n}\n.fa-barcode:before {\n  content: \"\\f02a\";\n}\n.fa-tag:before {\n  content: \"\\f02b\";\n}\n.fa-tags:before {\n  content: \"\\f02c\";\n}\n.fa-book:before {\n  content: \"\\f02d\";\n}\n.fa-bookmark:before {\n  content: \"\\f02e\";\n}\n.fa-print:before {\n  content: \"\\f02f\";\n}\n.fa-camera:before {\n  content: \"\\f030\";\n}\n.fa-font:before {\n  content: \"\\f031\";\n}\n.fa-bold:before {\n  content: \"\\f032\";\n}\n.fa-italic:before {\n  content: \"\\f033\";\n}\n.fa-text-height:before {\n  content: \"\\f034\";\n}\n.fa-text-width:before {\n  content: \"\\f035\";\n}\n.fa-align-left:before {\n  content: \"\\f036\";\n}\n.fa-align-center:before {\n  content: \"\\f037\";\n}\n.fa-align-right:before {\n  content: \"\\f038\";\n}\n.fa-align-justify:before {\n  content: \"\\f039\";\n}\n.fa-list:before {\n  content: \"\\f03a\";\n}\n.fa-dedent:before,\n.fa-outdent:before {\n  content: \"\\f03b\";\n}\n.fa-indent:before {\n  content: \"\\f03c\";\n}\n.fa-video-camera:before {\n  content: \"\\f03d\";\n}\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n  content: \"\\f03e\";\n}\n.fa-pencil:before {\n  content: \"\\f040\";\n}\n.fa-map-marker:before {\n  content: \"\\f041\";\n}\n.fa-adjust:before {\n  content: \"\\f042\";\n}\n.fa-tint:before {\n  content: \"\\f043\";\n}\n.fa-edit:before,\n.fa-pencil-square-o:before {\n  content: \"\\f044\";\n}\n.fa-share-square-o:before {\n  content: \"\\f045\";\n}\n.fa-check-square-o:before {\n  content: \"\\f046\";\n}\n.fa-arrows:before {\n  content: \"\\f047\";\n}\n.fa-step-backward:before {\n  content: \"\\f048\";\n}\n.fa-fast-backward:before {\n  content: \"\\f049\";\n}\n.fa-backward:before {\n  content: \"\\f04a\";\n}\n.fa-play:before {\n  content: \"\\f04b\";\n}\n.fa-pause:before {\n  content: \"\\f04c\";\n}\n.fa-stop:before {\n  content: \"\\f04d\";\n}\n.fa-forward:before {\n  content: \"\\f04e\";\n}\n.fa-fast-forward:before {\n  content: \"\\f050\";\n}\n.fa-step-forward:before {\n  content: \"\\f051\";\n}\n.fa-eject:before {\n  content: \"\\f052\";\n}\n.fa-chevron-left:before {\n  content: \"\\f053\";\n}\n.fa-chevron-right:before {\n  content: \"\\f054\";\n}\n.fa-plus-circle:before {\n  content: \"\\f055\";\n}\n.fa-minus-circle:before {\n  content: \"\\f056\";\n}\n.fa-times-circle:before {\n  content: \"\\f057\";\n}\n.fa-check-circle:before {\n  content: \"\\f058\";\n}\n.fa-question-circle:before {\n  content: \"\\f059\";\n}\n.fa-info-circle:before {\n  content: \"\\f05a\";\n}\n.fa-crosshairs:before {\n  content: \"\\f05b\";\n}\n.fa-times-circle-o:before {\n  content: \"\\f05c\";\n}\n.fa-check-circle-o:before {\n  content: \"\\f05d\";\n}\n.fa-ban:before {\n  content: \"\\f05e\";\n}\n.fa-arrow-left:before {\n  content: \"\\f060\";\n}\n.fa-arrow-right:before {\n  content: \"\\f061\";\n}\n.fa-arrow-up:before {\n  content: \"\\f062\";\n}\n.fa-arrow-down:before {\n  content: \"\\f063\";\n}\n.fa-mail-forward:before,\n.fa-share:before {\n  content: \"\\f064\";\n}\n.fa-expand:before {\n  content: \"\\f065\";\n}\n.fa-compress:before {\n  content: \"\\f066\";\n}\n.fa-plus:before {\n  content: \"\\f067\";\n}\n.fa-minus:before {\n  content: \"\\f068\";\n}\n.fa-asterisk:before {\n  content: \"\\f069\";\n}\n.fa-exclamation-circle:before {\n  content: \"\\f06a\";\n}\n.fa-gift:before {\n  content: \"\\f06b\";\n}\n.fa-leaf:before {\n  content: \"\\f06c\";\n}\n.fa-fire:before {\n  content: \"\\f06d\";\n}\n.fa-eye:before {\n  content: \"\\f06e\";\n}\n.fa-eye-slash:before {\n  content: \"\\f070\";\n}\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n  content: \"\\f071\";\n}\n.fa-plane:before {\n  content: \"\\f072\";\n}\n.fa-calendar:before {\n  content: \"\\f073\";\n}\n.fa-random:before {\n  content: \"\\f074\";\n}\n.fa-comment:before {\n  content: \"\\f075\";\n}\n.fa-magnet:before {\n  content: \"\\f076\";\n}\n.fa-chevron-up:before {\n  content: \"\\f077\";\n}\n.fa-chevron-down:before {\n  content: \"\\f078\";\n}\n.fa-retweet:before {\n  content: \"\\f079\";\n}\n.fa-shopping-cart:before {\n  content: \"\\f07a\";\n}\n.fa-folder:before {\n  content: \"\\f07b\";\n}\n.fa-folder-open:before {\n  content: \"\\f07c\";\n}\n.fa-arrows-v:before {\n  content: \"\\f07d\";\n}\n.fa-arrows-h:before {\n  content: \"\\f07e\";\n}\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n  content: \"\\f080\";\n}\n.fa-twitter-square:before {\n  content: \"\\f081\";\n}\n.fa-facebook-square:before {\n  content: \"\\f082\";\n}\n.fa-camera-retro:before {\n  content: \"\\f083\";\n}\n.fa-key:before {\n  content: \"\\f084\";\n}\n.fa-gears:before,\n.fa-cogs:before {\n  content: \"\\f085\";\n}\n.fa-comments:before {\n  content: \"\\f086\";\n}\n.fa-thumbs-o-up:before {\n  content: \"\\f087\";\n}\n.fa-thumbs-o-down:before {\n  content: \"\\f088\";\n}\n.fa-star-half:before {\n  content: \"\\f089\";\n}\n.fa-heart-o:before {\n  content: \"\\f08a\";\n}\n.fa-sign-out:before {\n  content: \"\\f08b\";\n}\n.fa-linkedin-square:before {\n  content: \"\\f08c\";\n}\n.fa-thumb-tack:before {\n  content: \"\\f08d\";\n}\n.fa-external-link:before {\n  content: \"\\f08e\";\n}\n.fa-sign-in:before {\n  content: \"\\f090\";\n}\n.fa-trophy:before {\n  content: \"\\f091\";\n}\n.fa-github-square:before {\n  content: \"\\f092\";\n}\n.fa-upload:before {\n  content: \"\\f093\";\n}\n.fa-lemon-o:before {\n  content: \"\\f094\";\n}\n.fa-phone:before {\n  content: \"\\f095\";\n}\n.fa-square-o:before {\n  content: \"\\f096\";\n}\n.fa-bookmark-o:before {\n  content: \"\\f097\";\n}\n.fa-phone-square:before {\n  content: \"\\f098\";\n}\n.fa-twitter:before {\n  content: \"\\f099\";\n}\n.fa-facebook-f:before,\n.fa-facebook:before {\n  content: \"\\f09a\";\n}\n.fa-github:before {\n  content: \"\\f09b\";\n}\n.fa-unlock:before {\n  content: \"\\f09c\";\n}\n.fa-credit-card:before {\n  content: \"\\f09d\";\n}\n.fa-feed:before,\n.fa-rss:before {\n  content: \"\\f09e\";\n}\n.fa-hdd-o:before {\n  content: \"\\f0a0\";\n}\n.fa-bullhorn:before {\n  content: \"\\f0a1\";\n}\n.fa-bell:before {\n  content: \"\\f0f3\";\n}\n.fa-certificate:before {\n  content: \"\\f0a3\";\n}\n.fa-hand-o-right:before {\n  content: \"\\f0a4\";\n}\n.fa-hand-o-left:before {\n  content: \"\\f0a5\";\n}\n.fa-hand-o-up:before {\n  content: \"\\f0a6\";\n}\n.fa-hand-o-down:before {\n  content: \"\\f0a7\";\n}\n.fa-arrow-circle-left:before {\n  content: \"\\f0a8\";\n}\n.fa-arrow-circle-right:before {\n  content: \"\\f0a9\";\n}\n.fa-arrow-circle-up:before {\n  content: \"\\f0aa\";\n}\n.fa-arrow-circle-down:before {\n  content: \"\\f0ab\";\n}\n.fa-globe:before {\n  content: \"\\f0ac\";\n}\n.fa-wrench:before {\n  content: \"\\f0ad\";\n}\n.fa-tasks:before {\n  content: \"\\f0ae\";\n}\n.fa-filter:before {\n  content: \"\\f0b0\";\n}\n.fa-briefcase:before {\n  content: \"\\f0b1\";\n}\n.fa-arrows-alt:before {\n  content: \"\\f0b2\";\n}\n.fa-group:before,\n.fa-users:before {\n  content: \"\\f0c0\";\n}\n.fa-chain:before,\n.fa-link:before {\n  content: \"\\f0c1\";\n}\n.fa-cloud:before {\n  content: \"\\f0c2\";\n}\n.fa-flask:before {\n  content: \"\\f0c3\";\n}\n.fa-cut:before,\n.fa-scissors:before {\n  content: \"\\f0c4\";\n}\n.fa-copy:before,\n.fa-files-o:before {\n  content: \"\\f0c5\";\n}\n.fa-paperclip:before {\n  content: \"\\f0c6\";\n}\n.fa-save:before,\n.fa-floppy-o:before {\n  content: \"\\f0c7\";\n}\n.fa-square:before {\n  content: \"\\f0c8\";\n}\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n  content: \"\\f0c9\";\n}\n.fa-list-ul:before {\n  content: \"\\f0ca\";\n}\n.fa-list-ol:before {\n  content: \"\\f0cb\";\n}\n.fa-strikethrough:before {\n  content: \"\\f0cc\";\n}\n.fa-underline:before {\n  content: \"\\f0cd\";\n}\n.fa-table:before {\n  content: \"\\f0ce\";\n}\n.fa-magic:before {\n  content: \"\\f0d0\";\n}\n.fa-truck:before {\n  content: \"\\f0d1\";\n}\n.fa-pinterest:before {\n  content: \"\\f0d2\";\n}\n.fa-pinterest-square:before {\n  content: \"\\f0d3\";\n}\n.fa-google-plus-square:before {\n  content: \"\\f0d4\";\n}\n.fa-google-plus:before {\n  content: \"\\f0d5\";\n}\n.fa-money:before {\n  content: \"\\f0d6\";\n}\n.fa-caret-down:before {\n  content: \"\\f0d7\";\n}\n.fa-caret-up:before {\n  content: \"\\f0d8\";\n}\n.fa-caret-left:before {\n  content: \"\\f0d9\";\n}\n.fa-caret-right:before {\n  content: \"\\f0da\";\n}\n.fa-columns:before {\n  content: \"\\f0db\";\n}\n.fa-unsorted:before,\n.fa-sort:before {\n  content: \"\\f0dc\";\n}\n.fa-sort-down:before,\n.fa-sort-desc:before {\n  content: \"\\f0dd\";\n}\n.fa-sort-up:before,\n.fa-sort-asc:before {\n  content: \"\\f0de\";\n}\n.fa-envelope:before {\n  content: \"\\f0e0\";\n}\n.fa-linkedin:before {\n  content: \"\\f0e1\";\n}\n.fa-rotate-left:before,\n.fa-undo:before {\n  content: \"\\f0e2\";\n}\n.fa-legal:before,\n.fa-gavel:before {\n  content: \"\\f0e3\";\n}\n.fa-dashboard:before,\n.fa-tachometer:before {\n  content: \"\\f0e4\";\n}\n.fa-comment-o:before {\n  content: \"\\f0e5\";\n}\n.fa-comments-o:before {\n  content: \"\\f0e6\";\n}\n.fa-flash:before,\n.fa-bolt:before {\n  content: \"\\f0e7\";\n}\n.fa-sitemap:before {\n  content: \"\\f0e8\";\n}\n.fa-umbrella:before {\n  content: \"\\f0e9\";\n}\n.fa-paste:before,\n.fa-clipboard:before {\n  content: \"\\f0ea\";\n}\n.fa-lightbulb-o:before {\n  content: \"\\f0eb\";\n}\n.fa-exchange:before {\n  content: \"\\f0ec\";\n}\n.fa-cloud-download:before {\n  content: \"\\f0ed\";\n}\n.fa-cloud-upload:before {\n  content: \"\\f0ee\";\n}\n.fa-user-md:before {\n  content: \"\\f0f0\";\n}\n.fa-stethoscope:before {\n  content: \"\\f0f1\";\n}\n.fa-suitcase:before {\n  content: \"\\f0f2\";\n}\n.fa-bell-o:before {\n  content: \"\\f0a2\";\n}\n.fa-coffee:before {\n  content: \"\\f0f4\";\n}\n.fa-cutlery:before {\n  content: \"\\f0f5\";\n}\n.fa-file-text-o:before {\n  content: \"\\f0f6\";\n}\n.fa-building-o:before {\n  content: \"\\f0f7\";\n}\n.fa-hospital-o:before {\n  content: \"\\f0f8\";\n}\n.fa-ambulance:before {\n  content: \"\\f0f9\";\n}\n.fa-medkit:before {\n  content: \"\\f0fa\";\n}\n.fa-fighter-jet:before {\n  content: \"\\f0fb\";\n}\n.fa-beer:before {\n  content: \"\\f0fc\";\n}\n.fa-h-square:before {\n  content: \"\\f0fd\";\n}\n.fa-plus-square:before {\n  content: \"\\f0fe\";\n}\n.fa-angle-double-left:before {\n  content: \"\\f100\";\n}\n.fa-angle-double-right:before {\n  content: \"\\f101\";\n}\n.fa-angle-double-up:before {\n  content: \"\\f102\";\n}\n.fa-angle-double-down:before {\n  content: \"\\f103\";\n}\n.fa-angle-left:before {\n  content: \"\\f104\";\n}\n.fa-angle-right:before {\n  content: \"\\f105\";\n}\n.fa-angle-up:before {\n  content: \"\\f106\";\n}\n.fa-angle-down:before {\n  content: \"\\f107\";\n}\n.fa-desktop:before {\n  content: \"\\f108\";\n}\n.fa-laptop:before {\n  content: \"\\f109\";\n}\n.fa-tablet:before {\n  content: \"\\f10a\";\n}\n.fa-mobile-phone:before,\n.fa-mobile:before {\n  content: \"\\f10b\";\n}\n.fa-circle-o:before {\n  content: \"\\f10c\";\n}\n.fa-quote-left:before {\n  content: \"\\f10d\";\n}\n.fa-quote-right:before {\n  content: \"\\f10e\";\n}\n.fa-spinner:before {\n  content: \"\\f110\";\n}\n.fa-circle:before {\n  content: \"\\f111\";\n}\n.fa-mail-reply:before,\n.fa-reply:before {\n  content: \"\\f112\";\n}\n.fa-github-alt:before {\n  content: \"\\f113\";\n}\n.fa-folder-o:before {\n  content: \"\\f114\";\n}\n.fa-folder-open-o:before {\n  content: \"\\f115\";\n}\n.fa-smile-o:before {\n  content: \"\\f118\";\n}\n.fa-frown-o:before {\n  content: \"\\f119\";\n}\n.fa-meh-o:before {\n  content: \"\\f11a\";\n}\n.fa-gamepad:before {\n  content: \"\\f11b\";\n}\n.fa-keyboard-o:before {\n  content: \"\\f11c\";\n}\n.fa-flag-o:before {\n  content: \"\\f11d\";\n}\n.fa-flag-checkered:before {\n  content: \"\\f11e\";\n}\n.fa-terminal:before {\n  content: \"\\f120\";\n}\n.fa-code:before {\n  content: \"\\f121\";\n}\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n  content: \"\\f122\";\n}\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n  content: \"\\f123\";\n}\n.fa-location-arrow:before {\n  content: \"\\f124\";\n}\n.fa-crop:before {\n  content: \"\\f125\";\n}\n.fa-code-fork:before {\n  content: \"\\f126\";\n}\n.fa-unlink:before,\n.fa-chain-broken:before {\n  content: \"\\f127\";\n}\n.fa-question:before {\n  content: \"\\f128\";\n}\n.fa-info:before {\n  content: \"\\f129\";\n}\n.fa-exclamation:before {\n  content: \"\\f12a\";\n}\n.fa-superscript:before {\n  content: \"\\f12b\";\n}\n.fa-subscript:before {\n  content: \"\\f12c\";\n}\n.fa-eraser:before {\n  content: \"\\f12d\";\n}\n.fa-puzzle-piece:before {\n  content: \"\\f12e\";\n}\n.fa-microphone:before {\n  content: \"\\f130\";\n}\n.fa-microphone-slash:before {\n  content: \"\\f131\";\n}\n.fa-shield:before {\n  content: \"\\f132\";\n}\n.fa-calendar-o:before {\n  content: \"\\f133\";\n}\n.fa-fire-extinguisher:before {\n  content: \"\\f134\";\n}\n.fa-rocket:before {\n  content: \"\\f135\";\n}\n.fa-maxcdn:before {\n  content: \"\\f136\";\n}\n.fa-chevron-circle-left:before {\n  content: \"\\f137\";\n}\n.fa-chevron-circle-right:before {\n  content: \"\\f138\";\n}\n.fa-chevron-circle-up:before {\n  content: \"\\f139\";\n}\n.fa-chevron-circle-down:before {\n  content: \"\\f13a\";\n}\n.fa-html5:before {\n  content: \"\\f13b\";\n}\n.fa-css3:before {\n  content: \"\\f13c\";\n}\n.fa-anchor:before {\n  content: \"\\f13d\";\n}\n.fa-unlock-alt:before {\n  content: \"\\f13e\";\n}\n.fa-bullseye:before {\n  content: \"\\f140\";\n}\n.fa-ellipsis-h:before {\n  content: \"\\f141\";\n}\n.fa-ellipsis-v:before {\n  content: \"\\f142\";\n}\n.fa-rss-square:before {\n  content: \"\\f143\";\n}\n.fa-play-circle:before {\n  content: \"\\f144\";\n}\n.fa-ticket:before {\n  content: \"\\f145\";\n}\n.fa-minus-square:before {\n  content: \"\\f146\";\n}\n.fa-minus-square-o:before {\n  content: \"\\f147\";\n}\n.fa-level-up:before {\n  content: \"\\f148\";\n}\n.fa-level-down:before {\n  content: \"\\f149\";\n}\n.fa-check-square:before {\n  content: \"\\f14a\";\n}\n.fa-pencil-square:before {\n  content: \"\\f14b\";\n}\n.fa-external-link-square:before {\n  content: \"\\f14c\";\n}\n.fa-share-square:before {\n  content: \"\\f14d\";\n}\n.fa-compass:before {\n  content: \"\\f14e\";\n}\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n  content: \"\\f150\";\n}\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n  content: \"\\f151\";\n}\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n  content: \"\\f152\";\n}\n.fa-euro:before,\n.fa-eur:before {\n  content: \"\\f153\";\n}\n.fa-gbp:before {\n  content: \"\\f154\";\n}\n.fa-dollar:before,\n.fa-usd:before {\n  content: \"\\f155\";\n}\n.fa-rupee:before,\n.fa-inr:before {\n  content: \"\\f156\";\n}\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n  content: \"\\f157\";\n}\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n  content: \"\\f158\";\n}\n.fa-won:before,\n.fa-krw:before {\n  content: \"\\f159\";\n}\n.fa-bitcoin:before,\n.fa-btc:before {\n  content: \"\\f15a\";\n}\n.fa-file:before {\n  content: \"\\f15b\";\n}\n.fa-file-text:before {\n  content: \"\\f15c\";\n}\n.fa-sort-alpha-asc:before {\n  content: \"\\f15d\";\n}\n.fa-sort-alpha-desc:before {\n  content: \"\\f15e\";\n}\n.fa-sort-amount-asc:before {\n  content: \"\\f160\";\n}\n.fa-sort-amount-desc:before {\n  content: \"\\f161\";\n}\n.fa-sort-numeric-asc:before {\n  content: \"\\f162\";\n}\n.fa-sort-numeric-desc:before {\n  content: \"\\f163\";\n}\n.fa-thumbs-up:before {\n  content: \"\\f164\";\n}\n.fa-thumbs-down:before {\n  content: \"\\f165\";\n}\n.fa-youtube-square:before {\n  content: \"\\f166\";\n}\n.fa-youtube:before {\n  content: \"\\f167\";\n}\n.fa-xing:before {\n  content: \"\\f168\";\n}\n.fa-xing-square:before {\n  content: \"\\f169\";\n}\n.fa-youtube-play:before {\n  content: \"\\f16a\";\n}\n.fa-dropbox:before {\n  content: \"\\f16b\";\n}\n.fa-stack-overflow:before {\n  content: \"\\f16c\";\n}\n.fa-instagram:before {\n  content: \"\\f16d\";\n}\n.fa-flickr:before {\n  content: \"\\f16e\";\n}\n.fa-adn:before {\n  content: \"\\f170\";\n}\n.fa-bitbucket:before {\n  content: \"\\f171\";\n}\n.fa-bitbucket-square:before {\n  content: \"\\f172\";\n}\n.fa-tumblr:before {\n  content: \"\\f173\";\n}\n.fa-tumblr-square:before {\n  content: \"\\f174\";\n}\n.fa-long-arrow-down:before {\n  content: \"\\f175\";\n}\n.fa-long-arrow-up:before {\n  content: \"\\f176\";\n}\n.fa-long-arrow-left:before {\n  content: \"\\f177\";\n}\n.fa-long-arrow-right:before {\n  content: \"\\f178\";\n}\n.fa-apple:before {\n  content: \"\\f179\";\n}\n.fa-windows:before {\n  content: \"\\f17a\";\n}\n.fa-android:before {\n  content: \"\\f17b\";\n}\n.fa-linux:before {\n  content: \"\\f17c\";\n}\n.fa-dribbble:before {\n  content: \"\\f17d\";\n}\n.fa-skype:before {\n  content: \"\\f17e\";\n}\n.fa-foursquare:before {\n  content: \"\\f180\";\n}\n.fa-trello:before {\n  content: \"\\f181\";\n}\n.fa-female:before {\n  content: \"\\f182\";\n}\n.fa-male:before {\n  content: \"\\f183\";\n}\n.fa-gittip:before,\n.fa-gratipay:before {\n  content: \"\\f184\";\n}\n.fa-sun-o:before {\n  content: \"\\f185\";\n}\n.fa-moon-o:before {\n  content: \"\\f186\";\n}\n.fa-archive:before {\n  content: \"\\f187\";\n}\n.fa-bug:before {\n  content: \"\\f188\";\n}\n.fa-vk:before {\n  content: \"\\f189\";\n}\n.fa-weibo:before {\n  content: \"\\f18a\";\n}\n.fa-renren:before {\n  content: \"\\f18b\";\n}\n.fa-pagelines:before {\n  content: \"\\f18c\";\n}\n.fa-stack-exchange:before {\n  content: \"\\f18d\";\n}\n.fa-arrow-circle-o-right:before {\n  content: \"\\f18e\";\n}\n.fa-arrow-circle-o-left:before {\n  content: \"\\f190\";\n}\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n  content: \"\\f191\";\n}\n.fa-dot-circle-o:before {\n  content: \"\\f192\";\n}\n.fa-wheelchair:before {\n  content: \"\\f193\";\n}\n.fa-vimeo-square:before {\n  content: \"\\f194\";\n}\n.fa-turkish-lira:before,\n.fa-try:before {\n  content: \"\\f195\";\n}\n.fa-plus-square-o:before {\n  content: \"\\f196\";\n}\n.fa-space-shuttle:before {\n  content: \"\\f197\";\n}\n.fa-slack:before {\n  content: \"\\f198\";\n}\n.fa-envelope-square:before {\n  content: \"\\f199\";\n}\n.fa-wordpress:before {\n  content: \"\\f19a\";\n}\n.fa-openid:before {\n  content: \"\\f19b\";\n}\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n  content: \"\\f19c\";\n}\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n  content: \"\\f19d\";\n}\n.fa-yahoo:before {\n  content: \"\\f19e\";\n}\n.fa-google:before {\n  content: \"\\f1a0\";\n}\n.fa-reddit:before {\n  content: \"\\f1a1\";\n}\n.fa-reddit-square:before {\n  content: \"\\f1a2\";\n}\n.fa-stumbleupon-circle:before {\n  content: \"\\f1a3\";\n}\n.fa-stumbleupon:before {\n  content: \"\\f1a4\";\n}\n.fa-delicious:before {\n  content: \"\\f1a5\";\n}\n.fa-digg:before {\n  content: \"\\f1a6\";\n}\n.fa-pied-piper-pp:before {\n  content: \"\\f1a7\";\n}\n.fa-pied-piper-alt:before {\n  content: \"\\f1a8\";\n}\n.fa-drupal:before {\n  content: \"\\f1a9\";\n}\n.fa-joomla:before {\n  content: \"\\f1aa\";\n}\n.fa-language:before {\n  content: \"\\f1ab\";\n}\n.fa-fax:before {\n  content: \"\\f1ac\";\n}\n.fa-building:before {\n  content: \"\\f1ad\";\n}\n.fa-child:before {\n  content: \"\\f1ae\";\n}\n.fa-paw:before {\n  content: \"\\f1b0\";\n}\n.fa-spoon:before {\n  content: \"\\f1b1\";\n}\n.fa-cube:before {\n  content: \"\\f1b2\";\n}\n.fa-cubes:before {\n  content: \"\\f1b3\";\n}\n.fa-behance:before {\n  content: \"\\f1b4\";\n}\n.fa-behance-square:before {\n  content: \"\\f1b5\";\n}\n.fa-steam:before {\n  content: \"\\f1b6\";\n}\n.fa-steam-square:before {\n  content: \"\\f1b7\";\n}\n.fa-recycle:before {\n  content: \"\\f1b8\";\n}\n.fa-automobile:before,\n.fa-car:before {\n  content: \"\\f1b9\";\n}\n.fa-cab:before,\n.fa-taxi:before {\n  content: \"\\f1ba\";\n}\n.fa-tree:before {\n  content: \"\\f1bb\";\n}\n.fa-spotify:before {\n  content: \"\\f1bc\";\n}\n.fa-deviantart:before {\n  content: \"\\f1bd\";\n}\n.fa-soundcloud:before {\n  content: \"\\f1be\";\n}\n.fa-database:before {\n  content: \"\\f1c0\";\n}\n.fa-file-pdf-o:before {\n  content: \"\\f1c1\";\n}\n.fa-file-word-o:before {\n  content: \"\\f1c2\";\n}\n.fa-file-excel-o:before {\n  content: \"\\f1c3\";\n}\n.fa-file-powerpoint-o:before {\n  content: \"\\f1c4\";\n}\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n  content: \"\\f1c5\";\n}\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n  content: \"\\f1c6\";\n}\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n  content: \"\\f1c7\";\n}\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n  content: \"\\f1c8\";\n}\n.fa-file-code-o:before {\n  content: \"\\f1c9\";\n}\n.fa-vine:before {\n  content: \"\\f1ca\";\n}\n.fa-codepen:before {\n  content: \"\\f1cb\";\n}\n.fa-jsfiddle:before {\n  content: \"\\f1cc\";\n}\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n  content: \"\\f1cd\";\n}\n.fa-circle-o-notch:before {\n  content: \"\\f1ce\";\n}\n.fa-ra:before,\n.fa-resistance:before,\n.fa-rebel:before {\n  content: \"\\f1d0\";\n}\n.fa-ge:before,\n.fa-empire:before {\n  content: \"\\f1d1\";\n}\n.fa-git-square:before {\n  content: \"\\f1d2\";\n}\n.fa-git:before {\n  content: \"\\f1d3\";\n}\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n  content: \"\\f1d4\";\n}\n.fa-tencent-weibo:before {\n  content: \"\\f1d5\";\n}\n.fa-qq:before {\n  content: \"\\f1d6\";\n}\n.fa-wechat:before,\n.fa-weixin:before {\n  content: \"\\f1d7\";\n}\n.fa-send:before,\n.fa-paper-plane:before {\n  content: \"\\f1d8\";\n}\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n  content: \"\\f1d9\";\n}\n.fa-history:before {\n  content: \"\\f1da\";\n}\n.fa-circle-thin:before {\n  content: \"\\f1db\";\n}\n.fa-header:before {\n  content: \"\\f1dc\";\n}\n.fa-paragraph:before {\n  content: \"\\f1dd\";\n}\n.fa-sliders:before {\n  content: \"\\f1de\";\n}\n.fa-share-alt:before {\n  content: \"\\f1e0\";\n}\n.fa-share-alt-square:before {\n  content: \"\\f1e1\";\n}\n.fa-bomb:before {\n  content: \"\\f1e2\";\n}\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n  content: \"\\f1e3\";\n}\n.fa-tty:before {\n  content: \"\\f1e4\";\n}\n.fa-binoculars:before {\n  content: \"\\f1e5\";\n}\n.fa-plug:before {\n  content: \"\\f1e6\";\n}\n.fa-slideshare:before {\n  content: \"\\f1e7\";\n}\n.fa-twitch:before {\n  content: \"\\f1e8\";\n}\n.fa-yelp:before {\n  content: \"\\f1e9\";\n}\n.fa-newspaper-o:before {\n  content: \"\\f1ea\";\n}\n.fa-wifi:before {\n  content: \"\\f1eb\";\n}\n.fa-calculator:before {\n  content: \"\\f1ec\";\n}\n.fa-paypal:before {\n  content: \"\\f1ed\";\n}\n.fa-google-wallet:before {\n  content: \"\\f1ee\";\n}\n.fa-cc-visa:before {\n  content: \"\\f1f0\";\n}\n.fa-cc-mastercard:before {\n  content: \"\\f1f1\";\n}\n.fa-cc-discover:before {\n  content: \"\\f1f2\";\n}\n.fa-cc-amex:before {\n  content: \"\\f1f3\";\n}\n.fa-cc-paypal:before {\n  content: \"\\f1f4\";\n}\n.fa-cc-stripe:before {\n  content: \"\\f1f5\";\n}\n.fa-bell-slash:before {\n  content: \"\\f1f6\";\n}\n.fa-bell-slash-o:before {\n  content: \"\\f1f7\";\n}\n.fa-trash:before {\n  content: \"\\f1f8\";\n}\n.fa-copyright:before {\n  content: \"\\f1f9\";\n}\n.fa-at:before {\n  content: \"\\f1fa\";\n}\n.fa-eyedropper:before {\n  content: \"\\f1fb\";\n}\n.fa-paint-brush:before {\n  content: \"\\f1fc\";\n}\n.fa-birthday-cake:before {\n  content: \"\\f1fd\";\n}\n.fa-area-chart:before {\n  content: \"\\f1fe\";\n}\n.fa-pie-chart:before {\n  content: \"\\f200\";\n}\n.fa-line-chart:before {\n  content: \"\\f201\";\n}\n.fa-lastfm:before {\n  content: \"\\f202\";\n}\n.fa-lastfm-square:before {\n  content: \"\\f203\";\n}\n.fa-toggle-off:before {\n  content: \"\\f204\";\n}\n.fa-toggle-on:before {\n  content: \"\\f205\";\n}\n.fa-bicycle:before {\n  content: \"\\f206\";\n}\n.fa-bus:before {\n  content: \"\\f207\";\n}\n.fa-ioxhost:before {\n  content: \"\\f208\";\n}\n.fa-angellist:before {\n  content: \"\\f209\";\n}\n.fa-cc:before {\n  content: \"\\f20a\";\n}\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n  content: \"\\f20b\";\n}\n.fa-meanpath:before {\n  content: \"\\f20c\";\n}\n.fa-buysellads:before {\n  content: \"\\f20d\";\n}\n.fa-connectdevelop:before {\n  content: \"\\f20e\";\n}\n.fa-dashcube:before {\n  content: \"\\f210\";\n}\n.fa-forumbee:before {\n  content: \"\\f211\";\n}\n.fa-leanpub:before {\n  content: \"\\f212\";\n}\n.fa-sellsy:before {\n  content: \"\\f213\";\n}\n.fa-shirtsinbulk:before {\n  content: \"\\f214\";\n}\n.fa-simplybuilt:before {\n  content: \"\\f215\";\n}\n.fa-skyatlas:before {\n  content: \"\\f216\";\n}\n.fa-cart-plus:before {\n  content: \"\\f217\";\n}\n.fa-cart-arrow-down:before {\n  content: \"\\f218\";\n}\n.fa-diamond:before {\n  content: \"\\f219\";\n}\n.fa-ship:before {\n  content: \"\\f21a\";\n}\n.fa-user-secret:before {\n  content: \"\\f21b\";\n}\n.fa-motorcycle:before {\n  content: \"\\f21c\";\n}\n.fa-street-view:before {\n  content: \"\\f21d\";\n}\n.fa-heartbeat:before {\n  content: \"\\f21e\";\n}\n.fa-venus:before {\n  content: \"\\f221\";\n}\n.fa-mars:before {\n  content: \"\\f222\";\n}\n.fa-mercury:before {\n  content: \"\\f223\";\n}\n.fa-intersex:before,\n.fa-transgender:before {\n  content: \"\\f224\";\n}\n.fa-transgender-alt:before {\n  content: \"\\f225\";\n}\n.fa-venus-double:before {\n  content: \"\\f226\";\n}\n.fa-mars-double:before {\n  content: \"\\f227\";\n}\n.fa-venus-mars:before {\n  content: \"\\f228\";\n}\n.fa-mars-stroke:before {\n  content: \"\\f229\";\n}\n.fa-mars-stroke-v:before {\n  content: \"\\f22a\";\n}\n.fa-mars-stroke-h:before {\n  content: \"\\f22b\";\n}\n.fa-neuter:before {\n  content: \"\\f22c\";\n}\n.fa-genderless:before {\n  content: \"\\f22d\";\n}\n.fa-facebook-official:before {\n  content: \"\\f230\";\n}\n.fa-pinterest-p:before {\n  content: \"\\f231\";\n}\n.fa-whatsapp:before {\n  content: \"\\f232\";\n}\n.fa-server:before {\n  content: \"\\f233\";\n}\n.fa-user-plus:before {\n  content: \"\\f234\";\n}\n.fa-user-times:before {\n  content: \"\\f235\";\n}\n.fa-hotel:before,\n.fa-bed:before {\n  content: \"\\f236\";\n}\n.fa-viacoin:before {\n  content: \"\\f237\";\n}\n.fa-train:before {\n  content: \"\\f238\";\n}\n.fa-subway:before {\n  content: \"\\f239\";\n}\n.fa-medium:before {\n  content: \"\\f23a\";\n}\n.fa-yc:before,\n.fa-y-combinator:before {\n  content: \"\\f23b\";\n}\n.fa-optin-monster:before {\n  content: \"\\f23c\";\n}\n.fa-opencart:before {\n  content: \"\\f23d\";\n}\n.fa-expeditedssl:before {\n  content: \"\\f23e\";\n}\n.fa-battery-4:before,\n.fa-battery:before,\n.fa-battery-full:before {\n  content: \"\\f240\";\n}\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n  content: \"\\f241\";\n}\n.fa-battery-2:before,\n.fa-battery-half:before {\n  content: \"\\f242\";\n}\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n  content: \"\\f243\";\n}\n.fa-battery-0:before,\n.fa-battery-empty:before {\n  content: \"\\f244\";\n}\n.fa-mouse-pointer:before {\n  content: \"\\f245\";\n}\n.fa-i-cursor:before {\n  content: \"\\f246\";\n}\n.fa-object-group:before {\n  content: \"\\f247\";\n}\n.fa-object-ungroup:before {\n  content: \"\\f248\";\n}\n.fa-sticky-note:before {\n  content: \"\\f249\";\n}\n.fa-sticky-note-o:before {\n  content: \"\\f24a\";\n}\n.fa-cc-jcb:before {\n  content: \"\\f24b\";\n}\n.fa-cc-diners-club:before {\n  content: \"\\f24c\";\n}\n.fa-clone:before {\n  content: \"\\f24d\";\n}\n.fa-balance-scale:before {\n  content: \"\\f24e\";\n}\n.fa-hourglass-o:before {\n  content: \"\\f250\";\n}\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n  content: \"\\f251\";\n}\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n  content: \"\\f252\";\n}\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n  content: \"\\f253\";\n}\n.fa-hourglass:before {\n  content: \"\\f254\";\n}\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n  content: \"\\f255\";\n}\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n  content: \"\\f256\";\n}\n.fa-hand-scissors-o:before {\n  content: \"\\f257\";\n}\n.fa-hand-lizard-o:before {\n  content: \"\\f258\";\n}\n.fa-hand-spock-o:before {\n  content: \"\\f259\";\n}\n.fa-hand-pointer-o:before {\n  content: \"\\f25a\";\n}\n.fa-hand-peace-o:before {\n  content: \"\\f25b\";\n}\n.fa-trademark:before {\n  content: \"\\f25c\";\n}\n.fa-registered:before {\n  content: \"\\f25d\";\n}\n.fa-creative-commons:before {\n  content: \"\\f25e\";\n}\n.fa-gg:before {\n  content: \"\\f260\";\n}\n.fa-gg-circle:before {\n  content: \"\\f261\";\n}\n.fa-tripadvisor:before {\n  content: \"\\f262\";\n}\n.fa-odnoklassniki:before {\n  content: \"\\f263\";\n}\n.fa-odnoklassniki-square:before {\n  content: \"\\f264\";\n}\n.fa-get-pocket:before {\n  content: \"\\f265\";\n}\n.fa-wikipedia-w:before {\n  content: \"\\f266\";\n}\n.fa-safari:before {\n  content: \"\\f267\";\n}\n.fa-chrome:before {\n  content: \"\\f268\";\n}\n.fa-firefox:before {\n  content: \"\\f269\";\n}\n.fa-opera:before {\n  content: \"\\f26a\";\n}\n.fa-internet-explorer:before {\n  content: \"\\f26b\";\n}\n.fa-tv:before,\n.fa-television:before {\n  content: \"\\f26c\";\n}\n.fa-contao:before {\n  content: \"\\f26d\";\n}\n.fa-500px:before {\n  content: \"\\f26e\";\n}\n.fa-amazon:before {\n  content: \"\\f270\";\n}\n.fa-calendar-plus-o:before {\n  content: \"\\f271\";\n}\n.fa-calendar-minus-o:before {\n  content: \"\\f272\";\n}\n.fa-calendar-times-o:before {\n  content: \"\\f273\";\n}\n.fa-calendar-check-o:before {\n  content: \"\\f274\";\n}\n.fa-industry:before {\n  content: \"\\f275\";\n}\n.fa-map-pin:before {\n  content: \"\\f276\";\n}\n.fa-map-signs:before {\n  content: \"\\f277\";\n}\n.fa-map-o:before {\n  content: \"\\f278\";\n}\n.fa-map:before {\n  content: \"\\f279\";\n}\n.fa-commenting:before {\n  content: \"\\f27a\";\n}\n.fa-commenting-o:before {\n  content: \"\\f27b\";\n}\n.fa-houzz:before {\n  content: \"\\f27c\";\n}\n.fa-vimeo:before {\n  content: \"\\f27d\";\n}\n.fa-black-tie:before {\n  content: \"\\f27e\";\n}\n.fa-fonticons:before {\n  content: \"\\f280\";\n}\n.fa-reddit-alien:before {\n  content: \"\\f281\";\n}\n.fa-edge:before {\n  content: \"\\f282\";\n}\n.fa-credit-card-alt:before {\n  content: \"\\f283\";\n}\n.fa-codiepie:before {\n  content: \"\\f284\";\n}\n.fa-modx:before {\n  content: \"\\f285\";\n}\n.fa-fort-awesome:before {\n  content: \"\\f286\";\n}\n.fa-usb:before {\n  content: \"\\f287\";\n}\n.fa-product-hunt:before {\n  content: \"\\f288\";\n}\n.fa-mixcloud:before {\n  content: \"\\f289\";\n}\n.fa-scribd:before {\n  content: \"\\f28a\";\n}\n.fa-pause-circle:before {\n  content: \"\\f28b\";\n}\n.fa-pause-circle-o:before {\n  content: \"\\f28c\";\n}\n.fa-stop-circle:before {\n  content: \"\\f28d\";\n}\n.fa-stop-circle-o:before {\n  content: \"\\f28e\";\n}\n.fa-shopping-bag:before {\n  content: \"\\f290\";\n}\n.fa-shopping-basket:before {\n  content: \"\\f291\";\n}\n.fa-hashtag:before {\n  content: \"\\f292\";\n}\n.fa-bluetooth:before {\n  content: \"\\f293\";\n}\n.fa-bluetooth-b:before {\n  content: \"\\f294\";\n}\n.fa-percent:before {\n  content: \"\\f295\";\n}\n.fa-gitlab:before {\n  content: \"\\f296\";\n}\n.fa-wpbeginner:before {\n  content: \"\\f297\";\n}\n.fa-wpforms:before {\n  content: \"\\f298\";\n}\n.fa-envira:before {\n  content: \"\\f299\";\n}\n.fa-universal-access:before {\n  content: \"\\f29a\";\n}\n.fa-wheelchair-alt:before {\n  content: \"\\f29b\";\n}\n.fa-question-circle-o:before {\n  content: \"\\f29c\";\n}\n.fa-blind:before {\n  content: \"\\f29d\";\n}\n.fa-audio-description:before {\n  content: \"\\f29e\";\n}\n.fa-volume-control-phone:before {\n  content: \"\\f2a0\";\n}\n.fa-braille:before {\n  content: \"\\f2a1\";\n}\n.fa-assistive-listening-systems:before {\n  content: \"\\f2a2\";\n}\n.fa-asl-interpreting:before,\n.fa-american-sign-language-interpreting:before {\n  content: \"\\f2a3\";\n}\n.fa-deafness:before,\n.fa-hard-of-hearing:before,\n.fa-deaf:before {\n  content: \"\\f2a4\";\n}\n.fa-glide:before {\n  content: \"\\f2a5\";\n}\n.fa-glide-g:before {\n  content: \"\\f2a6\";\n}\n.fa-signing:before,\n.fa-sign-language:before {\n  content: \"\\f2a7\";\n}\n.fa-low-vision:before {\n  content: \"\\f2a8\";\n}\n.fa-viadeo:before {\n  content: \"\\f2a9\";\n}\n.fa-viadeo-square:before {\n  content: \"\\f2aa\";\n}\n.fa-snapchat:before {\n  content: \"\\f2ab\";\n}\n.fa-snapchat-ghost:before {\n  content: \"\\f2ac\";\n}\n.fa-snapchat-square:before {\n  content: \"\\f2ad\";\n}\n.fa-pied-piper:before {\n  content: \"\\f2ae\";\n}\n.fa-first-order:before {\n  content: \"\\f2b0\";\n}\n.fa-yoast:before {\n  content: \"\\f2b1\";\n}\n.fa-themeisle:before {\n  content: \"\\f2b2\";\n}\n.fa-google-plus-circle:before,\n.fa-google-plus-official:before {\n  content: \"\\f2b3\";\n}\n.fa-fa:before,\n.fa-font-awesome:before {\n  content: \"\\f2b4\";\n}\n.fa-handshake-o:before {\n  content: \"\\f2b5\";\n}\n.fa-envelope-open:before {\n  content: \"\\f2b6\";\n}\n.fa-envelope-open-o:before {\n  content: \"\\f2b7\";\n}\n.fa-linode:before {\n  content: \"\\f2b8\";\n}\n.fa-address-book:before {\n  content: \"\\f2b9\";\n}\n.fa-address-book-o:before {\n  content: \"\\f2ba\";\n}\n.fa-vcard:before,\n.fa-address-card:before {\n  content: \"\\f2bb\";\n}\n.fa-vcard-o:before,\n.fa-address-card-o:before {\n  content: \"\\f2bc\";\n}\n.fa-user-circle:before {\n  content: \"\\f2bd\";\n}\n.fa-user-circle-o:before {\n  content: \"\\f2be\";\n}\n.fa-user-o:before {\n  content: \"\\f2c0\";\n}\n.fa-id-badge:before {\n  content: \"\\f2c1\";\n}\n.fa-drivers-license:before,\n.fa-id-card:before {\n  content: \"\\f2c2\";\n}\n.fa-drivers-license-o:before,\n.fa-id-card-o:before {\n  content: \"\\f2c3\";\n}\n.fa-quora:before {\n  content: \"\\f2c4\";\n}\n.fa-free-code-camp:before {\n  content: \"\\f2c5\";\n}\n.fa-telegram:before {\n  content: \"\\f2c6\";\n}\n.fa-thermometer-4:before,\n.fa-thermometer:before,\n.fa-thermometer-full:before {\n  content: \"\\f2c7\";\n}\n.fa-thermometer-3:before,\n.fa-thermometer-three-quarters:before {\n  content: \"\\f2c8\";\n}\n.fa-thermometer-2:before,\n.fa-thermometer-half:before {\n  content: \"\\f2c9\";\n}\n.fa-thermometer-1:before,\n.fa-thermometer-quarter:before {\n  content: \"\\f2ca\";\n}\n.fa-thermometer-0:before,\n.fa-thermometer-empty:before {\n  content: \"\\f2cb\";\n}\n.fa-shower:before {\n  content: \"\\f2cc\";\n}\n.fa-bathtub:before,\n.fa-s15:before,\n.fa-bath:before {\n  content: \"\\f2cd\";\n}\n.fa-podcast:before {\n  content: \"\\f2ce\";\n}\n.fa-window-maximize:before {\n  content: \"\\f2d0\";\n}\n.fa-window-minimize:before {\n  content: \"\\f2d1\";\n}\n.fa-window-restore:before {\n  content: \"\\f2d2\";\n}\n.fa-times-rectangle:before,\n.fa-window-close:before {\n  content: \"\\f2d3\";\n}\n.fa-times-rectangle-o:before,\n.fa-window-close-o:before {\n  content: \"\\f2d4\";\n}\n.fa-bandcamp:before {\n  content: \"\\f2d5\";\n}\n.fa-grav:before {\n  content: \"\\f2d6\";\n}\n.fa-etsy:before {\n  content: \"\\f2d7\";\n}\n.fa-imdb:before {\n  content: \"\\f2d8\";\n}\n.fa-ravelry:before {\n  content: \"\\f2d9\";\n}\n.fa-eercast:before {\n  content: \"\\f2da\";\n}\n.fa-microchip:before {\n  content: \"\\f2db\";\n}\n.fa-snowflake-o:before {\n  content: \"\\f2dc\";\n}\n.fa-superpowers:before {\n  content: \"\\f2dd\";\n}\n.fa-wpexplorer:before {\n  content: \"\\f2de\";\n}\n.fa-meetup:before {\n  content: \"\\f2e0\";\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.sr-only-focusable:active,\n.sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}\n/**\n * @link http://www.color-hex.com/color-palettes/popular.php\n * @link http://www.color-hex.com/color-palette/185\n */\nbody {\n  display: flex;\n}\nnav-left {\n  background: #3b5998;\n  flex: 1 1 15%;\n  height: 100vh;\n  max-width: 15%;\n  padding: 0 20px;\n  position: relative;\n}\nnav-left::before {\n  background: url(/images/nav-left.jpg);\n  bottom: 0;\n  content: '';\n  filter: invert();\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  opacity: .1;\n}\nnav-left > * {\n  position: relative;\n}\nnav-left a {\n  color: #ffffff;\n}\nnav-left a:hover {\n  color: #ffffff;\n  text-decoration: none;\n}\nnav-top .navbar-default {\n  background-color: #f7f7f7;\n  border: 0;\n  border-radius: 0;\n}\nnav-top .navbar-default a {\n  color: #3b5998 !important;\n}\nmain-app {\n  display: block;\n  padding: 20px;\n}\ncontent {\n  flex: 1 1 85%;\n  max-width: 85%;\n}\n"; });
define('text!variables.css', ['module'], function(module) { module.exports = "/**\n * @link http://www.color-hex.com/color-palettes/popular.php\n * @link http://www.color-hex.com/color-palette/185\n */\n"; });
define('text!models/user/user.html', ['module'], function(module) { module.exports = "<template>TODO:</template>"; });
define('text!templates/home/home.html', ['module'], function(module) { module.exports = "<template><h1>HOME!</h1></template>"; });
define('text!models/user/left-profile.css', ['module'], function(module) { module.exports = "/**\n * @link http://www.color-hex.com/color-palettes/popular.php\n * @link http://www.color-hex.com/color-palette/185\n */\n.left-nav__profile {\n  display: flex;\n}\n.left-nav__profile-pic img {\n  height: 64px;\n}\n.left-nav__profile-info {\n  color: #ffffff;\n  padding: 10px 0 10px 20px;\n}\n.left-nav__profile-info h2 {\n  font-size: 20px;\n  padding: 0;\n  margin: 0;\n}\n"; });
define('text!models/user/top-nav.css', ['module'], function(module) { module.exports = ""; });
define('text!templates/status/404.html', ['module'], function(module) { module.exports = "<template>You broke it, Jim. Now you gotta fix it back!</template>"; });
define('text!components/helper/logo/logo.css', ['module'], function(module) { module.exports = ".logo {\n  padding: 15px 0;\n}\n.logo-title {\n  font-size: 30px;\n  text-align: center;\n}\n"; });
define('text!templates/tables/tables.html', ['module'], function(module) { module.exports = "<template><h2>Table Samples</h2><compose containerless view=\"components/helper/table/table.html\" view-model=\"components/demo/table/simple\"></compose></template>"; });
define('text!components/helper/table/table.css', ['module'], function(module) { module.exports = ".table {\n  transition: color .2s;\n}\n.table--loading {\n  color: #DDD;\n}\n.table-options {\n  display: flex;\n}\n.table-options > * {\n  padding: 20px;\n}\n.table-options > *:last-child {\n  padding-right: 0;\n}\n.table-options > *:first-child {\n  padding-left: 0;\n}\n"; });
define('text!components/helper/content/content.html', ['module'], function(module) { module.exports = "<template><div class.bind=\"settings.layout\"><h2 t=\"[html]${settings.title}\" if.bind=\"settings.title\" class=\"component-title\"></h2><div repeat.for=\"component of settings.components\" class=\"component component--${component.type}\" class.bind=\"settings.styles[component.type]\"><compose containerless view-model.bind=\"component.module\" model.bind=\"{ settings: component.settings }\"></compose></div></div></template>"; });
define('text!components/nav/left/left.css', ['module'], function(module) { module.exports = ".component.component--left-nav .nav .nav {\n  margin-left: 20px;\n}\n.component.component--left-toggle {\n  height: 64px;\n  overflow: hidden;\n  position: absolute;\n  right: 0;\n  top: 50%;\n  transform: translate(0, -50%);\n  width: 32px;\n}\n.component.component--left-toggle .nav-toggle {\n  transform: translate(-100%, 0);\n  transition: 0.2s ease-in-out;\n}\n.component.component--left-toggle .nav-toggle::before {\n  padding-left: 20px;\n}\n.component.component--left-toggle.toggle {\n  transform: translate(100%, -50%);\n}\n.component.component--left-toggle.toggle .nav-toggle {\n  transform: translate(-50%, 0);\n}\n"; });
define('text!components/helper/logo/logo.html', ['module'], function(module) { module.exports = "<template><require from=\"components/helper/logo/logo.css\"></require><div class=\"logo\" style=\"border:0\"><a href=\"index.html\" class=\"logo-title\"><i class=\"fa fa-paw\"></i> <span class=\"logo-title__text\">Am Skeleton!</span></a></div></template>"; });
define('text!components/nav/toggle/toggle.css', ['module'], function(module) { module.exports = ".nav-toggle {\n  display: block;\n  background: gray;\n  height: 64px;\n  line-height: 64px;\n  text-align: center;\n  border-radius: 50%;\n  width: 64px;\n}\n.nav-toggle::before {\n  content: '\\f104';\n  display: block;\n  font: normal normal normal 30px FontAwesome;\n  height: 64px;\n  line-height: 64px;\n  width: 64px;\n}\n"; });
define('text!components/helper/table/table.html', ['module'], function(module) { module.exports = "<template><require from=\"./table.css\"></require><div class=\"table\"><div class=\"table-options\"><div class=\"btn-toolbar table-export\" role=\"toolbar\"><div class=\"btn-group\" role=\"group\"><button type=\"button\" class=\"btn disabled\">Export as:</button> <button type=\"button\" class=\"btn\" click.trigger=\"exportToCSV()\">CSV</button> <button type=\"button\" class=\"btn\">Excel</button> <button type=\"button\" class=\"btn\">PDF</button> <button type=\"button\" class=\"btn\">Print</button></div></div><form class=\"form-inline table-perpage\"><div class=\"form-group\"><label for=\"table-perpage-${__uuid}\">Per page</label><select id=\"table-perpage-${__uuid}\"><option value=\"\">10</option><option value=\"\">20</option><option value=\"\">30</option></select></div></form><form class=\"form-inline table-sortby\"><div class=\"form-group\"><label for=\"table-sortby-${__uuid}\">Sort by</label><select id=\"table-sortby-${__uuid}\"><option value=\"\">X</option><option value=\"\">Y</option><option value=\"\">Z</option></select></div></form><form class=\"form-inline table-style\"><div class=\"form-style\"><label for=\"table-style-${__uuid}\">Style</label><select id=\"table-style-${__uuid}\"><option value=\"\">Stack</option><option value=\"\">Swipe</option><option value=\"\">Toggle</option></select></div></form><form class=\"form-inline table-search\"><div class=\"form-group\"><label for=\"table-search-${__uuid}\">Search</label><input type=\"text\" class=\"form-control\" id=\"table-search-${__uuid}\" placeholder=\"Search\"></div></form></div><table class.bind=\"style\" id=\"table-${__uuid}\" class=\"table table--loading\"><caption>Optional table caption.</caption><thead><tr><th repeat.for=\"label of thead\">${label}</th></tr></thead><tbody><tr repeat.for=\"row of tbody\"><th scope=\"row\">${row[0]}</th><td repeat.for=\"item of row.slice(1)\">${item}</td></tr></tbody></table><div class=\"table-options\"><div class=\"btn-toolbar table-pagination pagination\" role=\"toolbar\" aria-label=\"Toolbar with button groups\"><div class=\"btn-group\" role=\"group\"><button type=\"button\" class=\"btn btn-secondary\"><i class=\"fa fa-angle-double-left\"></i></button> <button type=\"button\" class=\"btn btn-secondary\">1</button> <button type=\"button\" class=\"btn btn-info\">2</button> <button type=\"button\" class=\"btn btn-secondary\">3</button></div><div class=\"btn-group\" role=\"group\"><button type=\"button\" class=\"btn btn-secondary\">7</button> <button type=\"button\" class=\"btn btn-secondary\">8</button> <button type=\"button\" class=\"btn btn-secondary\">9</button></div><div class=\"btn-group\" role=\"group\"><button type=\"button\" class=\"btn btn-secondary\">7</button> <button type=\"button\" class=\"btn btn-secondary\">8</button> <button type=\"button\" class=\"btn btn-secondary\">9</button> <button type=\"button\" class=\"btn btn-secondary\"><i class=\"fa fa-angle-double-right\"></i></button></div></div></div></div><p><a href=\"#\" click.trigger=\"setTableLoading()\">Show Loading</a> <a href=\"#\" click.trigger=\"setTableLoaded()\">Show Loaded</a></p></template>"; });
define('text!components/nav/top/top.css', ['module'], function(module) { module.exports = ".component.component--top-user {\n  float: right;\n}\n.component.component--top-user .user-link {\n  position: relative;\n}\n.component.component--top-user .user-link > a {\n  padding-left: 50px;\n}\n.component.component--top-user .user-link img {\n  position: absolute;\n  transform: translateY(-50%);\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  margin: 10px;\n  left: 0;\n}\n.component.component--top-inbox {\n  float: right;\n}\n"; });
define('text!components/nav/left/left.html', ['module'], function(module) { module.exports = "<template><require from=\"components/nav/left/left.css\"></require><h3 t=\"[html]${settings.title}\" if.bind=\"settings.title\" class=\"component-title\"></h3><div repeat.for=\"component of settings.components\" class=\"component component--${component.type}\" class.bind=\"settings.styles[component.type]\"><compose containerless view.bind=\"component.view || (component.module + '.html')\" view-model.bind=\"component.module\" model.bind=\"{ settings: component.settings }\"></compose></div></template>"; });
define('text!components/nav/menu/menu.html', ['module'], function(module) { module.exports = "<template><div class=\"menu_section\"><h3>General</h3><ul class=\"nav side-menu\" style=\"\"><li><a><i class=\"fa fa-home\"></i> Home <span class=\"fa fa-chevron-down\"></span></a><ul class=\"nav child_menu\" style=\"\"><li><a href=\"index.html\">Dashboard</a></li><li><a href=\"index2.html\">Dashboard2</a></li><li><a href=\"index3.html\">Dashboard3</a></li></ul></li><li><a><i class=\"fa fa-edit\"></i> Forms <span class=\"fa fa-chevron-down\"></span></a><ul class=\"nav child_menu\" style=\"\"><li><a href=\"form.html\">General Form</a></li><li><a href=\"form_advanced.html\">Advanced Components</a></li><li><a href=\"form_validation.html\">Form Validation</a></li><li><a href=\"form_wizards.html\">Form Wizard</a></li><li><a href=\"form_upload.html\">Form Upload</a></li><li><a href=\"form_buttons.html\">Form Buttons</a></li></ul></li><li><a><i class=\"fa fa-desktop\"></i> UI Elements <span class=\"fa fa-chevron-down\"></span></a><ul class=\"nav child_menu\" style=\"\"><li><a href=\"general_elements.html\">General Elements</a></li><li><a href=\"media_gallery.html\">Media Gallery</a></li><li><a href=\"typography.html\">Typography</a></li><li><a href=\"icons.html\">Icons</a></li><li><a href=\"glyphicons.html\">Glyphicons</a></li><li><a href=\"widgets.html\">Widgets</a></li><li><a href=\"invoice.html\">Invoice</a></li><li><a href=\"inbox.html\">Inbox</a></li><li><a href=\"calendar.html\">Calendar</a></li></ul></li><li><a><i class=\"fa fa-table\"></i> Tables <span class=\"fa fa-chevron-down\"></span></a><ul class=\"nav child_menu\" style=\"\"><li><a href=\"tables.html\">Tables</a></li><li><a href=\"tables_dynamic.html\">Table Dynamic</a></li></ul></li><li><a><i class=\"fa fa-bar-chart-o\"></i> Data Presentation <span class=\"fa fa-chevron-down\"></span></a><ul class=\"nav child_menu\" style=\"\"><li><a href=\"chartjs.html\">Chart JS</a></li><li><a href=\"chartjs2.html\">Chart JS2</a></li><li><a href=\"morisjs.html\">Moris JS</a></li><li><a href=\"echarts.html\">ECharts</a></li><li><a href=\"other_charts.html\">Other Charts</a></li></ul></li><li class=\"\"><a><i class=\"fa fa-clone\"></i>Layouts <span class=\"fa fa-chevron-down\"></span></a><ul class=\"nav child_menu\" style=\"display:none\"><li class=\"current-page\"><a href=\"fixed_sidebar.html\">Fixed Sidebar</a></li><li><a href=\"fixed_footer.html\">Fixed Footer</a></li></ul></li></ul></div></template>"; });
define('text!components/nav/toggle/toggle.html', ['module'], function(module) { module.exports = "<template><require from=\"./toggle.css\"></require><a class=\"nav-toggle\" href=\"#\" click.trigger=\"togglerRetract()\" class=\"retract\"></a></template>"; });
define('text!components/nav/top/top.html', ['module'], function(module) { module.exports = "<template><require from=\"components/nav/top/top.css\"></require><nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"#\">Brand</a></div><div class=\"collapse navbar-collapse\"><div repeat.for=\"component of settings.components\" class=\"component component--${component.type}\" class.bind=\"settings.styles[component.type]\"><compose containerless view.bind=\"component.view || (component.module + '.html')\" view-model.bind=\"component.module\" model.bind=\"{ settings: component.settings }\"></compose></div></div></div></nav></template>"; });
define('text!components/nav/top/inbox/inbox.html', ['module'], function(module) { module.exports = "<template><ul class=\"nav navbar-nav\" class.bind=\"style\"><li class=\"inbox-link\"><a href=\"javascript:;\" href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"><i class=\"fa fa-envelope-o\"></i> <span class=\"badge bg-green\">6</span></a><ul class=\"dropdown-menu\"><li><a><span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\"></span><span><span>John Smith</span> <span class=\"time\">3 mins ago</span> </span><span class=\"message\">Film festivals used to be do-or-die moments for movie makers. They were where...</span></a></li><li><a><span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\"></span><span><span>John Smith</span> <span class=\"time\">3 mins ago</span> </span><span class=\"message\">Film festivals used to be do-or-die moments for movie makers. They were where...</span></a></li><li><a><span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\"></span><span><span>John Smith</span> <span class=\"time\">3 mins ago</span> </span><span class=\"message\">Film festivals used to be do-or-die moments for movie makers. They were where...</span></a></li><li><a><span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\"></span><span><span>John Smith</span> <span class=\"time\">3 mins ago</span> </span><span class=\"message\">Film festivals used to be do-or-die moments for movie makers. They were where...</span></a></li><li><div class=\"text-center\"><a><strong>See All Alerts</strong> <i class=\"fa fa-angle-right\"></i></a></div></li></ul></li></ul></template>"; });
define('text!components/nav/top/user/user.html', ['module'], function(module) { module.exports = "<template><ul class=\"nav\" class.bind=\"style\"><li class=\"user-link\"><compose containerless view-model=\"models/user/user\" view=\"models/user/top-nav.html\"></compose><ul class=\"dropdown-menu\"><li><a href=\"javascript:;\">Profile</a></li><li><a href=\"javascript:;\"><span class=\"badge bg-red pull-right\">50%</span> <span>Settings</span></a></li><li><a href=\"javascript:;\">Help</a></li><li><a href=\"login.html\"><i class=\"fa fa-sign-out pull-right\"></i> Log Out</a></li></ul></li></ul></template>"; });
//# sourceMappingURL=app-bundle.js.map