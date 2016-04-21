'use strict';
window['byDataHook'] = function (dataHook) {
    return "[data-hook='" + dataHook + "']";
};
var WixComponentTestDriver = (function () {
    function WixComponentTestDriver() {
        this.childDrivers = [];
        this.body = angular.element(document.body);
    }
    Object.defineProperty(WixComponentTestDriver.prototype, "element", {
        get: function () {
            this.verifyRendered();
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WixComponentTestDriver.prototype, "scope", {
        get: function () {
            this.verifyRendered();
            return this._scope;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WixComponentTestDriver.prototype, "isRendered", {
        get: function () {
            return !!this._scope;
        },
        enumerable: true,
        configurable: true
    });
    WixComponentTestDriver.prototype.connectToBody = function () {
        this.verifyRendered();
        this.body.append(this.templateRoot);
    };
    WixComponentTestDriver.prototype.disconnectFromBody = function () {
        if (this.templateRoot) {
            this.templateRoot.remove();
        }
        if (this.appendedToBody) {
            this._element.remove();
        }
    };
    WixComponentTestDriver.prototype.applyChanges = function () {
        this.$rootScope.$digest();
    };
    WixComponentTestDriver.prototype.findByDataHook = function (dataHook) {
        return angular.element(this.element[0].querySelector(byDataHook(dataHook)));
    };
    WixComponentTestDriver.prototype.findAllByDataHook = function (dataHook) {
        return angular.element(this.element[0].querySelectorAll(byDataHook(dataHook)));
    };
    WixComponentTestDriver.prototype.renderFromTemplate = function (template, args, selector) {
        var _this = this;
        if (args === void 0) { args = {}; }
        inject(function ($rootScope, $compile) {
            _this.$rootScope = $rootScope;
            _this.$compile = $compile;
        });
        var scope = this.$rootScope.$new();
        scope = angular.extend(scope, args);
        this.templateRoot = angular.element(template);
        this.$compile(this.templateRoot)(scope);
        this.$rootScope.$digest();
        this.initializeDriver(this.templateRoot, selector);
        this.$rootScope.$watch(function () { return _this.initChildDrivers(); });
    };
    WixComponentTestDriver.prototype.initChildDrivers = function () {
        var _this = this;
        this.childDrivers.forEach(function (child) {
            if (child.type === 0 /* CHILD_REGULAR */) {
                _this.initRegularChild(child);
            }
            else if (child.type === 1 /* CHILD_ARRAY */) {
                _this.initArrayChild(child);
            }
        });
    };
    WixComponentTestDriver.prototype.defineChild = function (childDriver, selector) {
        return this.defineIndexedChild(childDriver, selector, 0);
    };
    WixComponentTestDriver.prototype.defineChildren = function (factory, selector) {
        var children = [];
        this.childDrivers.push({
            type: 1 /* CHILD_ARRAY */,
            selector: selector,
            factory: factory,
            drivers: children,
            fullDriversArr: []
        });
        return children;
    };
    WixComponentTestDriver.prototype.defineIndexedChild = function (childDriver, selector, selectorIndex) {
        if (selectorIndex === void 0) { selectorIndex = 0; }
        this.childDrivers.push({
            selector: selector,
            selectorIndex: selectorIndex,
            type: 0 /* CHILD_REGULAR */,
            drivers: [childDriver]
        });
        childDriver.parent = this;
        return childDriver;
    };
    WixComponentTestDriver.prototype.initializeDriver = function (containingElement, selector, selectorIndex) {
        if (selectorIndex === void 0) { selectorIndex = 0; }
        var searchElement = this.appendedToBody ? this.body : containingElement;
        this._element = selector ? angular.element(searchElement[0].querySelectorAll(selector)[selectorIndex]) : containingElement;
        this._scope = this._element.isolateScope() || this._element.scope();
        if (this.isRendered) {
            this.initChildDrivers();
        }
    };
    WixComponentTestDriver.prototype.initArrayChild = function (child) {
        var _this = this;
        child.drivers.splice(0, child.drivers.length);
        [].forEach.call(this._element[0].querySelectorAll(child.selector), function (item, index) {
            if (child.fullDriversArr.length <= index) {
                child.fullDriversArr.push(_this.defineIndexedChild(child.factory(item, index), child.selector, index));
            }
            child.drivers.push(child.fullDriversArr[index]);
        });
    };
    ;
    WixComponentTestDriver.prototype.initRegularChild = function (child) {
        var childDriver = child.drivers[0];
        childDriver.initializeDriver(this._element, child.selector, child.selectorIndex);
        childDriver.$compile = this.$compile;
        childDriver.$rootScope = this.$rootScope;
    };
    ;
    WixComponentTestDriver.prototype.verifyRendered = function () {
        if (this.parent) {
            this.parent.verifyRendered();
        }
        else {
            this.initChildDrivers();
        }
        if (!this.isRendered) {
            throw 'cannot interact with driver before element is rendered';
        }
    };
    return WixComponentTestDriver;
}());
//# sourceMappingURL=turnerjs-driver.js.map