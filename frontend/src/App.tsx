import { useEffect, useState } from 'react'
import { UserAPI } from '../apis/UserAPI.tsx'
import './App.css'

interface User {
  username: string,
  lastaction: string,
}

function App() {
  const [count, setCount] = useState(0)
  const [userList, setUserList] = useState<Array<User>>([])
  const [currentUser, setCurrentUser] = useState<User>()

  useEffect(() => {
    UserAPI.getAllUsers().then((users) => {
      setUserList(users)
    })

  }, [])
  
  const updateUser = async function (id:string) {
    UserAPI.getUserByID(id).then((user) => {
      setCurrentUser(user)
    })
  }

  return (
    <>
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
        <button onClick={() => updateUser('6538582c3f068a67f6a901bf')}>
          current user is {currentUser?.username}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
