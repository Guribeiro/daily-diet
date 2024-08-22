import { TextInputProps, View } from 'react-native'
import styled from 'styled-components/native'

const LabelWrapper = styled.View`
  margin-bottom: 6px;
`

const Label = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.XS}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme}) => theme.COLORS.GRAY_200};
`

interface InputFieldProps {
  multiline?: boolean
}

const InputField = styled.TextInput<InputFieldProps>`
  border: 1px solid ${({theme}) => theme.COLORS.GRAY_500};
  padding: 8px;
  border-radius: 8px;
  color: ${({theme}) => theme.COLORS.GRAY_100};
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  min-height: 48px;
`


interface InputProps extends TextInputProps {
  label?:string;
}

export const Input = ({label,multiline,...rest}:InputProps) => {
  return (
    <View>
      {label && (
        <LabelWrapper>
          <Label>{label}</Label>
        </LabelWrapper>
      )}
      <InputField style={multiline && {textAlignVertical: 'top'}} multiline={multiline} {...rest} />
    </View>
  )
}