"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Global=void 0;var _react=_interopRequireWildcard(require("react")),Themes=_interopRequireWildcard(require("../Themes")),_Template=_interopRequireDefault(require("../Themes/_Template")),_styledComponents=require("styled-components");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)if(Object.prototype.hasOwnProperty.call(a,c)){var d=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(a,c):{};d.get||d.set?Object.defineProperty(b,c,d):b[c]=a[c]}return b["default"]=a,b}function _objectSpread(a){for(var b=1;b<arguments.length;b++){var c=null==arguments[b]?{}:arguments[b],d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){_defineProperty(a,b,c[b])})}return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _templateObject(){var a=_taggedTemplateLiteral(["\n    body {\n        margin: 0;\n        padding: 0;\n        ","\n    }\n\n    ","\n"]);return _templateObject=function(){return a},a}function _taggedTemplateLiteral(a,b){return b||(b=a.slice(0)),Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(b)}}))}var GlobalContext=(0,_styledComponents.createGlobalStyle)(_templateObject(),function(a){var b=a.theme;return"\n            color: ".concat(b.colors.text,";\n            font-family: ").concat(b.font.family,";\n        ")},function(a){var b=a.style,c=a.theme;return b?b(c):""}),Global=function(a){var b=a.children,c=a.style,d=a.theme,e=void 0===d?"default":d,f=a.extend,g=void 0===f?{}:f;return e=_objectSpread({},_Template["default"],Themes[e],g),_react["default"].createElement(_styledComponents.ThemeProvider,{theme:e},_react["default"].createElement(_react.Fragment,null,_react["default"].createElement(GlobalContext,{style:c}),b))};exports.Global=Global;