import {IconButton, Text, Button} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {Alert, Image, Modal, Pressable, StyleSheet, View} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import {useAppSelector} from '../store/storeConfiguration';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {addToCart, sendOrder} from '../store/actions/sushi';

const Cart = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const { cart, people, send } = useAppSelector(state => state.sushiReducer);
  const [totalALaCarte, setTotalALaCarte] = useState<number>(0)
  const [totalAllYouCanEat, setTotalAllYouCanEat] = useState<number>(0)
  const priceAllYouCanEat = 12.90
  const [modalSuccessVisible, setModalSucccessVisible] = useState<boolean>(false)

  useEffect(() => {
    if (route.params.name === "A la carte") {
      let total = 0
      cart.map((el: any) => {
        total += el.price * el.quantity
      })
      setTotalALaCarte(total)
    } else if (cart.length > 0) {
      setTotalAllYouCanEat((priceAllYouCanEat * people))
    } else if (cart.length === 0) {
      setTotalAllYouCanEat(0)
    }
    
  }, [cart]);

  useEffect(() => {
    if (send) {
      setModalSucccessVisible(true)
    }
  }, [send])

  const handleDelete = (itemId: string) => {
    dispatch(
      addToCart(
        cart.find((el: any) => el.id === itemId),
        'delete',
      ),
    );
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            icon={<Icon name="arrow-left" size={20} />}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerLabel}>{route.name}</Text>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 10, height: '75%'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {cart.length > 0 ? (
          cart?.map((element: any) => (
            <View key={element.id} style={styles.itemContainer}>
              <View style={styles.containerTrashBtn}>
                <IconButton
                  icon={<Icon name="trash-o" size={30} color={'red'} />}
                  //style={{borderRadius: 60, backgroundColor: '#D3CD00'}}
                  onPress={() => handleDelete(element.id)}
                />
              </View>
              <Image
                style={{width: '50%', height: '50%'}}
                source={{uri: element.img}}
              />
              <Text>{element.name}</Text>
              <Text>
                {element.quantity}X{route.params.name === "A la carte" ? element.price : 0.00} €
              </Text>
            </View>
          ))
        ) : (
          <Text>Cart is empty</Text>
        )}
        <View></View>
        </ScrollView>
      </View>
      <View>
        <View style={styles.containerTotalOrder}>
          <Text>Total order: {route.params.name === "A la carte" ? totalALaCarte : totalAllYouCanEat} €</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            onPress={() => dispatch(sendOrder(true))}
            title="Send order"
            color="#D3CD00"
            style={{width: 220}}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSuccessVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          dispatch(sendOrder(false))
          dispatch(addToCart([], 'deleteAll'))
          setModalSucccessVisible(!modalSuccessVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Order send successfully</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                dispatch(sendOrder(false))
                dispatch(addToCart([], 'deleteAll'))
                setModalSucccessVisible(!modalSuccessVisible)
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    //alignItems: 'center',
  },
  headerLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  itemContainer: {
    width: '90%',
    height: 220,
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 60,
  },
  containerTrashBtn: {
    //backgroundColor: '#f5f5f5',
    width: 50,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 250,
    marginRight: 20
  },
  containerTotalOrder: {
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#D3CD00",
  },
  buttonClose: {
    backgroundColor: "#D3CD00",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Cart;
