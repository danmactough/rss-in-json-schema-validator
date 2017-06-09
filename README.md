# rss-in-json-schema-validator
A [JSON Schema](http://json-schema.org/) and schema validator for
[RSS-in-JSON](https://github.com/scripting/Scripting-News/tree/master/rss-in-json).

## Usage

### Basic Example

```js
// Get the feed you want to validate somehow -- here, we call it `feed`.
const { validate } = require('rss-in-json-schema-validator');
const isValid = validate(feed);

if (isValid) {
  return feed;
}
else {
  // If the feed isn't valid, decide how to handle it.
  // Here, we log the errors, then build an error object to throw.
  console.error(validate.errors);
  const e = new Error('Validation Error');
  e.validationErrors = validate.errors;
  throw e;
}
```

### Create a validator with custom options

Since we use [Ajv](https://github.com/epoberezkin/ajv) to compile and validate
the schema, we also let you create your own `validate` function using
whatever [options](https://github.com/epoberezkin/ajv#options) you like.

```js
const { createValidator } = require('rss-in-json-schema-validator');
const validate = createValidator({
  allErrors: false,
  verbose: true
});
const isValid = validate(feed);
```

## License

(The MIT License)

Copyright (c) 2017 Dan MacTough

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
