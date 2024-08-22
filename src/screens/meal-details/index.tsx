
import { TouchableOpacity, StatusBar, View, Modal, ScrollView, Alert } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamsList } from '../../routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Button } from '../../components/button';
import { KeyboardView } from '../../components/keyboard-avoiding-view';
import { Input } from '../../components/input';
import { DatePickerInput } from '../../components/datepicker';
import { Toggle } from '../../components/toggle';
import { CreateMealFormData, options } from '../home';
import { Meal, useMeals } from '../../hooks/meals';

type MealDetailsScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Home'>

export const Container = styled.View`
    flex: 1;
`;

interface HeaderProps {
  backgroundColor?:string;
}

export const Header = styled.View<HeaderProps>`
  padding: 12px 24px 24px;
  align-items: center;

  ${({backgroundColor}) => backgroundColor && css`
    background-color: ${backgroundColor};
  `}
`

export const CloseButtonWrapper = styled.View`
  position: absolute;
  top: 12px;
  left: 24px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme}) => theme.COLORS.GRAY_100};
  text-align: center;
`
export const Content = styled.View`
  flex: 1;
  padding: 24px;
`

export const Name = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.XL}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme}) => theme.COLORS.GRAY_100};
`

export const Label = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.XS}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme}) => theme.COLORS.GRAY_100};
`

export const Description = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme}) => theme.COLORS.GRAY_200};
`

export const DietStatusContainer = styled.View`
  background-color: ${({theme}) => theme.COLORS.GRAY_500};
  padding: 4px 12px;
  border-radius: 18px;
`

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

export const DietStatusText = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme}) => theme.COLORS.GRAY_100};
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

const Wrapper = styled.View`
  margin-bottom: 12px;
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


