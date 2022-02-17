# @haensl/react-hooks

Assorted React hooks.

[![NPM](https://nodei.co/npm/@haensl%2Freact-hooks.png?downloads=true)](https://nodei.co/npm/@haensl%2Freact-hooks/)

[![npm version](https://badge.fury.io/js/@haensl%2Freact-hooks.svg)](http://badge.fury.io/js/@haensl%2Freact-hooks)
[![CircleCI](https://circleci.com/gh/haensl/hooks.svg?style=svg)](https://circleci.com/gh/haensl/hooks)

## Installation<a name="installation"></a>

### Via `npm`

```bash
$ npm install -S @haensl/react-hooks
```

### Via `yarn`

```bash
$ yarn add @haensl/react-hooks
```

## Usage

1. [Install @haensl/react-hooks](#installation)

2. Use hooks in your components:

```javascript
import { useDebounce } from '@haensl/react-hooks';

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
* [`useBoundingClientRect`](#useBoundingClientRect): keep track of a container's [DOM rectangle](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).
* [`useClassNames`](#useClassNames): compile CSS class names from state.
* [`useDebounce`](#useDeboune): debounce a function.
* [`useIsMounted`](#useIsMounted): keep track of whether or not a component is mounted.
* [`useIsomorphicLayoutEffect`](#useIsomorphicLayoutEffect): use this instead of [`useLayoutEffect`](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) if your app uses serverside rendering (SSR).
* [`useIsScrolling`](#useIsScrolling): keep track of whether or not the user is scrolling.
* [`useOnScroll`](#useOnScroll): subscribe to scroll events.
* [`usePrevious`](#usePrevious): keep track of a variable's previous value.
* [`useWindowScroll`](#useWindowScroll): keep track of the `window`'s scroll position.
* [`useWindowSize`](#useWindowSize): keep track of the `window`'s size.

### useAnimationFrame(fn)<a name="useAnimationFrame"></a>

Uses [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to animate a function `fn`. The callback is passed one single argument, the time delta in milliseconds that has passed between this and the last call. Please check the [example](#useAnimationFrameExample) below as well as the [Codepen example](https://codepen.io/haensl/pen/GRoNGNB).

##### Example<a name="useAnimationFrameExample"></a>

```javascript
import React, { useState, useEffect } from 'react';
import { useAnimationFrame } from '@haensl/react-hooks';

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

### useBoundingClientRect(ref, [debounceMs = 25])<a name="useBoundingClientRect"></a>
Returns the DOM rectangle _(initially `null`)_ as returned by [`getBoundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) for the given container `ref`. Changes are debounced by 25 milliseconds by default. Customize the debounce interval via the optional `debounceMs` argument. Please check out the [example below](#useBoundingClientRectExample) as well as the [Codepen example](https://codepen.io/haensl/pen/YzwxqOq).

#### Example
```javascript
import React, { useRef } from 'react';
import { useBoundingClientRect } from '@haensl/react-hooks';

const RectTracker = () => {
  const ref = useRef();
  const containerRect = useBoundingClientRect(ref);

  if (!containerRect) {
    return (
      <div ref={ ref }>
        <span>no container rect</span>
      </div>
    );
  }

  return (
    <div ref={ ref }>
      <span>Container rect:</span>
      <span>Width: {containerRect.width}</span>
      <span>Height: {containerRect.height}</span>
    </div>
  );
};
```

#### [→ Codepen example](https://codepen.io/haensl/pen/YzwxqOq)

### useClassNames(states, [separator = ' '])<a name="useClassNames"></a>

Compiles a `states` object into a CSS class name string. By default all keys in `states` are joined by a space (`' '`) but you can supply a custom `separator` to cater to the needs of your CSS module naming methodology of choice. Please check the [examples below](#useClassNamesExample).

#### Example<a name="useClassNamesExample"></a>

```javascript
import React, { useState } from 'react';
import { useClassNames } from '@haensl/react-hooks';

const MyComponent = () => {
  const [stateA, setStateA] = useState(false);
  const className = useClassNames({
    MyComponent: true, // always have MyComponent in class name
    MyComponent--stateA: stateA // add MyComponent--stateA when stateA is true
  });

  // className will be 'MyComponent' or 'MyComponent MyComponent--stateA'

  return (
    <div className={ className }>
      {
        // render content
      }
    </div>
  );
};
```

#### Example: custom separator<a name="useClassNamesExampleSeparator"></a>

```javascript
import React, { useState } from 'react';
import { useClassNames } from '@haensl/react-hooks';

const MyComponent = () => {
  const [stateA, setStateA] = useState(false);
  const className = useClassNames(
    {
      MyComponent: true, // always have MyComponent in class name
      stateA // add --stateA when stateA is true
    },
    '--'
  );

  // className will either be 'MyComponent' or 'MyComponent--stateA'

  return (
    <div className={ className }>
      {
        // render content
      }
    </div>
  );
};
```

### useDebounce(fn, debounceMs)<a name="useDebounce"></a>

Uses [memoization](https://reactjs.org/docs/hooks-reference.html#usememo) to debounce `fn` by `debounceMs` milliseconds. Please check the [example below](#useDebounceExample) as well as the [Codepen example](https://codepen.io/haensl/pen/eYJBKEZ).

##### Example<a name="useDebounceExample"></a>

```javascript
import React from 'react';
import { useDebounce } from '@haensl/react-hooks';

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

### useIsMounted()<a name="useIsMounted"></a>

Returns a `function` to check whether or not the component invoking the hook is mounted.

##### Example<a name="useIsMountedExample"></a>

```javascript
import React, { useEffect } from 'react';
import { useIsMounted } from '@haensl/react-hooks';
import api from 'somewhere';

const MyComponent = () => {
  const isMounted = useIsMounted();
  // load some data from the backend
  useEffect(() => {
    api.fetchData()
      .then((data) => {
        if (isMounted()) {
          // use data only if component is still mounted
        }
      });
  }, []);
}
```

### useIsomorphicLayoutEffect(fn, deps)<a name="useIsomorphicLayoutEffect"></a>

This hooks resolves the common React warning when using `useLayoutEffect` in a serverside environment:

*Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer’s output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://fb.me/react-uselayouteffect-ssr for common fixes.*

`useIsomorphicLayoutEffect` resolves to [`useLayoutEffect`](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) on the client and [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect) on the server. Use this hook instead of `useLayoutEffect` if your app uses serverside rendering (SSR).

##### Example<a name="useIsomorphicLayoutEffectExample"></a>

```javascript
import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@haensl/react-hooks';

const MyComponent = () => {
  const ref = useRef();

  // prevents serverside rendering warning
  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      // do stuff with ref
    }
  }, [ref]);

  return (
    <div ref={ ref }>
      // ...
    </div>
  )
}
```

### useIsScrolling([el = window, scrollEndMs = 100])<a name="useIsScrolling"></a>

Returns a `boolean` indicating whether or not the user is scrolling. You can subscribe to a specific element via the first argument, `el` _(default: `window`)_. End of scrolling is determined by no incoming scroll events for `scrollEndMs` milliseconds _(default: `100`)_. Please check the [example blow](#useIsScrollingExample) as well as the [Codepen example](https://codepen.io/haensl/pen/qBbqeWz)

##### Example<a name=useIsScrollingExample></a>

```javascript
import React from 'react';
import { useIsScrolling } from '@haensl/react-hooks';

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
import { useOnScroll } from '@haensl/react-hooks';

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

### usePrevious(value)<a name="usePrevious"></a>

Keeps track of changes to a value, storing it's _previous_ state.

##### Example

```javascript
import { useEffect, useState } from 'react';
import { usePrevious, useWindowScroll } from '@haensl/react-hooks';

const ScrollDirectionTracker = () => {
  const scrollPosition = useWindowScroll();
  const previousScrollPosition = usePrevious(scrollPosition);
  const [scrollDirection, setScrollDirection] = useState('down');

  useEffect(() => {
    if (previousScrollPosition.y < scrollPosition.y) {
      setScrollDirection('down');
    } else if (previousScrollPosition.y > scrollPosition.y) {
      setScrollDirection('up');
    }
  }, [scrollPosition, previousScrollPosition]);

  return (
    <div className="ScrollDirectionTracker">
      <span>User is scrolling</span>
      <span>{ scrollDirection }px</span>
    </div>
  );
};
```

### useWindowScroll([debounceMs = 25])<a name="useWindowScroll"></a>
Returns an object _(`null` if there is no `window`)_ with properties `x` and `y` reflecting the the scroll position of the `window` or `document`. Scroll position updates are by default debounced by 25 milliseconds. This debounce interval can be customized via the optional `debounceMs` argument. Please check the [example below](#useWindowScrollExample) as well as the [Codepen example](https://codepen.io/haensl/pen/VweMJGm).

#### Example<a name="useWindowScrollExample"></a>

```javascript
import React, { useState } from 'react';
import { useWindowScroll } from '@haensl/react-hooks';

const windowScrollTracker = () => {
  const windowScroll = useWindowScroll();

  if (!windowScroll) {
    return (
      <div className="WindowScrollTracker">
        no scroll poistion
      </div>
    );
  }

  return (
    <div className="WindowScrollTracker">
      <span>Scroll x: {windowScroll.x}</span>
      <span>Scroll y: {windowScroll.y}</span>
    </div>
  );
};
```

#### [→ Codepen example](https://codepen.io/haensl/pen/VweMJGm)

### useWindowSize([debounceMs = 25])<a name="useWindowSize"></a>
Returns an object _(initially `null`)_ with properties `width` and `height` reflecting the `innerWidth` and `innerHeight` of the `window` object. Size updates are by default debounced by 25 milliseconds. This debounce interval can be customized via the optional `debounceMs` argument. Please check the [example below](#useWindowSizeExample) as well as the [Codepen example](https://codepen.io/haensl/pen/mdVMVxY).

#### Example<a name="useWindowSizeExample"></a>

```javascript
import React, { useState } from 'react';
import { useWindowSize } from '@haensl/react-hooks';

const WindowSizeTracker = () => {
  const windowSize = useWindowSize();

  if (!windowSize) {
    return (
      <div className="WindowSizeTracker">
        <span>No window size</span>
      </div>
    );
  }

  return (
    <div className="WindowSizeTracker">
      <span>Window Size:</span>
      <span>width: { windowSize.width }px</span>
      <span>height: { windowSize.height }px</span>
    </div>
  );
};
```

#### [→ Codepen example](https://codepen.io/haensl/pen/mdVMVxY)

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
