import * as React from "react"

function App() {
  React.useEffect(() => {
    console.log("useEffect1")
  }, [])
  React.useEffect(() => {
    console.log("useEffect2")
  }, [])
  return (
    <div>
      App works
      <p>Text context</p>
    </div>
  )
}

// class App extends React.Component {
//   componentDidMount() {
//     console.log("componentDidMount")
//   }
//   render() {
//     return <div>class component</div>
//   }
// }

export default App