export const MealDetails = () => {
  const {COLORS} = useTheme()
  const {meals} = useMeals()
  const { loading, updateMeal, deleteMeal } = useMeals()
  const { control, handleSubmit, reset, getValues} = useForm<CreateMealFormData>()
  const [modalVisibility, setModalVisibility] = useState(false)
  const { goBack, navigate } = useNavigation<MealDetailsScreenProps>()
  const { params } = useRoute<RouteProp<RootStackParamsList, 'MealDetails'>>()

  const {mealId} = params

  const meal = getValues()

  const backgroundColor = meal.diet === 'SIM' ? COLORS.GREEN_LIGHT : COLORS.RED_LIGHT

  const dotColor = meal.diet === 'SIM' ? COLORS.GREEN_DARK : COLORS.RED_DARK

  const datetimeFormatted = dayjs(meal?.date)
  .set('hour', dayjs(meal?.hour).get('hour'))
  .set('minutes', dayjs(meal?.hour).get('minutes'))
  .format('DD/MM/YYYY [as] HH:mm')

  const onSubmit = (form: CreateMealFormData) => {
    if(!meal) return
    Object.assign(meal,form)

    updateMeal({...meal, id: mealId}).then(() => {
      setModalVisibility(false)
    })
  }

  const onDelete = async (meal: Meal) => {
    Alert.alert('Excluir refeicao','Deseja mesmo excluir essa refeicao ?', [
      {
        text: 'Nao',
      },
      {
        text: 'Sim',
        onPress: () => deleteMeal(meal).then(() => {
          navigate('Home')
        })
      },
    ])
  }

  useEffect(() => {
    const findMeal = meals.find(item => item.id === mealId)

    if(findMeal) {
      reset({
        ...findMeal,
        date: new Date(findMeal.date),
        hour: new Date(findMeal.hour)
      })
    }
  },[meals, mealId])

  return (
    <Container>
       <StatusBar backgroundColor={backgroundColor} />
       <Header backgroundColor={backgroundColor}>
        <HeaderTitle>Refeicao</HeaderTitle>
        <CloseButtonWrapper>
          <TouchableOpacity onPress={goBack}>
            <Feather name='arrow-left' size={24} color={COLORS.GRAY_200} />
          </TouchableOpacity>
        </CloseButtonWrapper>
      </Header>

      <Content>
        <Wrapper>
          <Name>{meal.name}</Name>
        </Wrapper>
        <Wrapper>
          <Description>{meal.description}</Description>
        </Wrapper>
        <Wrapper>
          <Label>Data e hora</Label>
          <Description>{datetimeFormatted}</Description>
        </Wrapper>
        <Wrapper style={{flexDirection: 'row'}}>
          <DietStatusContainer>
            <Row>
              <DotWrapper>
                <Dot dotColor={dotColor} />
              </DotWrapper>
              <DietStatusText>
                  {meal.diet === 'SIM' ? 'dentro da dieta' : 'fora da dieta'}
                </DietStatusText>
            </Row>
          </DietStatusContainer>
        </Wrapper>

        <View style={{flex: 1}} />

        <View style={{gap: 8}}>
          <Button 
            icon={<Feather name='edit-2' size={18} color={COLORS.WHITE} />}
            onPress={() => setModalVisibility(true)}
          >
            Editar refeição
          </Button>
          <Button
            variation='outlined'
            icon={<Feather name='trash-2' size={18} color={COLORS.GRAY_200} />}
            onPress={() => onDelete({...meal, id: mealId})}
          >
            Excluir refeição
          </Button>
        </View>
      </Content>

    <Modal 
      visible={modalVisibility}
      onRequestClose={() => setModalVisibility(false)}
      animationType='slide'
      hardwareAccelerated
    >
      <ModalHeader>
        <ModalHeaderTitle>Nova refeição</ModalHeaderTitle>
        <ModalCloseButtonWrapper>
          <TouchableOpacity onPress={() => setModalVisibility(false)}>
            <Feather name='arrow-left' size={24} color={COLORS.GRAY_200} />
          </TouchableOpacity>
        </ModalCloseButtonWrapper>
      </ModalHeader>
        <KeyboardView>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            <Form>
              <FieldWrapper>
                <Controller 
                  name="name"
                  control={control}
                  render={({fieldState: {error}, field: {onChange, value}}) => (
                    <Input 
                      label="Nome" 
                      onChangeText={onChange} 
                      value={value}
                    />
                  )}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Controller 
                  name="description"
                  control={control}
                  render={({fieldState: {error}, field: {onChange, value}}) => (
                    <Input 
                      label='Descrição' 
                      multiline 
                      numberOfLines={5}
                      onChangeText={onChange} 
                      value={value}
                    />
                  )}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Row>
                  <Controller 
                    name="date"
                    control={control}
                    render={({fieldState: {error}, field: {onChange, value}}) => (
                      <DatePickerInput 
                        label='Data' 
                        mode='date' 
                        value={value} 
                        onChange={(_, date) => onChange(date)} 
                      />
                    )}
                  />

                  <Controller 
                    name="hour"
                    control={control}
                    render={({fieldState: {error}, field: {onChange, value}}) => (
                      <DatePickerInput 
                        label='Hora' 
                        mode='time'
                        value={value} 
                        onChange={(_, date) => onChange(date)} 
                      />
                    )}
                  />
                </Row>
              </FieldWrapper>

              <FieldWrapper>
                <Controller 
                  name="diet"
                  control={control}
                  render={({fieldState: {error}, field: {onChange, value}}) => (
                    <Toggle 
                      label='Está dentro da dieta?' 
                      value={value} 
                      onChange={onChange} 
                      options={options} 
                    />
                  )}
                />
             
              </FieldWrapper>
              <View style={{flex: 1}} />
              <Button 
                onPress={handleSubmit(onSubmit)} 
                disabled={loading}
                loading={loading}
              >
                  Atualizar refeicao
                </Button>
            </Form>
          </ScrollView>
        </KeyboardView>      
    </Modal>
    </Container>
  )
}