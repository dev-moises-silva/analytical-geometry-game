import { useEffect, useRef } from 'react'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

import type { Coords } from '../../types/Coords'

type Props = {
  coordsSet: Coords[]
}

export default function Space3D({ coordsSet } : Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function makeTextSprite(message: string, color = '#000000', fontSize = 64) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')!

    const padding = 20
    context.font = `${fontSize}px Arial`

    const textWidth = context.measureText(message).width
    const width = textWidth + padding * 2
    const height = fontSize + padding * 2

    canvas.width = width
    canvas.height = height

    context.font = `${fontSize}px Arial`
    context.textBaseline = 'top'
    context.fillStyle = color
    context.fillText(message, padding, padding)

    const texture = new THREE.CanvasTexture(canvas)
    texture.minFilter = THREE.LinearFilter
    texture.needsUpdate = true

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
    })

    const sprite = new THREE.Sprite(material)

    const baseScale = 3
    const aspect = width / height
    sprite.scale.set(baseScale * aspect, baseScale, 1)

    return sprite
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvasSize = 500
    const unitsPerPixels = 1 / (canvasSize / 54)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    })
    renderer.setSize(canvasSize, canvasSize, true)
    renderer.setClearColor(0xffffff, 1)
    renderer.setPixelRatio(window.devicePixelRatio)

    const scene = new THREE.Scene()

    const camera = new THREE.OrthographicCamera(
      (-canvasSize / 2) * unitsPerPixels,
      (canvasSize / 2) * unitsPerPixels,
      (canvasSize / 2) * unitsPerPixels,
      (-canvasSize / 2) * unitsPerPixels,
      0.1,
      1000,
    )

    camera.position.set(27, 27, 27)
    camera.lookAt(0, 0, 0)

    const axlesDef = [
      {
        points: [new THREE.Vector3(-25, 0, 0), new THREE.Vector3(25, 0, 0)],
        color: 0x00ff00,
        direction: new THREE.Vector3(1, 0, 0),
        text: 'X'
      },
      {
        points: [new THREE.Vector3(0, -25, 0), new THREE.Vector3(0, 25, 0)],
        color: 0xff0000,
        direction: new THREE.Vector3(0, 1, 0),
        text: 'Y'
      },
      {
        points: [new THREE.Vector3(0, 0, -25), new THREE.Vector3(0, 0, 25)],
        color: 0x0000ff,
        direction: new THREE.Vector3(0, 0, 1),
        text: 'Z'
      },
    ]

    axlesDef.forEach(({ points, color, direction, text }) => {
      const lineMaterial = new THREE.LineBasicMaterial({ color })
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const axle = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(axle)

      const arrow = new THREE.ArrowHelper(direction, new THREE.Vector3(0, 0, 0), 26, color, 1.5, 1)
      scene.add(arrow)

      const colorText = '#' + color.toString(16).padStart(6, '0')
      const label = makeTextSprite(text, colorText)
      label.position.copy(points[1].clone().addScaledVector(direction, 1.5))
      scene.add(label)
      console.log('Sprite:', label.position, label.scale)
    })

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.02

    controls.minZoom = 0.5
    controls.maxZoom = 1

    controls.target.set(0, 0, 0)
    controls.rotateSpeed = 0.8
    controls.zoomSpeed = 1.2

    controls.minPolarAngle = 0.2
    controls.maxPolarAngle = Math.PI - 0.2

    coordsSet.forEach(({ x, y, z, active }) => {
      const sphereGeometry = new THREE.SphereGeometry(0.4, 32, 32)
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: active ? 0xff0000 : 0x000000 })
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

      sphere.position.set(x, y, z)
      scene.add(sphere)

      const coordsText = `(${x}, ${y}, ${z})`
      const label = makeTextSprite(coordsText, '#000000', 32)
      label.position.set(x, y + 1, z)
      scene.add(label)
    })

    let animateId: number

    function animate() {
      animateId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    return () => cancelAnimationFrame(animateId)
  }, [coordsSet])

  return <canvas ref={canvasRef}></canvas>
}
