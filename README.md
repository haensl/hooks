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

* [`useAnimationFrame`](#useAnimationFrame): animate a function.
* [`useDebounce`](#useDeboune): debounce a function.

### useAnimationFrame(fn)<a name="useAnimationFrame"></a>

Uses [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to animate `fn`.

##### Example

```javascript
import React, { useState, useEffect } from 'react';
import { useAnimationFrame } from '@haensl/hooks';

const AnimatedTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useAnimationFrame((dt) => {
    setElapsed(elapsed + dt);
  });

  useEffect(() => {
    if (elapsed >= 1000) {
      setSeconds(seconds + 1);
      setElapsed(elapsed - 1000);
    }
  }, [elapsed]);

  return (
    <span>{ seconds }</span>
  );
};
```

### useDebounce(fn, debounceMs)<a name="useDebounce"></a>

Uses [memoization](https://reactjs.org/docs/hooks-reference.html#usememo) to debounce `fn` by `debounceMs` milliseconds.

##### Example

```javascript
import React from 'react';
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
