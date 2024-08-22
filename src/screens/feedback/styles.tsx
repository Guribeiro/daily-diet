import { ReactNode } from 'react'
import styled, { css } from 'styled-components/native'

import SuccessDiet from '../../assets/success.svg';
import FailureDiet from '../../assets/failure.svg';


interface Styles  {
  title: any
  icon: ReactNode
}

export type FeedbackType = 'success' | 'failure'

export const styleVariations:Record<FeedbackType, Styles>  = {
  success: {
    title: css`
      color: ${({theme}) => theme.COLORS.GREEN_DARK};
    `,
    icon: <SuccessDiet />
  },
  failure: {
    title: css`
      color: ${({theme}) => theme.COLORS.RED_DARK};
    `,
    icon: <FailureDiet />
  }
}

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  justify-content: center;
  background-color: ${({theme}) => theme.COLORS.GRAY_700};
`


type TitleProps = {
  type: FeedbackType
}

export const Title = styled.Text<TitleProps>`
    font-size: ${({theme}) => theme.FONT_SIZE.XL}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    color: ${({ theme}) => theme.COLORS.GRAY_100};
    text-align: center;

    ${({type}) => styleVariations[type].title}
`

export const StrongText = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    color: ${({ theme}) => theme.COLORS.GRAY_100};
`

export const SubTitle = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme}) => theme.COLORS.GRAY_100};
  text-align: center;
`


export const IconWrapper = styled.View`
  margin: 64px 0;
  align-items: center;
`


