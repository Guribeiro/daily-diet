import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Home } from '../screens/home';
import { DietDetails } from '../screens/diet-details';
import { MealDetails } from '../screens/meal-details';
import { Feedback } from '../screens/feedback';

import { FeedbackType } from '../screens/feedback/styles';


export interface MealDetailsParamsList {
  mealId: string
}

export interface FeedbackParamsList {
  type: FeedbackType
}

export type RootStackParamsList = {
  Home: undefined
  DietDetails: undefined
  MealDetails: MealDetailsParamsList
  Feedback: FeedbackParamsList
}

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamsList>()


export default function Routes() {
  return (
    <Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen 
        name='Home' 
        component={Home}
      />
      <Screen 
        name='DietDetails' 
        component={DietDetails} 
        options={{
          animation: 'fade_from_bottom'
        }}
      />
      <Screen 
        name='MealDetails' 
        component={MealDetails} 
        options={{
          animation: 'fade_from_bottom'
        }}
      />
      <Screen 
        name='Feedback' 
        component={Feedback} 
        options={{
          animation: 'fade_from_bottom'
        }}
      />
    </Navigator>
  );
}