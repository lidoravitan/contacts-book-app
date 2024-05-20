import styled from '@emotion/styled'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'

type FormProviderProps<T extends FieldValues> = {
  methods: UseFormReturn<T>
  children: React.ReactNode
  onSubmit?: (data: T) => void
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`

export function Form<T extends FieldValues>({ children, onSubmit = () => {}, methods }: FormProviderProps<T>) {
  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>{children}</StyledForm>
    </FormProvider>
  )
}
