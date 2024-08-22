import { useMemo } from 'react'
import { StatusBar, TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components/native'
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { RootStackParamsList } from '../../routes'
import { useMeals } from '../../hooks/meals'

import {
    Container, 
    Content,
    ContentTitle,
    DailyPercentDetailsContainer,
    DailyPercentDetailsDescription,
    DailyPercentDetailsText,
    Header,
    IconWrapper,
    Row,
    StatisticsContainer,
    StatisticBoxTitle,
    StatisticBoxTitleWrapper,
    StatisticBoxDescription,
    StatisticRowBox,
    StatisticBoxWrapper,
    StatisticBox,
  } from './styles'

type DietDetailsScreenProps = NativeStackNavigationProp<RootStackParamsList, 'DietDetails'>

export const DietDetails = () => {
  const { COLORS } = useTheme()
  const { dietPercentage, mealsCount, dietSequenceCount } = useMeals()
  const { goBack } = useNavigation<DietDetailsScreenProps>()

  const backgroundColor = useMemo(() => {
    return dietPercentage > 50 ? COLORS.GREEN_LIGHT : COLORS.RED_LIGHT
  },[dietPercentage])

  return (
    <Container>
      <StatusBar backgroundColor={backgroundColor} />
      <Header backgroundColor={backgroundColor}>
        <DailyPercentDetailsContainer>
            <IconWrapper>
              <TouchableOpacity onPress={goBack}>
                <Feather name='arrow-left' color={dietPercentage > 50 ? COLORS.GREEN_DARK : COLORS.RED_DARK} size={24} />
              </TouchableOpacity>
            </IconWrapper>
            <DailyPercentDetailsText>{`${dietPercentage.toFixed(2)}%`}</DailyPercentDetailsText>
            <DailyPercentDetailsDescription>das refeições dentro da dieta</DailyPercentDetailsDescription>
          </DailyPercentDetailsContainer>
      </Header>
      <Content>
        <ContentTitle>Estatísticas gerais</ContentTitle>
        <StatisticsContainer>

          <StatisticBoxWrapper>
            <StatisticBox>
              <StatisticBoxTitleWrapper>
                <StatisticBoxTitle>{dietSequenceCount}</StatisticBoxTitle>
              </StatisticBoxTitleWrapper>
              <StatisticBoxDescription>melhor sequência de pratos dentro da dieta</StatisticBoxDescription>
            </StatisticBox>
          </StatisticBoxWrapper>

          <StatisticBoxWrapper>
            <StatisticBox>
              <StatisticBoxTitleWrapper>
                <StatisticBoxTitle>{mealsCount.total}</StatisticBoxTitle>
              </StatisticBoxTitleWrapper>
              <StatisticBoxDescription>refeições registradas</StatisticBoxDescription>
            </StatisticBox>
          </StatisticBoxWrapper>

          <StatisticBoxWrapper>
            <Row>
              <StatisticRowBox color={COLORS.GREEN_LIGHT}>
                  <StatisticBoxTitleWrapper>
                    <StatisticBoxTitle>{mealsCount.diet}</StatisticBoxTitle>
                  </StatisticBoxTitleWrapper>
                  <StatisticBoxDescription>refeições registradas</StatisticBoxDescription>
                </StatisticRowBox>
                <StatisticRowBox color={COLORS.RED_LIGHT}>
                  <StatisticBoxTitleWrapper>
                    <StatisticBoxTitle>{mealsCount.not_diet}</StatisticBoxTitle>
                  </StatisticBoxTitleWrapper>
                  <StatisticBoxDescription>refeições registradas</StatisticBoxDescription>
                </StatisticRowBox>
            </Row>
          </StatisticBoxWrapper> 
        </StatisticsContainer>
      </Content>
    </Container>
  )
}