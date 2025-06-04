import { useState } from 'react'

import Button from 'react-bootstrap/Button'
import CoordsForm from './components/CoordsForm'

import Swal from 'sweetalert2'

import type { Coords } from './types/Coords'
import Space3D from './components/Space3D'

export default function App() {
  const [coordsSet, setCoordsSet] = useState<Coords[]>([])
  const [gameIsRunning, setGameIsRunning] = useState(false)
  const [playersPoints, setPlayersPoints] = useState<Record<string, number>>({})
  const [turn, setTurn] = useState(1)

  const hasActiveCoords = coordsSet.some(coords => coords.active)
  const playersQtd = 2

  function play() {
    setGameIsRunning(true)
    Swal.fire({
      titleText: 'Vez do jogador 1',
      icon: 'info'
    })
  }

  function compareCoords({x: x1, y: y1, z: z1}: Coords, {x: x2, y: y2, z: z2}: Coords) {
    return x1 === x2 && y1 === y2 && z1 === z2
  }

  function addCoords(coords: Coords) {
    if (!coordsSet.some(current => compareCoords(current, coords)))
      setCoordsSet([...coordsSet, coords])
    else 
      Swal.fire({
        titleText: `A coordenada (${coords.x}, ${coords.y}, ${coords.z}) já foi adicionada!`,
        icon: 'info'
      })
  }

  return (
    <div className='d-flex justify-content-between m-5'>
      <div>
        {!gameIsRunning && (
        <div className='d-inline-block'>
            <div className="d-flex gap-5">
              <CoordsForm addCoords={addCoords} />
              <Button disabled={!hasActiveCoords} onClick={play}>Jogar</Button>
            </div>
          </div>
        )}
        {/* {gameIsRunning && (
          
        )} */}
      </div>
      <Space3D coordsSet={coordsSet}/>
    </div>
  )
}
