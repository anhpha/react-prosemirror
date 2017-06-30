'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prosemirror = require('prosemirror');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Component) {
	_inherits(_class, _Component);

	function _class(props) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		_this.displayName = 'ProseMirror';
		return _this;
	}

	_createClass(_class, [{
		key: 'render',
		value: function render() {
			// return <div ref={(el) => this.pm = el}>
			return _react2.default.createElement('div', { ref: 'pm' });
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(props) {
			if ('value' in props || 'valueLink' in props) {
				var value = props.value || 'valueLink' in props && props.valueLink.value || '';

				if (value !== this._lastValue) {
					this.pm.setContent(value, props.options.docFormat);
					this._lastValue = value;
				}
			}
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			this._lastValue = this.props.value;
			if (this._lastValue === undefined && 'valueLink' in this.props) {
				this._lastValue = this.props.valueLink.value;
			}
			if (this._lastValue === undefined) {
				this._lastValue = this.props.defaultValue;
			}

			var options = Object.assign({ doc: this._lastValue }, this.props.options);
			if (options.doc === undefined || options.doc === null) {
				// We could fall back to an empty string, but that wouldn't work for the json
				// docFormat. Setting docFormat to null allows ProseMirror to use its own
				// default empty document.
				options.doc = null;
				options.docFormat = null;
			}
			this.pm = new _prosemirror.ProseMirror(options);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.refs.pm.appendChild(this.pm.wrapper);
			this.pm.on('change', function () {
				var callback = _this2.props.onChange || 'valueLink' in _this2.props && _this2.props.valueLink.requestChange;

				if (callback) {
					_this2._lastValue = _this2.pm.getContent(_this2.props.options.docFormat);
					callback(_this2._lastValue);
				}
			});
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(_ref) {
			var _this3 = this;

			var previous = _ref.options;

			var current = this.props.options;
			Object.keys(current).forEach(function (k) {
				if (current[k] !== previous[k]) {
					try {
						_this3.pm.setOption(k, current[k]);
					} catch (e) {
						console.error(e);
						console.warn('Are you creating "' + k + '" in your render function? If so it will fail the strict equality check.');
					}
				}
			});
		}
	}, {
		key: 'getContent',
		value: function getContent() {
			var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.options.docFormat;

			return this.pm.getContent(type);
		}
	}]);

	return _class;
}(_react.Component);

_class.propTypes = {
	options: _propTypes2.default.object,
	defaultValue: _propTypes2.default.any,
	value: _propTypes2.default.any,
	onChange: _propTypes2.default.func,
	valueLink: _propTypes2.default.shape({
		value: _propTypes2.default.any,
		requestChange: _propTypes2.default.func
	})
};
exports.default = _class;