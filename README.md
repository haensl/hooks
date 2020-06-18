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
* [`useIsScrolling`](#useIsScrolling): keep track of whether or not the user is scrolling.
* [`useOnScroll`](#useOnScroll): subscribe to scroll events.

### useAnimationFrame(fn)<a name="useAnimationFrame"></a>

Uses [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to animate a function `fn`. The callback is passed one single argument, the time delta in milliseconds that has passed between this and the last call. Please check the [example](#useAnimationFrameExample) below as well as the [Codepen example](https://codepen.io/haensl/pen/GRoNGNB).

##### Example<a name="useAnimationFrameExample"></a>

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

#### [→ Codepen example](https://codepen.io/haensl/pen/GRoNGNB)

### useDebounce(fn, debounceMs)<a name="useDebounce"></a>

Uses [memoization](https://reactjs.org/docs/hooks-reference.html#usememo) to debounce `fn` by `debounceMs` milliseconds. Please check the [example below](#useDebounceExample) as well as the [Codepen example](https://codepen.io/haensl/pen/eYJBKEZ).

##### Example<a name="useDebounceExample"></a>

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

#### [→ Codepen example](https://codepen.io/haensl/pen/eYJBKEZ)

### useIsScrolling([el = window, scrollEndMs = 100])<a name="useIsScrolling"></a>

Returns a `boolean` indicating whether or not the user is scrolling. You can subscribe to a specific element via the first argument, `el` _(default: `window`)_. End of scrolling is determined by no incoming scroll events for `scrollEndMs` milliseconds _(default: `100`)_. Please check the [example blow](#useIsScrollingExample) as well as the [Codepen example](https://codepen.io/haensl/pen/qBbqeWz)

##### Example<a name=useIsScrollingExample>

```javascript
import React from 'react';
import { useIsScrolling } from '@haensl/hooks';

const UserScrollTracker = () => {
  const isScrolling = useIsScrolling();

  return (
    <span>The user is currently { isScrolling ? '' : 'not' } scrolling</span>
  );
};
```

#### [→ Codepen example](https://codepen.io/haensl/pen/qBbqeWz)

### useOnScroll(fn, [el = window])<a name="useOnScroll"></a>

Subscribes to [`scroll`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event) events on the given element `el` _(default: `window`)_. The callback function `fn` is passed the [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event). Please check the [example below](#useOnScrollExample) as well as the [Codepen example](https://codepen.io/haensl/pen/wvMoLJK).

##### Example

```javascript
import React, { useState } from 'react';
import { useOnScroll } from '@haensl/hooks';

const WindowScrollTracker = () => {
  const [windowScroll, setWindowScroll] = useState(0);

  useOnScroll(() => {
    setWindowScroll(window.scrollY);
  });

  return (
    <div className="WindowScrollTracker">
      <span>Window has scrolled down</span>
      <span>{ windowScroll }px</span>
    </div>
  );
};
```

#### [→ Codepen example](https://codepen.io/haensl/pen/wvMoLJK)

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
