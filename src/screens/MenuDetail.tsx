import {IconButton, Text, Button} from '@react-native-material/core';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppSelector} from '../store/storeConfiguration';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/actions/sushi';

type Items = {
  id: string;
  img: string;
  name: string;
  price: number;
  included: boolean;
};

const MenuDetail = ({route}: any) => {
  const dispatch = useDispatch()
  const {items, cart} = useAppSelector(state => state.sushiReducer);
  const [quantity, setQuantity] = useState<any>([])

  useEffect(() => {
    //creo un reducer per salvare le quantità quando cambio voce del menu
    const qnt: any = []
    items.map((item: Items) => {
      qnt.push({id: item.id, img: item.img, name: item.name, price:item.price, quantity: 0 })
    })
    setQuantity(qnt)
  }, [items])

  const handleAdd = (itemId: string) => {
    let updateQuantity = _.cloneDeep(quantity);
    let oldQuantity = updateQuantity.find((el: any) => el.id === itemId).quantity
    updateQuantity.find((el: any) => el.id === itemId).quantity = oldQuantity + 1
    setQuantity(updateQuantity);
  };
  const handleRemove = (itemId: string) => {
    let updateQuantity = _.cloneDeep(quantity);
    let oldQuantity = updateQuantity.find((el: any) => el.id === itemId).quantity
    if (oldQuantity > 0) {
      updateQuantity.find((el: any) => el.id === itemId).quantity = oldQuantity - 1
    }
    setQuantity(updateQuantity);
  };

  const handleAddToCart = (itemId: string) => {
    //controllo se l'elemento è già presente
    if (cart.find((el: any) => el.id === itemId)) {
      dispatch(addToCart(quantity.find((el: any) => el.id === itemId), 'update'))
    } else {
      dispatch(addToCart(quantity.find((el: any) => el.id === itemId), 'add'))
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {items?.map((item: Items, index: number) => (
        <View key={index} style={styles.container}>
          <View style={styles.containerPrice}>
            <Text>{route.name === 'A la carte' ? item.price + '€' : '0.00 €'}</Text>
          </View>
          <Image
            style={{width: '50%', height: '50%'}}
            source={{uri: item.img}}
          />
          <View style={styles.containerText}>
            <Text>{item.name}</Text>
          </View>
          <View style={styles.containerQuantity}>
            <Text style={{alignItems: 'center', marginTop: 5}}>
              QUANTITY
            </Text>
            <View style={styles.cardCounter}>
              <IconButton
                icon={<Icon name="minus" />}
                style={{borderRadius: 60, backgroundColor: '#D3CD00'}}
                onPress={() => handleRemove(item.id)}
              />
              <Text style={styles.textPeople} >
                {quantity[index]?.quantity}
              </Text>
              <IconButton
                icon={<Icon name="plus" />}
                style={{borderRadius: 60, backgroundColor: '#D3CD00'}}
                onPress={() => handleAdd(item.id)}
              />
            </View>
          </View>
          <View style={{marginTop: 40}}>
          <Button
            onPress={() => handleAddToCart(item.id)}
            title="Add to cart"
            color="#D3CD00"
            style={{width: 220}}
            disabled={quantity[index]?.quantity === 0}
            accessibilityLabel="Learn more about this purple button"
          />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: 360,
    borderRadius: 30,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 10,
    marginBottom: 50,
  },
  containerText: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: 280,
  },
  containerQuantity: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: 100,
    height: 50,
  },
  cardCounter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 100 / 2,
  },
  textPeople: {
    width: 70,
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 3,
    marginLeft: 55
  },
  containerPrice: {
    backgroundColor: '#f5f5f5', 
    width: 50, 
    borderRadius: 20, 
    alignItems: 'center', 
    marginTop: 5,
    marginLeft: 190
  }
});

export default MenuDetail;
