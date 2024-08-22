import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  background-color: ${({theme}) => theme.COLORS.WHITE};
`

export const Header = styled.View`
  margin-top: 16px;
  flex-direction:row;
  align-items: center;
  justify-content: space-between;
`

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  bordeR: 1px solid ${({theme}) => theme.COLORS.GRAY_200};
`;

export const DailyPercentDetailsContainerWrapper = styled.View`
  margin-top: 32px;
`

interface DailyPercentDetailsContainerProps {
  backgroundColor?: string
}

export const DailyPercentDetailsContainer = styled.View<DailyPercentDetailsContainerProps>`
  border-radius: 8px; 
  padding: 8px 8px 16px;
  
  background-color: ${({theme}) => theme.COLORS.GRAY_700};
  ${({backgroundColor}) => backgroundColor && css`
    background-color: ${backgroundColor};
  `}
`
export const IconWrapper = styled.View`
  align-items: flex-end;
` 

export const DailyPercentDetailsText = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.XXL}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme}) => theme.COLORS.GRAY_100};
  text-align: center;
`;

export const DailyPercentDetailsDescription = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme}) => theme.COLORS.GRAY_200};
  text-align: center;
`

export const ButtonWrapper = styled.View`
  margin-top: 40px;
  margin-bottom: 16px;
`

export const ButtonLabelWrapper = styled.View`
  margin-bottom: 8px;
`;

export const ButtonLabel = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme}) => theme.COLORS.GRAY_100};
`;

export const ModalHeader = styled.View`
  padding: 12px 24px 24px;
  align-items: center;
`

export const ModalCloseButtonWrapper = styled.View`
  position: absolute;
  top: 12px;
  left: 24px;
`;

export const ModalHeaderTitle = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme}) => theme.COLORS.GRAY_100};
  text-align: center;
`
 
export const Form = styled.View`
  flex: 1;
  padding: 24px;
`

export const FieldWrapper = styled.View`
  margin-bottom: 12px;
`

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const SectionHeaderWrapper = styled.View`
  margin: 8px 0 4px;
`

export const SectionHeader = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme}) => theme.COLORS.GRAY_100};
`

export const SectionItem = styled.View`
  margin-bottom: 8px;
`