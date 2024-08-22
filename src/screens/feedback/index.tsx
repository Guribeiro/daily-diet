import { StatusBar } from 'react-native';
import { useTheme} from 'styled-components/native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamsList } from '../../routes';
import { Button } from '../../components/button';

import {Container, Title, SubTitle, StrongText, IconWrapper, styleVariations} from './styles'

type FeedbackScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Home'>

export const Feedback = () => {
  const { navigate } = useNavigation<FeedbackScreenProps>()
  const { params } = useRoute<RouteProp<RootStackParamsList, 'Feedback'>>()

  const {type} = params
  
  const {COLORS} = useTheme()

  return(
    <Container> 
      <StatusBar backgroundColor={COLORS.GRAY_700}  barStyle={'dark-content'}/>
        {type === 'success' ? (
          <>
            <Title type={type}>Continue assim!</Title>
            <SubTitle>
              Você continua <StrongText>dentro da dieta</StrongText>. Muito bem!
            </SubTitle>
          </>
        ): (
          <>
            <Title type={type}>Que pena!</Title>
            <SubTitle>
              Você <StrongText>saiu da dieta</StrongText> dessa vez, mas continue se esforçando e não desista!
            </SubTitle>
          </>
        )}
        <IconWrapper>
          {styleVariations[type].icon}
        </IconWrapper>
      <Button onPress={() => navigate('Home')}>Ir para a página inicial</Button>
    </Container>
  )
}