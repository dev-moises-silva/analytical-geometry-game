export function useLine(equation: string) {
  const reg = /\(\s*x\s*,\s*y\s*,\s*z\s*\)\s*=\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)\s*\+\s*u\s*\*\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/

  const match = equation.match(reg)


  if (match) {
    const x = parseFloat(match[0])
    const y = parseFloat(match[1])
    const z = parseFloat(match[2])
    const a = parseFloat(match[3])
    const b = parseFloat(match[4])
    const c = parseFloat(match[5])

    return {x, y, z, a, b, c}
  }

  return null
}