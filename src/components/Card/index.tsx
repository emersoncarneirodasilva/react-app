import './styles.css'

export type CardProps = {
  name: string
  time: string
}

export default function Card(props: CardProps) {     // Também pode destruturar a props em { name, time }
  return (
    <div className='card'>
      <strong>{props.name}</strong>                  {/* Fazendo a destruturação, só é preciso colocar o valor {name} */} 
      <small>{props.time}</small>                    {/* Fazendo a destruturação, só é preciso colocar o valor {time} */}
    </div>
  )
}