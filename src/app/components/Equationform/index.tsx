import { useFormik } from "formik";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  setEquation: (equation: string) => void,
}

export default function EquationForm({ setEquation } : Props) {
  const formik = useFormik({
    initialValues: {
      equation: ''
    },
    onSubmit: ({ equation }, { resetForm }) => {
      setEquation(equation)
      resetForm()
    },
  })

  return (
    <Form>
      <InputGroup>
        <Form.Control 
          value={formik.values.equation} 
          name='equation' 
          placeholder='Equação vetorial da reta...' 
          onChange={formik.handleChange}
          isInvalid={!!(formik.touched.equation && formik.errors.equation)}
        />
        <Button type='submit'><FaArrowRight /></Button>
      </InputGroup>
      <Form.Text className='text-danger'>
        {formik.touched.equation && formik.errors.equation}
      </Form.Text>
    </Form>
  )
}