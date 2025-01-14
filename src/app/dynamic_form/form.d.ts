export interface InputProps {
  type: 'text' | 'radio' | 'email' | 'password' | 'select' | 'checkbox'
  name: string
  value: string | number | boolean
  placeholder?: string
  label?: string

  typeValue?: 'boolean' | 'number'
  validations?: Validation[]
  options?: Opt[]
}

export interface Opt {
  value: string | number
  desc: string
}

export interface Validation {
  type: 'required' | 'isEmail' | 'minLength' | 'isTrue' | 'oneOf'
  value?: string | number | boolean
  message: string
  ref?: string
}
export type FormSection = 'register'
interface Props {
  onSubmit: (data: unknown) => void
  labelButtonSubmit?: string
  titleForm?: string
  initialValues: unknown
  validationSchema: SchemaForm
  inputs: InputProps[]
}