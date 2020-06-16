# @haensl/hooks

Assorted React hooks.

[![NPM](https://nodei.co/npm/@haensl%2Fhooks.png?downloads=true)](https://nodei.co/npm/@haensl%2Fhooks/)

[![npm version](https://badge.fury.io/js/@haensl%2Fhooks.svg)](http://badge.fury.io/js/@haensl%2Fhooks)
[![CircleCI](https://circleci.com/gh/haensl/hooks.svg?style=svg)](https://circleci.com/gh/haensl/hooks)

## Installation<a name="installation"></a>

### Via `npm`

```bash
$ npm install -S @haensl/hooks
```

### Via `yarn`

```bash
$ yarn add @haensl/hooks
```

## Usage

1. [Install @haensl/hooks](#installation)

2. Use hooks in your components:

```javascript
import { useDebounce } from '@haensl/hooks';

const DebouncedButton = () => {
  const handler = useDebounce(() => {
    console.log('click');
  }, 50);

  return (
    <button
      onClick={ handler }
    >click me</button>
  );
};
```

## Available hooks

* [`useDebounce`](#useDeboune): debounce a function.

### useDebounce(fn, debounceMs)<a name="useDebounce"></a>

Uses [memoization](https://reactjs.org/docs/hooks-reference.html#usememo) to debounce `fn` by `debounceMs` milliseconds.

##### Example

```javascript
import { useDebounce } from '@haensl/hooks';

const DebouncedButton = () => {
  const handler = useDebounce(() => {
    console.log('click');
  }, 50); // handler only fires when there were no calls for 50ms.

  return (
    <button
      onClick={ handler }
    >click me</button>
  );
};
```


## [Changelog](CHANGELOG.md)

## [License](LICENSE)
