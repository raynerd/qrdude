# qrdude

[![Build Status](https://travis-ci.org/raynerpupo/qrdude.svg?branch=master)](https://travis-ci.org/raynerpupo/qrdude)
[![codecov](https://codecov.io/gh/raynerpupo/qrdude/branch/master/graph/badge.svg)](https://codecov.io/gh/raynerpupo/qrdude)

This is a utility library to get some help while using the [goQR.me API](http://goqr.me/api/doc/create-qr-code/) to create a QR code from data.

### Usage
So far the library allows to validate the data to make the request, just call the `validateQrData` function.

#### Example (es module)
```js
import { validateQrData } from 'qrdude'
const validation = validateQrData({
  data: "some text",
  ...
})
if (validation.errors) {
  //handle
} else {
  //use data
  validation.data...
}
```
### TODO
- Create the URL to make the API call.

### Notes
This is a toy library under development, it uses the [TypeScript Starter](https://github.com/bitjson/typescript-starter) project to setup the initial code.
