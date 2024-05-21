import React, { useState } from "react";
import { SafeAreaView, FlatList, TouchableOpacity, Dimensions, Image, Text, View, Modal, ActivityIndicator } from "react-native";
import { videosListData } from "./data";
import Video from "react-native-video";
const { width } = Dimensions.get('window');

const App = () => {
  const [videoModalContent, setVideoModalContent] = useState({
    visible: false,
    url: '',
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

      <VideoModal showModal={videoModalContent.visible} hideModal={() => setVideoModalContent({ url: "", visible: false })}
        uri={videoModalContent.url} />

      <FlatList data={videosListData}
        extraData={videosListData}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => {
          return (
            <View style={{ height: 60, width: width - 32, alignSelf: 'center', borderBottomWidth: .5, borderBottomColor: 'grey', alignItems: 'center', flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, marginStart: 16, flex: 1, }}>{item.title}</Text>
              <Text style={{ fontSize: 16, }} onPress={() => setVideoModalContent({ url: item.url, visible: true })}>Play</Text>
            </View>
          )
        }} />
    </SafeAreaView>
  )
}

const ic_cross = "https://cdn-icons-png.flaticon.com/512/9068/9068678.png";
const VideoModal = ({ showModal, hideModal, uri, }:any) => {

  const [isLoading, setIsLoading] = useState(true)

  return (
    <Modal visible={showModal} animationType='slide'>
      <SafeAreaView style={{ flex: 1, }}>
        <TouchableOpacity style={{ alignSelf: 'flex-end', marginEnd: 16, }} onPress={() => hideModal()}>
          <Image source={{ uri: ic_cross }} style={{ height: 40, width: 40, padding: 20, }} />
        </TouchableOpacity>

        {!isLoading && <ActivityIndicator style={{ alignSelf: 'center', position: 'absolute', top: 0, bottom: 0 }} size={"large"} />}
        <Video style={{ height: width, width, marginTop: width / 3.5 }} source={{ uri }} onLoadStart={() => setIsLoading(false)} />

      </SafeAreaView>
    </Modal>
  )
}

export default App;