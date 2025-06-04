import { useFormik } from "formik";
import { Form, InputGroup } from "react-bootstrap";

type Props = {
  setEquation: (equation: string) => void,
  readOnly?: boolean
}

export default function EquationForm({ setEquation, readOnly } : Props) {
  const formik = useFormik({
    initialValues: {
      equation: ''
    },
    onSubmit: ({ equation }, { resetForm }) => {
      setEquation(equation)
      resetForm()
    }
  })

  return (
    <Form>
      <InputGroup>
        <Form.Control value={formik.values.equation} name='equation' readOnly={readOnly} placeholder='Equação'>

        </Form.Control>
      </InputGroup>
    </Form>
  )
}