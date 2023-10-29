import { useEffect, useState } from 'react'
import { UserAPI } from '../apis/UserAPI.tsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface User {
  username: string,
  lastaction: string,
}

function App() {
  const [count, setCount] = useState(0)
  const [userList, setUserList] = useState<Array<User>>([])

  useEffect(() => {
    // async function getUsers() {
    //   fetch('http://localhost:3000/users/', { method: 'GET', mode: 'cors' })
    //     .then((response) => response.json())
    //     .then((users) => setUserList(users))
    // }
    // getUsers()
    UserAPI.getUsers().then((users) => {
      setUserList(users)
    })

  }, [])
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {userList.map((user, key) => (
          <p key={key}>Username: {user.username} || Last Login: {user.lastaction}</p>
        ))}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
