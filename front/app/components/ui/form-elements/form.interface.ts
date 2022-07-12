import { EditorProps } from 'draft-js'
import { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes, HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}
export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}

type TypeInputPropsFields = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IField extends TypeInputPropsFields {}

type TypeEditorPropsField = EditorProps & IFieldProps

export interface ITextEditor extends Omit<TypeEditorPropsField, 'editorState'> {
	onChange: (...event: any[]) => void
	value: string
}

export interface IUploadField extends HTMLAttributes<HTMLInputElement> {
	folder?: string
	value?: string
	onChange: (...event: any[]) => void
  placeholder: string
  error?: FieldError
  style?: CSSProperties
  isNoImage?: boolean
}
