import styled, { useTheme, css } from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View<HeaderProps>`
  background-color: ${({theme}) => theme.COLORS.GREEN_LIGHT};
  padding:0 24px 12px;

  background-color: ${({theme}) => theme.COLORS.GREEN_LIGHT};

  ${({backgroundColor}) => backgroundColor && css`
    background-color: ${backgroundColor};
  `}
`
export const IconWrapper = styled.View`
  align-items: start;
` 

interface HeaderProps {
  backgroundColor?: string
}


export const DailyPercentDetailsContainer = styled.View`
  border-radius: 8px; 
  padding: 8px 8px 16px;
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

export const Content = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${({theme}) => theme.COLORS.GRAY_700};
`
export const ContentTitle = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme}) => theme.COLORS.GRAY_100};
  text-align: center;
`

export const StatisticsContainer = styled.View`
  margin-top: 24px;
`;

export const StatisticBoxWrapper = styled.View`
  margin-bottom: 8px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

interface StatisticBoxProps {
  color?: string;
}

export const StatisticBox = styled.View<StatisticBoxProps>`
  padding: 16px;
  border-radius: 8px;
  background-color: ${({theme}) => theme.COLORS.GRAY_600};

  ${({color}) => color && css`
    background-color: ${color};
  `}
`;

export const StatisticRowBox = styled(StatisticBox)`
  flex: 1;
`

export const StatisticBoxTitleWrapper = styled.View`
  margin-bottom: 6px;
`

export const StatisticBoxTitle = styled(ContentTitle)`
  font-size: ${({theme}) => theme.FONT_SIZE.XL}px;
`;

export const StatisticBoxDescription = styled(DailyPercentDetailsDescription)`
   font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
`;