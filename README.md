<h1 align="center">Hre</h1>
<p align="center">简析 React 原理，仅用于本地🏃</p>

### Feature

- :tada: Functional Component and hooks API
- :confetti_ball: Concurrent and Suspense
- :telescope: keyed reconcilation algorithm


### Use

```js
import { h, render, useState } from 'hre'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

render(<App />, document.getElementById('root'))
```

#### useState

`useState` is a base API, It will receive initial state and return a Array

You can use it many times, new state is available when component is rerender

```js
function App() {
  const [up, setUp] = useState(0)
  const [down, setDown] = useState(0)
  return (
    <div>
      <h1>{up}</h1>
      <button onClick={() => setUp(up + 1)}>+</button>
      <h1>{down}</h1>
      <button onClick={() => setDown(down - 1)}>-</button>
    </div>
  )
}
```

#### useReducer

`useReducer` and `useState` are almost the same，but `useReducer` needs a global reducer

```js
function reducer(state, action) {
  switch (action.type) {
    case 'up':
      return { count: state.count + 1 }
    case 'down':
      return { count: state.count - 1 }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 1 })
  return (
    <div>
      {state.count}
      <button onClick={() => dispatch({ type: 'up' })}>+</button>
      <button onClick={() => dispatch({ type: 'down' })}>+</button>
    </div>
  )
}
```

#### useEffect

It is the execution and cleanup of effects, which is represented by the second parameter

```
useEffect(f)       //  effect (and clean-up) every time
useEffect(f, [])   //  effect (and clean-up) only once in a component's life
useEffect(f, [x])  //  effect (and clean-up) when property x changes in a component's life
```

```js
function App({ flag }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = 'count is ' + count
  }, [flag])
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

If it return a function, the function can do cleanups:

```js
useEffect(() => {
    document.title = 'count is ' + count
    reutn () => {
      store.unsubscribe()
    }
}, [])
```

#### useLayout

More like useEffect, but useEffect queue in `requestAnimationFrame`, but useLayout is sync and block commitWork.

```js
useLayout(() => {
  document.title = 'count is ' + count
}, [flag])
```

#### useMemo

`useMemo` has the same parameters as `useEffect`, but `useMemo` will return a cached value.

```js
function App() {
  const [count, setCount] = useState(0)
  const val = useMemo(() => {
    return new Date()
  }, [count])
  return (
    <div>
      <h1>
        {count} - {val}
      </h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

#### useCallback

`useCallback` is based `useMemo`, it will return a cached function.

```js
const cb = useCallback(() => {
  console.log('cb was cached')
}, [])
```

#### useRef

`useRef` will return a function or an object.

```js
function App() {
  useEffect(() => {
    console.log(t) // { current:<div>t</div> }
  })
  const t = useRef(null)
  return <div ref={t}>t</div>
}
```

If it use a function, It can return a cleanup and exectes when removed.

```js
function App() {
  const t = useRef(dom => {
    if (dom) {
      doSomething()
    } else {
      cleanUp()
    }
  })
  return flag && <span ref={t}>I will removed</span>
}
```

### Fragments

Fragments will not create dom element.

```jsx
<>someThing</>
```

The above code needs babel plugin `@babel/plugin-transform-react-jsx`

```json
[
  "@babel/plugin-transform-react-jsx",
  {
    "pragma": "h",
    "pragmaFrag": "Fragment"
  }
]
```

#### time slicing

Time slicing is the scheduling of reconcilation, synchronous tasks, sacrifice CPU and reduce blocking time

#### Suspense

Suspense is the scheduling of promise, asynchronous tasks, break current tasks, and continue tasks after promise resolve

#### key-based reconcilation

Hre implements a compact reconcilation algorithm support keyed, which also called diff.

It uses hash to mark locations to reduce much size.

#### License

_MIT_ ©yisar inspired by [react](https://github.com/facebook/react) [preact](https://github.com/preactjs/preact) [anu](https://github.com/RubyLouvre/anu)
