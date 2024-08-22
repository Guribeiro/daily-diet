import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const DAILY_DIET_STORAGE_KEY = '@daily-diet:meals'
const HUNDRED_PERCENT = 100

export interface Meal {
  id: string
  name: string
  description: string
  date: Date
  hour: Date
  diet: string
}

interface MealsContextData {
  loading: boolean
  meals: Meal[]
  dietPercentage: number
  mealsCount: {diet: number, not_diet: number, total: number}
  dietSequenceCount: number
  createMeal(meal: CreateMealProps): Promise<void>
  updateMeal(meal: Meal): Promise<void>
  deleteMeal(meal: Meal): Promise<void>
}

type CreateMealProps = Omit<Meal, 'id'>

const MealContext = createContext<MealsContextData>({} as MealsContextData)

interface MealsProviderProps {
  children: ReactNode
}


const MealsProvider = ({children}:MealsProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [meals, setMeals] = useState<Meal[]>([])

  const createMeal = useCallback(async (meal: CreateMealProps) => {
    const id = new Date().toISOString()

    const newMeal: Meal = {
      id,
      ...meal,
    } 
    try {
      setLoading(true)
      const mealsList = [...meals, newMeal];
      await AsyncStorage.setItem(DAILY_DIET_STORAGE_KEY, JSON.stringify(mealsList))
    } catch (error) {
      return Alert.alert('add new meal', error as string) 
    }finally{
      setLoading(false)
    }
    setMeals(prev => [...prev, newMeal])
  },[meals])

  const updateMeal = useCallback(async (meal: Meal) => {
    const mealsList = [...meals];

    const index = mealsList.findIndex(item =>  item.id === meal.id)

    if(index < 0) return

    mealsList[index] = meal

    try {
      setLoading(true)
      await AsyncStorage.setItem(DAILY_DIET_STORAGE_KEY, JSON.stringify(mealsList))
    } catch (error) {
      return Alert.alert('update meal', error as string) 
    }finally{
      setLoading(false)
    }

    setMeals(mealsList)
  },[meals])

  const deleteMeal = useCallback(async (meal: Meal) => {
    const mealsList = [...meals];

    const index = mealsList.findIndex(item =>  item.id === meal.id)

    if(index < 0) return

    mealsList.splice(index, 1)
    
    try {
      setLoading(true)

      await AsyncStorage.setItem(DAILY_DIET_STORAGE_KEY, JSON.stringify(mealsList))

    } catch (error) {
      return Alert.alert('delete meal', error as string) 
    }finally{
      setLoading(false)
    }

    setMeals(mealsList)
  },[meals])

  const dietPercentage = useMemo(() => {
     const dietMealsCount = meals.filter(meal => meal.diet === 'SIM').length

    const mediaPercent = (dietMealsCount / meals.length) * HUNDRED_PERCENT

    return mediaPercent
  },[meals])

  const mealsCount = useMemo(() => {
    return meals.reduce((accumulator, current) => {
      switch (current.diet) {
        case 'SIM':
            accumulator.diet += 1
            accumulator.total += 1
          break;
        
        case 'NAO':
          accumulator.not_diet += 1
          accumulator.total += 1
          break
        default:
          break;
        }
        
        return accumulator
    }, {diet: 0, not_diet: 0, total: 0})
  },[meals])

  const dietSequenceCount = useMemo(() => {
    const sequence = []
    let currentSequence = [];

    const mealsSortedList = meals.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    for(const meal of mealsSortedList) {
      if(meal.diet === 'SIM') {
        currentSequence.push(meal)
      }else {
        if(currentSequence.length > 0){
          sequence.push(meal)
          currentSequence = []
        }
      }
    }

    if (currentSequence.length > 0) {
      sequence.push(...currentSequence);
    }

    return sequence.length
  },[meals])
  
  useEffect(function fetchStoragedTasks() {
    (async () => {
      try {
        setLoading(true)
        const storaged = await AsyncStorage.getItem(DAILY_DIET_STORAGE_KEY)

        if(storaged) {
          const storagedTasks = JSON.parse(storaged)
          setMeals(storagedTasks)
        }
      } catch (error) {
        return Alert.alert('fetch tasks', error as string) 
      }finally {
        setLoading(false)
      }
    })()
  },[])

  return (
    <MealContext.Provider 
      value={{
        loading, 
        meals,
        dietPercentage,
        mealsCount,
        dietSequenceCount,
        createMeal,
        updateMeal,
        deleteMeal
      }}
    >
      {children}
    </MealContext.Provider>
  )
}

function useMeals() {
  const context = useContext(MealContext)

  if(!context) {
    throw new Error('useMeals should be used within a MealsProvider')
  }

  return context
}

export {useMeals, MealsProvider}