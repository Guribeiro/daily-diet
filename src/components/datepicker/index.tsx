import { useCallback, useMemo, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native'
import DateTimePicker, { BaseProps, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import styled, { useTheme } from 'styled-components/native'
import dayjs from 'dayjs';

const Container = styled.View`
  flex: 1;
`

const LabelWrapper = styled.View`
  margin-bottom: 6px;
`

const Label = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.XS}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme}) => theme.COLORS.GRAY_200};
`

const InputField = styled.View`
  border: 1px solid ${({theme}) => theme.COLORS.GRAY_500};
  padding: 8px;
  border-radius: 8px;
  min-height: 48px;
  justify-content: center;
`
const InputFieldText = styled.Text`
  color: ${({theme}) => theme.COLORS.GRAY_100};
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
`;

type ModeOptions = "time" | "date" | "datetime" | "countdown" 

interface InputProps extends BaseProps {
  label?:string
  mode?: ModeOptions
}

export const DatePickerInput = ({label, value, onChange, mode,...rest}:InputProps) => {
  const [visible, setVisible] = useState(false)
  const { COLORS } = useTheme()

  const handleDateChanged = useCallback((event:DateTimePickerEvent, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setVisible(false);
    }

    if(!onChange) return

    if (date) {
      onChange(event, date);
    }
  }, []);

  const valueFormatted = useMemo(() => {
    if(!value) return ''
    if(mode === 'date') return dayjs(value).format('DD/MM/YYYY')

    if(mode === 'time') return dayjs(value).format('HH:mm')
  },[value, mode])

  return (
    <Container>
      {label && (
        <LabelWrapper>
          <Label>{label}</Label>
        </LabelWrapper>
      )}
      <TouchableOpacity onPress={() => setVisible(prev => !prev)}>
        <InputField>
          <InputFieldText>
            {valueFormatted}
          </InputFieldText>
        </InputField>
        {visible && (
          <DateTimePicker 
            onChange={handleDateChanged} 
            onTouchCancel={() => setVisible(false)} 
            textColor={COLORS.GRAY_100}
            mode={mode}
            value={value}
            {...rest}
          />
        )}
      </TouchableOpacity>
    </Container>
  )
}