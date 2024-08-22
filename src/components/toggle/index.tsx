import styled, { css } from 'styled-components/native'
import { TouchableWithoutFeedbackPropsAndroid, View } from 'react-native'
import { useState } from 'react'
 

const LabelWrapper = styled.View`
  margin-bottom: 6px;
`

const Label = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.XS}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme}) => theme.COLORS.GRAY_200};
`


export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export interface OptionContainerProps extends DotProps {
  selected?: boolean
  backgroundColor?: string
}

export const OptionContainer = styled.TouchableOpacity<OptionContainerProps>`
  flex: 1;
  border: 1px solid ${({theme}) => theme.COLORS.GRAY_500};
  background-color: ${({theme}) => theme.COLORS.GRAY_500};
  min-height: 48px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${({selected, backgroundColor}) => selected && backgroundColor && css`
    background-color: ${backgroundColor};
  `}

  ${({selected, dotColor}) => selected && dotColor && css`
    border: 1px solid ${dotColor};
  `}
`

export interface DotProps {
  dotColor?: string
}

export const Dot = styled.View<DotProps>`
  height: 8px;
  width: 8px;
  border-radius: 999px;
  background-color: ${({theme}) => theme.COLORS.GRAY_500};

  ${({dotColor}) => dotColor && css`
    background-color: ${dotColor};
  `}
`
const DotWrapper = styled.View`
  margin-right: 8px;
`
 

export interface Option extends OptionContainerProps {
  label: string
  value: string
}

interface ToggleProps {
  label?:string
  value: string
  onChange(value: string): void
  options: Option[]
}

export const Toggle = ({label, value, options, onChange}:ToggleProps) => {
  const handleSelected = (option: Option) => {
    onChange(option.value)
  }

  return (
    <View>
      {label && (
        <LabelWrapper>
          <Label>{label}</Label>
        </LabelWrapper>
      )}
      <Row>
        {options.map(option => (
            <OptionContainer 
              key={option.value} 
              onPress={() => handleSelected(option)}
              selected={value === option.value}
              backgroundColor={option.backgroundColor}
              dotColor={option.dotColor}
              >
              <DotWrapper>
                <Dot dotColor={option.dotColor} />
              </DotWrapper>
              <Label>{option.label}</Label>
            </OptionContainer>
        ))}
      </Row>
    </View>
  )
}