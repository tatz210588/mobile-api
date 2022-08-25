import { React, useState, useEffect, useContext } from 'react'
import { Image, Switch, View, StyleSheet, Text, ScrollView, TextInput, ActivityIndicator, RefreshControl, FlatList, SafeAreaView } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { EventRegister } from 'react-native-event-listeners'
import AccordionItem from '../components/AccordionItem'
import themeContext from '../components/theme/themeContext'


const StartPage = () => {

  const theme = useContext(themeContext)
  const [pickVal, setpickVal] = useState(0)
  const [users, setUsers] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [mode, setMode] = useState(true)
  const [dropValue, setDropValue] = useState([])


  useEffect(() => {
    getUsers()

  }, [])



  const getSelectedUser = async (e) => {
    setpickVal(e)
    if (e === 0) {
      getUsers()
    } else {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${e}`)
      setUsers(await response.json())
    }

  }
  const getUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')

    const temporaryUser = await response.json()
    setUsers(temporaryUser)
    if (dropValue.length <= 1) {
      var temp = []
      temp.push(0)
      temporaryUser.forEach(function (item, index) {
        if (temp.indexOf(item.userId) === -1) {
          temp.push(item.userId)
        }

      });
      setDropValue(temp)

    }
  }


  const onRefresh = () => {
    setRefreshing(true)
    getUsers()
    setpickVal(0)
    setRefreshing(false)
  }


  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#ff00ff']} />}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.iconTextContainer}>
          <Picker style={styles.picker} selectedValue={pickVal} onValueChange={(e) => getSelectedUser(e)}>
            {dropValue.map((obj) => {
              return (

                <Picker.Item label={
                  obj === 0 ? "--Select Author--" :
                    `Author: ${obj}`

                } value={obj} key={obj} />
              )
            })}


          </Picker>
          <Text style={[styles.title, { color: theme.color }]}>Welcome Readers</Text>
          <Text style={[{ color: theme.color }]}>
            Dark | Light

          </Text>
          <Switch value={mode} onValueChange={() => {
            setMode((value) => !value)
            EventRegister.emit("changeTheme", mode)
          }} />

          <View style={styles.container}>
            {users.map((object) => {
              return (
                <View style={styles.item} key={object.id}>
                  <AccordionItem id={object.id} title={object.title} author={object.userId} bodyText={object.body} />

                </View>
              )
            })}
          </View>

          <Text style={[styles.title, { color: theme.color }]}>{pickVal === 0 ? `Choose an Author` : `Author ${pickVal} Thanks You`}</Text>

        </View>

      </View>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contact: {
    paddingVertical: '1%',
    paddingHorizontal: '1%',
    height: '100%',
    backgroundColor: '#e7e7e7'
  },
  contAcc: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    height: '100%',
    backgroundColor: '#e7e7e7'
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 24
  },
  iconTextContainer: {
    marginTop: 60,
    alignItems: 'center',
    padding: 5
  },
  appIcon: {
    width: 207,
    height: 191,
  },
  title: {
    //paddingTop: 20,
    paddingBottom: 15,

    //textAlign: 'center',

    justifyContent: 'space-between',
    //alignItems: 'center',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    color: '#FFFFFF'
  },
  picker: {
    width: 300,
    height: 45,
    borderColor: 'red',
    borderWidth: 2,
    backgroundColor: 'gray',
    color: 'white',
    borderRadius: 20,
    overflow: 'hidden'
  },
  item: {
    margin: 10,
    backgroundColor: '#4ae1fa',
    //justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 12,
    padding: 12,
  },
  content: {
    overflow: 'hidden',
    margin: 5,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 4
  },
  text: {
    color: '#000000',
    fontSize: 15,
    fontStyle: 'italic',
    //margin: 10
  }
});
export default StartPage