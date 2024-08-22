import { useCallback, useEffect, useMemo, useState } from 'react'
import { StatusBar, TouchableOpacity, Modal, ScrollView, View, SectionList } from 'react-native'
import { useTheme } from 'styled-components/native'
import {Controller, useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../../routes'

import { Input } from '../../components/input'
import { Button } from '../../components/button'
import { Toggle, Option } from '../../components/toggle'
import { DatePickerInput } from '../../components/datepicker'
import { KeyboardView } from '../../components/keyboard-avoiding-view'
import { MealItem } from '../../components/meal'
import dayjs from 'dayjs'
import theme from '../../theme'

import Logo from '../../assets/daily-diet-logo.svg'

import {
  Container,
  Header,
  Avatar,
  DailyPercentDetailsContainerWrapper,
  DailyPercentDetailsContainer,
  IconWrapper,
  DailyPercentDetailsText,
  DailyPercentDetailsDescription,
  ButtonWrapper,
  ButtonLabelWrapper,
  ButtonLabel,
  ModalHeader,
  ModalHeaderTitle,
  ModalCloseButtonWrapper,
  Form,
  FieldWrapper,
  Row,
  SectionHeaderWrapper,
  SectionHeader,
  SectionItem
} from './styles'
import { Meal, useMeals } from '../../hooks/meals'

type HomeScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Home'>

const createMealFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  date: z.date(),
  hour: z.date(),
  diet: z.string()
})

export type CreateMealFormData = z.infer<typeof createMealFormSchema>

const defaultValues = {
  date: new Date(),
  hour: new Date()
}

export const options:Option[] = [
  {
    label: 'Sim',
    value: 'SIM',
    dotColor: theme.COLORS.GREEN_DARK,
    backgroundColor: theme.COLORS.GREEN_LIGHT,
  },
  {
    label: 'Não',
    value: 'NAO',
    dotColor: theme.COLORS.RED_DARK,
    backgroundColor: theme.COLORS.RED_LIGHT,
  },
] 

export const Home = () => {
  const { COLORS } = useTheme()
  const { navigate } = useNavigation<HomeScreenProps>()
  const {createMeal, loading, meals, dietPercentage} = useMeals()

  const [modalVisibility, setModalVisibility] = useState(false)

  const { control, handleSubmit, reset } = useForm<CreateMealFormData>({
    defaultValues,
    resolver: zodResolver(createMealFormSchema)
  })


  const sectionListData = useMemo(() => {
    const groupedData = new Map();
    meals.forEach((item) => {
      const date = dayjs(item.date).format('DD/MM/YYYY');
      if (!groupedData.has(date)) {
        groupedData.set(date, []);
      }
      groupedData.get(date).push(item);
    });
  
    const sectionListData = Array.from(groupedData.entries()).map(([date, items]) => ({
      title: date,
      data: items,
    }));

    return sectionListData
  },[meals])

  const backgroundColor = useMemo(() => {
    return dietPercentage > 50 ? COLORS.GREEN_LIGHT : COLORS.RED_LIGHT
  },[dietPercentage])

  const onSubmit = async (meal: CreateMealFormData) => {
    createMeal(meal).then(() => {
      setModalVisibility(false)
      reset(defaultValues)
      navigate('Feedback', {type: meal.diet === 'SIM' ? 'success' : 'failure' })
    })
  }

  return (
    <Container>
      <StatusBar backgroundColor={COLORS.WHITE} />
      <Header>
        <Logo />
        <Avatar source={{uri: 'https://avatars.githubusercontent.com/u/50778163?v=4'}} />
      </Header>
      <TouchableOpacity onPress={() => navigate('DietDetails')}>
        <DailyPercentDetailsContainerWrapper>
          <DailyPercentDetailsContainer backgroundColor={backgroundColor}>
            <IconWrapper>
              <Feather name='arrow-up-right' color={dietPercentage > 50 ? COLORS.GREEN_DARK : COLORS.RED_DARK} size={24} />
            </IconWrapper>
            <DailyPercentDetailsText>{`${dietPercentage.toFixed(2)}%`}</DailyPercentDetailsText>
            <DailyPercentDetailsDescription>das refeições dentro da dieta</DailyPercentDetailsDescription>
          </DailyPercentDetailsContainer>
        </DailyPercentDetailsContainerWrapper>
      </TouchableOpacity>

    <ButtonWrapper>
      <ButtonLabelWrapper>
        <ButtonLabel>
          Refeições
        </ButtonLabel>
      </ButtonLabelWrapper>

      <Button
        icon={<Feather name='plus' size={18} color={COLORS.WHITE} />}
        onPress={() => setModalVisibility(true)}
      >
        Nova refeição
      </Button>
    </ButtonWrapper>

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
              >
                  Cadastrar refeição
                </Button>
            </Form>
          </ScrollView>
        </KeyboardView>      
    </Modal>

    <SectionList 
      sections={sectionListData}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <SectionItem>
          <TouchableOpacity onPress={() => navigate('MealDetails', {mealId: item.id})}>
            <MealItem data={item} />
          </TouchableOpacity>
        </SectionItem>
      )}
      renderSectionHeader={({section: {title}}) => (
        <SectionHeaderWrapper>
          <SectionHeader>{title}</SectionHeader>
        </SectionHeaderWrapper>
      )}
    />
  </Container>
  )
}