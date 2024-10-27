import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Data {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const App = () => {
  const [datas, setData] = useState<Data[]>([])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products?limit=20')
      setData(response.data)

    } catch (erorr) {
      console.log(erorr)
    }
  }

  const postData = async () => {
    try {
      const newData = {
        title: 'Le Mineral',
        price: 10.5,
        description: 'A Good Water',
        image: 'https://i.pravatar.cc',
        category: 'water',

      };
      const response = await axios.post(
        'https://fakestoreapi.com/products',
        newData,
      );
      console.log(response.data)
      console.log(response.status)
    } catch (erorr) {
      console.log(erorr)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(datas);

  return (
    <ScrollView>
      <View>
        <Text>Hello World!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={postData}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: '500',
              fontSize: 15,
            }}
          >
            Post
          </Text>
        </TouchableOpacity>
        {
          datas.map((data, index) => (
            <View key={index}>
              <Text>{data.title}</Text>
              <Text>{data.price}</Text>
              <Text>{data.description}</Text>
              <Text>{data.category}</Text>
              <Image source={{ uri: data.image }} style={{ width: 100, height: 100 }}></Image>
            </View>
          ))
        }
      </View>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    width: 295,
    height: 50,
    justifyContent: 'center',
  }
})