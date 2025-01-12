import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


const App = () => {
  const [photos, setPhotos] = useState([]);
  const API_KEY = "2ocLibMG6gsqWG8UxCGpoUlL1Oy8EeCHCrCoIFY5Q1boUxQ3sbDH3RkF"; // Replace with your Pexels API key

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("https://api.pexels.com/v1/curated", {
          headers: {
            Authorization: API_KEY,
          },
          params: {
            per_page: 20, // Number of photos to fetch
          },
        });
        setPhotos(response.data.photos);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
  };

  fetchPhotos();
}, []);

const [searchQuery, setSearchQuery] = useState("");

const handleSearch = async () => {
    try {
        const response = await axios.get("https://api.pexels.com/v1/search", {
            headers: {
                Authorization: API_KEY,
            },
            params: {
                query: searchQuery,
                per_page: 100,
            },
        });
        setPhotos(response.data.photos);
    } catch (error) {
        console.error("Error searching photos:", error);
    }
};

const downloadImage = async (url) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const fileUri = FileSystem.documentDirectory + 'image.jpg';
    await FileSystem.downloadAsync(url, fileUri);
    await MediaLibrary.saveToLibraryAsync(fileUri);
    alert('Image downloaded successfully!');
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Wallpaper</Text>
        </View>
        <View style={styles.searchContainer}>
        <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.icon}>
            <Icon name="search" size={20} color="#FF7366" />
        </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.tags}>Trending Photos</Text>

      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: item.src.original }}
              style={{ width: "100%", height: 250 }}
              resizeMode="cover"
            />
            <View style={styles.photoDetails}>
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => downloadImage(item.src.original)}
            >
              <Text style={styles.downloadButtonText}>Download</Text>
            </TouchableOpacity>
            <Text style={styles.photographer}>By: {item.photographer}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    photoDetails:{
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'row',
        marginTop:10,
        backgroundColor:'transparent',
        width:'100%',
        borderRadius:10,
        padding:10
    },
    downloadButton: {
        backgroundColor: "#FF7366",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
      },
      downloadButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
  tags: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  photoContainer: {
    width: "100%",
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: 350,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F2f2f2",
    marginVertical: 15,
  },
  photo: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderRadius: 10,
  },
  photographer: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: "italic",
  },
  navbar: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FF7366",
    width: "100%",
  },
  titleContainer: {
    width: "100%",
    backgroundColor: "#FF7366",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "white",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FF7366",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
});

export default App;
