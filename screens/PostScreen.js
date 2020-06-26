import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  Image,
  cameraToggle,
} from "react-native";
import Fire from "../Fire";
import { Entypo } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import UserPermissions from "../utilities/UserPermission";
import * as ImageManipulator from "expo-image-manipulator";

const firebase = require("firebase");
require("firebase/firestore");

export default class PostScreen extends React.Component {
  state = {
    text: "",
    image: null,
    showCamera: false,
    type: Camera.Constants.Type.front,
  };

  componentDidMount() {
    UserPermissions.getCameraPermission();
  }

  handlePost = () => {
    Fire.shared
      .addPost({ text: this.state.text.trim(), localUri: this.state.image })
      .then((ref) => {
        this.setState({ text: "", image: null });
        this.props.navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  capture = async () => {
    const image = await this.camera.takePictureAsync();

    if (!image.cancelled) {
      const resize = await ImageManipulator.manipulateAsync(image.uri, [], {
        format: "jpeg",
        compress: 0.1,
      });
      this.setState({ image: resize.uri, showCamera: false });
    }
  };
  flip = () => {
    const frontCamera = Camera.Constants.Type.front;
    const backCamera = Camera.Constants.Type.back;

    const type = this.state.type == frontCamera ? backCamera : frontCamera;
    this.setState({ type });
  };

  cameraToggle = async () => {
    const { status } = await Camera.requestPermissionsAsync();

    this.setState({ showCamera: status === "granted" });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePost}>
            <Text style={{ fontWeight: "500", marginTop: 20 }}>Post</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/tempAvatar.jpg")}
            style={styles.avatar}
          ></Image>
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={4}
            style={{ flex: 1 }}
            placeholder="Want to share something?"
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.photo} onPress={this.cameraToggle}>
          <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
          <Image
            source={{ uri: this.state.image }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Modal visible={this.state.showCamera}>
          <Camera
            type={this.state.type}
            ref={(ref) => (this.camera = ref)}
            style={{ flex: 1, justifyContent: "space-between" }}
          >
            <View>
              <TouchableOpacity
                onPress={() => this.setState({ showCamera: false })}
                style={{ paddingTop: 20, paddingLeft: 20 }}
              >
                <Ionicons name="md-close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 60,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <TouchableOpacity onPress={this.flip}>
                <Ionicons name="ios-camera" size={40} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={this.capture}>
                <View
                  style={{
                    borderColor: "white",
                    borderWidth: 4,
                    height: 40,
                    width: 40,
                    borderRadius: 40,
                  }}
                ></View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.pickImage}>
                <Entypo name="images" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
});
