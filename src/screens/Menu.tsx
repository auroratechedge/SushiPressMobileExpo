import {
  createDrawerNavigator,
  DrawerItem,
} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, Text, Pressable, View, ScrollView} from 'react-native';
import { Divider } from 'react-native-flex-layout';
import 'react-native-gesture-handler';
import MenuDetail from './MenuDetail';
import { useDispatch } from "react-redux";
import { addToCart, getItems } from '../store/actions/sushi';
import { useAppSelector } from '../store/storeConfiguration';
import { IconButton, Chip } from '@react-native-material/core';
import Icon from '@expo/vector-icons/FontAwesome';

type Items = {
  id: number,
  img: string,
  name: string,
  price: number,
  included: boolean,
}

const Menu = ({ navigation, route }: any) => {
  const Drawer = createDrawerNavigator();
  const dispatch: any = useDispatch()
  const { listMenu, cart } = useAppSelector((state) => state.sushiReducer)
  const [selectedOption, setSelectedOption] = useState<boolean[]>(Array(listMenu.length).fill(false))

  useEffect(() => {
    const optionsTMP = selectedOption
    optionsTMP[0] = true
    setSelectedOption(optionsTMP)
    dispatch(getItems(listMenu[0].id))
  }, [listMenu])

  const handleOptionMenu = (item: any, index: number) => {
    const optionsTMP = Array(listMenu.length).fill(false)
    optionsTMP[index] = true
    setSelectedOption(optionsTMP)
    dispatch(getItems(item.id))
  }
  
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => (
        <ScrollView>
          <View style={{alignItems: 'center', width: '100%'}}>
            <Image
              source={require('./../assets/images/logo_nobg.png')}
              style={{width: 150, height: 150}}
            />
          </View>
          <View style={{alignContent: 'center'}} testID='optionMenu'>
            {listMenu?.map((item: any, index: number) => (
              <DrawerItem
                key={item.id}
                label={item.category}
                labelStyle={{
                  fontSize: 20,
                  //width: '100%',
                  height: 30,
                  marginLeft: 40,
                }}
                style={{backgroundColor: selectedOption[index] ? '#D3CD00' : '#f5f5f5', borderRadius: 20 }}
                onPress={() => {
                  handleOptionMenu(item, index)
                  navigation.dispatch(DrawerActions.closeDrawer())
                }}
              />
            ))}
          </View>
          <Divider />
          <View style={{alignContent: 'center', flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 20,
                marginLeft: 20
              }}>
              Menu: 
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginLeft: 5
              }}>{route.params.name}</Text>
          </View>
          <Pressable onPress={() => {
            dispatch(addToCart([], 'deleteAll'))
            navigation.goBack()
            }}>
            <View style={{alignContent: 'center', flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 20,
                  marginLeft: 20
                }}>
                GO BACK TO HOME 
              </Text>
            </View>
          </Pressable>
        </ScrollView>
      )}>
      <Drawer.Screen name={route.params.name} component={MenuDetail} options={{headerRight: () => (
        <Pressable onPress={() => navigation.navigate('Cart', {name: route.params.name})}>
            <IconButton 
              icon={<View style={styles.container}>
                {cart.length > 0 && <View style={styles.containerCountCart}>
                  <Text>{cart.length}</Text>
                </View>}
                <Icon name="shopping-cart" size={30}/></View>}
              //style={{borderRadius: 60, backgroundColor: '#D3CD00'}}
              onPress={() => navigation.navigate('Cart', {name: route.params.name})}
            />
        </Pressable>
      )}}/>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 6
  },
  containerCountCart: {
    backgroundColor: '#ffffb3', 
    width: 10, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 5,
    float: 'right',
    marginLeft: 20
  }
})

export default Menu;
