import { useState } from "react"

export const useForms = ({initialForm}) => {
  const [formState, setFormState] = useState(initialForm)

  const onInputChange = (e) => {
    const {name, value} = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }
  
  const onReset = () => {
    setFormState(initialForm)
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onReset
  }
}
