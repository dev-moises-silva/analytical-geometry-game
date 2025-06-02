import { useFormik } from 'formik'

import { IoAdd } from 'react-icons/io5'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'

import type { Coords } from '../../types/Coords'

type Props = {
  addCoords(coords: Coords): void
}

export default function CoordsForm({ addCoords }: Props) {
  const formik = useFormik({
    initialValues: {
      x: 0,
      y: 0,
      z: 0,
    },
    onSubmit: (values, { resetForm }) => {
      addCoords({ ...values, active: true })
      resetForm()
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Button type="submit">
          <IoAdd />
        </Button>
        <FormControl
          name="x"
          value={formik.values.x}
          required
          type="number"
          min="-20"
          max="20"
          onChange={formik.handleChange}
        />
        <InputGroup.Text>,</InputGroup.Text>
        <FormControl
          name="y"
          value={formik.values.y}
          required
          type="number"
          min="-20"
          max="20"
          onChange={formik.handleChange}
        />
        <InputGroup.Text>,</InputGroup.Text>
        <FormControl
          name="z"
          value={formik.values.z}
          required
          type="number"
          min="-20"
          max="20"
          onChange={formik.handleChange}
        />
      </InputGroup>
    </Form>
  )
}
