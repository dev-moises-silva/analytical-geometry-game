import { useState } from 'react'

import Button from 'react-bootstrap/Button'

import CoordsForm from './components/CoordsForm'

import type { Coords } from './types/Coords'
import Space3D from './components/Space3D'

export default function App() {
  const [coordsSet, setCoordsSet] = useState<Coords[]>([])
  const [gameIsRunning, setGameIsRunning] = useState<boolean>(false)

  function compareCoords({x: x1, y: y1, z: z1}: Coords, {x: x2, y: y2, z: z2}: Coords) {
    return x1 === x2 && y1 === y2 && z1 === z2
  }

  function addCoords(coords: Coords) {
    if (!coordsSet.some(current => compareCoords(current, coords)))
      setCoordsSet([...coordsSet, coords])
  }

  return (
    <>
      <div className="d-flex justify-content-between p-4">
        <CoordsForm addCoords={addCoords} />
        <Button>Jogar</Button>
      </div>
      <Space3D coordsSet={coordsSet}/>
    </>
  )
}
