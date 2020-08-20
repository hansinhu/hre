import { h, render, useState } from '../../src/index'

function App() {
  console.log('App Called')
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <button
        onClick={() => {
          setCount(count + 1)
          setCount2(count2 + 1)}
        }
      >{count2}</button>
    </div>
  )
}

render(<App />, document.body)