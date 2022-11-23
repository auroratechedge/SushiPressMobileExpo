/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import Home from './src/screens/Home';
 import {NavigationContainer} from '@react-navigation/native';
 import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import Menu from './src/screens/Menu';
 import 'react-native-gesture-handler';
 import {Provider} from 'react-redux';
 import {store} from './src/store/storeConfiguration';
 import Cart from './src/screens/Cart';
 
 const App = () => {
 
   const Stack = createNativeStackNavigator();
 
   return (
     <Provider store={store}>
       <NavigationContainer>
         <Stack.Navigator
           screenOptions={{
             headerShown: false,
           }}>
           <Stack.Screen name="Home" component={Home} />
           <Stack.Screen name="Menu" component={Menu} />
           <Stack.Screen name="Cart" component={Cart} />
         </Stack.Navigator>
       </NavigationContainer>
     </Provider>
   );
 };
 
 export default App;
 