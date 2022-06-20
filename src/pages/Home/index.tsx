import './styles.css';
import  Card, { CardProps } from '../../components/Card';
import { useEffect, useState } from 'react';

type ProfileResponse = {
  name: string
  location: string
  avatar_url: string
}

type User = {
  name: string
  location: string
  avatar: string
}

export default function Home() {
  const [studentName, setStudentName] = useState("")
  const [students, setStudents] = useState<CardProps[]>([])
  const [user, setUser] = useState<User>({} as User)

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents(prevState => [...prevState, newStudent]) // O prevState serve para recuperar os dados ja utilizados (Obs: teste sem ele pra ver)
  }

  let url = "https://api.github.com/users/emersoncarneirodasilva"

  useEffect(() => {
  // Corpo do useEffect (onde serão executadas as ações)
    /*fetch(url)
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          location: data.location,
          avatar: data.avatar_url,
        })
      })
      .catch(error => console.error(error))
  }, []) // Obs: A execução do useffect é feita com a renderização dos componentes
  */
    // Forma assincrona do useEffet usando fetch
    async function fetchData() {     
      const response = await fetch(url)
      const data = await response.json() as ProfileResponse
      setUser({
        name: data.name,
        location: data.location,
        avatar: data.avatar_url,
      })
    }

    fetchData()
  }, [])      

  return (
    <div className='container'>    
      <header>
        <h1>Lista de Presença</h1>        
        <div>
          <div className='container_inter'>
            <strong>{user.name}</strong>
            <small>{user.location}</small>
          </div>          
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input type="text" placeholder="Digite o nome..." onChange={e => setStudentName(e.target.value)} />
      <button type="button" onClick={handleAddStudent}>Adicionar</button>    
     
      {
        students.map(student => (<Card key={student.time} name={student.name} time={student.time} />)) // Elementos JavaScript são colocados entre {} no JSX
      }
    </div>    
  )
}

