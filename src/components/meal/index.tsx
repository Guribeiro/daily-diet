import styled, {css, useTheme} from 'styled-components/native'
import { Meal } from '../../hooks/meals';

import dayjs from 'dayjs';
import { useMemo } from 'react';

const Container = styled.View`
  padding: 14px;
  border: 1px solid ${({theme}) => theme.COLORS.GRAY_500};
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
`;

const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Hour = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.XS}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme}) => theme.COLORS.GRAY_100};
`;

const Name = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme}) => theme.COLORS.GRAY_200};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex: 1;
`;

const Divider = styled.View`
  width: 1px;
  height: 14px;
  background-color: ${({ theme}) => theme.COLORS.GRAY_500};
  margin: 0 6px;
`;

interface CircleProps {
  backgroundColor?:string
}

const Circle = styled.View<CircleProps>`
    width: 14px;
    height: 14px;
    border-radius: 999px;
    background-color: ${({theme}) => theme.COLORS.GRAY_500};
    border: 1px solid ${({theme}) => theme.COLORS.GRAY_500};

    ${({backgroundColor}) => backgroundColor && css`
      background-color: ${backgroundColor};
      border: 1px solid ${backgroundColor};
    `}
`;

interface MealProps {
  data: Meal
}

export const MealItem = ({data}: MealProps) => {
  const {name, hour, diet} = data;
  const {COLORS} = useTheme()

  const hourFormatted = useMemo(() => {
    return dayjs(hour).format('HH:mm')
  },[hour])

  const circleBackgroundColor = useMemo(() => {
    return diet === 'SIM' ? COLORS.GREEN_LIGHT : COLORS.RED_LIGHT
  },[diet])

  return (
    <Container>
      <Content>
        <Hour>{hourFormatted}</Hour>
        <Divider />
        <Name numberOfLines={1} ellipsizeMode='tail'>{name}</Name>
      </Content>
      <Circle backgroundColor={circleBackgroundColor} />
    </Container>
  )
}