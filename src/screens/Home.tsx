import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import {IconButton, Text} from '@react-native-material/core';
import Icon from '@expo/vector-icons/FontAwesome';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/storeConfiguration';
import { addRemovePeople, getItems, getListMenu } from '../store/actions/sushi';

const Home = ({ navigation } : any) => {
  const dispatch: any = useDispatch()
  const { people } = useAppSelector(state => state.sushiReducer)

  useEffect(() => {
    dispatch(getListMenu())
    dispatch(getItems(1))
  }, [dispatch])

  const handleAdd = () => {
    let counter = _.cloneDeep(people);
    counter = counter + 1;
    dispatch(addRemovePeople(counter))
  };
  const handleRemove = () => {
    let counter = _.cloneDeep(people);
    if (counter > 0) {
      counter = counter - 1;
    }
    dispatch(addRemovePeople(counter))
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.cardPeople}>
          <Image
            source={require('../assets/images/logo_nobg.png')}
            style={{width: 150, height: 150}}
          />
          <View style={styles.cardPeople}>
          <Text testID="people" variant="h6" style={{alignItems: 'center'}}>
            PEOPLE
          </Text>
          <View style={styles.cardCounter}>
            <IconButton
              testID="counter-people-add"
              icon={<Icon name="minus" />}
              style={{borderRadius: 60, backgroundColor: '#D3CD00'}}
              onPress={handleRemove}
            />
            <Text testID="counter-people" style={styles.textPeople} variant="h6">
              {people}
            </Text>
             <IconButton
              testID="counter-people-remove"
              icon={<Icon name="plus" />}
              style={{borderRadius: 60, backgroundColor: '#D3CD00'}}
              onPress={handleAdd}
            />
          </View>
        </View>
          <Pressable 
            testID='menulacarte'
            onPress={() => {navigation.navigate('Menu', {name: 'A la carte'})}}
            disabled={people === 0}
          >
            <View style={{padding: 10, opacity: people === 0 ? 0.5 : 1}}>
              <View style={styles.circle}>
                <Image
                  source={require('./../assets/images/alacarte.png')}
                  style={{
                    width: 200,
                    height: 170,
                    borderTopLeftRadius: 100 / 5,
                    borderTopRightRadius: 100 / 5,
                  }}
                />
                <View style={styles.card}>
                  <Text>A la carte **</Text>
                </View>
              </View>
            </View>
          </Pressable>
          <Pressable 
            testID='menuallyoucaneat'
            onPress={() => {navigation.navigate('Menu', {name: 'All you can eat'})}}
            disabled={people === 0}
          >
            <View style={{padding: 10, opacity: people === 0 ? 0.5 : 1}}>
              <View style={styles.circle}>
                <Image
                  source={require('./../assets/images/allyoucaneat.png')}
                  style={{
                    width: 200,
                    height: 170,
                    borderTopLeftRadius: 100 / 5,
                    borderTopRightRadius: 100 / 5,
                  }}
                />
                <View style={styles.card}>
                  <Text>All you can eat *</Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
  },
  card: {
    alignItems: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100 / 5,
    backgroundColor: 'white',
  },
  cardPeople: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 100 / 2,
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
  },
});

export default Home;
