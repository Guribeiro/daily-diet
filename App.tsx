import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import {ThemeProvider} from 'styled-components/native'
import Routes from './src/routes';
import { loadAsync } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NunitoSans_400Regular,
  NunitoSans_700Bold
} from '@expo-google-fonts/nunito-sans';
import { MealsProvider } from './src/hooks/meals'


SplashScreen.preventAutoHideAsync();

import theme from './src/theme'
import { useCallback, useEffect, useState } from 'react';

const Container = styled.View`
    flex: 1;
    background-color: ${theme.COLORS.GRAY_700};
`

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await loadAsync({
          NunitoSans_400Regular,
          NunitoSans_700Bold
        });

        await new Promise(resolve => setTimeout(resolve, 4000));

      } catch (e) {
        console.log(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null

  return (
    <Container>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <ThemeProvider theme={theme}>
          <MealsProvider>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </MealsProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Container>
  );
}

 