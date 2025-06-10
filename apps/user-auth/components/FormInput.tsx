import React from 'react'
import {Controller, Control} from 'react-hook-form'
import CustomTextInput from './CustomTextInput'

interface FormInputProps {
	name: string
	control: Control<any>
	placeholder: string
	secureTextEntry?: boolean
	rules?: object
}

const FormInput = ({name, control, placeholder, secureTextEntry, rules}: FormInputProps) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({field: {onChange, value}, fieldState: {error}}) => (
				<CustomTextInput
					placeholder={placeholder}
					value={value}
					onChangeText={onChange}
					secureTextEntry={secureTextEntry}
					error={error?.message}
				/>
			)}
		/>
	)
}

export default FormInput
