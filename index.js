"use strict";

function _instanceof2(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return _instanceof2(left, right);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var ClassWatcher =
/*#__PURE__*/
function () {
  function ClassWatcher(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
    var _this = this;

    _classCallCheck(this, ClassWatcher);

    _defineProperty(this, "mutationCallback", function (mutationsList) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var mutation = _step.value;

          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            var currentClassState = mutation.target.classList.contains(_this.classToWatch);

            if (_this.lastClassState !== currentClassState) {
              _this.lastClassState = currentClassState;

              if (currentClassState) {
                _this.classAddedCallback();
              } else {
                _this.classRemovedCallback();
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });

    this.targetNode = targetNode;
    this.classToWatch = classToWatch;
    this.classAddedCallback = classAddedCallback;
    this.classRemovedCallback = classRemovedCallback;
    this.observer = null;
    this.lastClassState = targetNode.classList.contains(this.classToWatch);
    this.init();
  }

  _createClass(ClassWatcher, [{
    key: "init",
    value: function init() {
      this.observer = new MutationObserver(this.mutationCallback);
      this.observe();
    }
  }, {
    key: "observe",
    value: function observe() {
      this.observer.observe(this.targetNode, {
        attributes: true
      });
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.observer.disconnect();
    }
  }]);

  return ClassWatcher;
}();

var form = document.querySelectorAll('form');

function workOnClassAdd() {
  console.log('css change');
  dataLayer.push({
    'event': 'classWatcher',
    'attributes': {
      'response': 'success'
    }
  });
}

function workOnClassRemoval() {}

for (i = 0; i < form.length; ++i) {
  var classWatcher = new ClassWatcher(form[i], 'frm-subm-ok-st', workOnClassAdd, workOnClassRemoval);
}
