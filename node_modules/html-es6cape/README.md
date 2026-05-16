# html-es6cape

[![version](https://img.shields.io/npm/v/html-es6cape.svg)](http://npm.im/html-es6cape)
[![issues](https://img.shields.io/github/issues-raw/antoniovdlc/html-es6cape.svg)](https://github.com/AntonioVdlC/html-es6cape/issues)
[![downloads](https://img.shields.io/npm/dt/html-es6cape.svg)](http://npm.im/html-es6cape)
[![license](https://img.shields.io/npm/l/html-es6cape.svg)](http://opensource.org/licenses/MIT)

Escape HTML special characters (including `). 
> Please note the pun in the package name! :zap:

## Installation

This package is distributed via npm:

```
npm install html-es6cape
```

## Usage

```javascript
const escape = require("html-es6cape");

var unescapedString = `This is an evil unescaped string <"'&'">! #whoopwhoop`;
var escapedString = escape(unescapedString);
// "This is a nice escaped string &lt;&quot;&#39;&amp;&#39;&quot;&gt;! #whoopwhoop"
```

*- or -*

```javascript
import escape from "html-es6cape";

var unescapedString = `This is an evil unescaped string <"'&'">! #whoopwhoop`;
var escapedString = escape(unescapedString);
// "This is a nice escaped string &lt;&quot;&#39;&amp;&#39;&quot;&gt;! #whoopwhoop"
```

*- or -*

```javascript
import escape from "html-es6cape";

var escapedString = escape`This is an evil unescaped string <"'&'">! #whoopwhoop`;
// "This is a nice escaped string &lt;&quot;&#39;&amp;&#39;&quot;&gt;! #whoopwhoop"
```

## License
MIT

## Thanks
Special thanks to my family, my friends, my bae ... and [Kent C. Dodds](https://github.com/kentcdodds) for his series ["How to Write a JavaScript Library."](https://egghead.io/series/how-to-write-an-open-source-javascript-library)!
