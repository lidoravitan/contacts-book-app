import { Input, InputProps } from 'antd'
import { Controller, useFormContext } from 'react-hook-form'

export function FormInput({ ...props }: InputProps & { name: string }) {
  const { control } = useFormContext()
  return (
    <Controller
      name={props.name}
      control={control}
      defaultValue={props.defaultValue}
      render={({ field }) => (
        <Input
          {...props}
          {...field}
          allowClear
          onChange={(event) =>
            props.type === 'number' ? field.onChange(Number(event.target.value)) : field.onChange(event.target.value)
          }
        />
      )}
    />
  )
}
