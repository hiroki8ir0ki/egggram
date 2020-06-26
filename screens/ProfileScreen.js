import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Route,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Fire from "../Fire";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export default class ProfileScreen extends React.Component {
  state = {
    password: "",
    email: "",
    avatar: "",
    newImage: null,
  };

  unsubscribe = null;

  follow = {};

  componentDidMount() {
    const user = this.props.uid || Fire.shared.uid;
    this.unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        console.log(doc.data());
        this.setState({
          name: doc.data().name,
          email: doc.data().email,
          avatar: doc.data().avatar,
        });
      });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ newImage: result.uri, avatar: result.uri });
    }
  };

  update = () => {
    Fire.shared.updateUser({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      avatar: this.state.newImage,
    });
  };
  // Route.delete('/unfollow/:id', 'UserController.unFollow')
  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ alignItems: "flex-end", margin: 20 }}>
          <TouchableOpacity
            onPress={() => {
              Fire.shared.signOut();
            }}
          >
            <MaterialCommunityIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 64, alignItems: "center" }}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                this.state.avatar
                  ? { uri: this.state.avatar }
                  : require("../assets/tempAvatar.jpg")
              }
              style={styles.avatar}
            />
          </View>
          <TouchableOpacity onPress={this.pickImage}>
            <Text>Change avatar</Text>
          </TouchableOpacity>
          <Text style={styles.name}>{this.state.name}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>21</Text>
            <Text style={styles.statTitle}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>981</Text>
            <Text style={styles.statTitle}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>63</Text>
            <Text style={styles.statTitle}>Following</Text>
          </View>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="name"
            onChangeText={(input) => {
              this.setState({ name: input });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={(input) => {
              this.setState({ email: input });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={(input) => {
              this.setState({ password: input });
            }}
          />
          <TouchableOpacity style={styles.submit} onPress={this.update}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    marginTop: 64,
    alignItems: "center",
  },
  avatarContainer: {
    shadowColor: "#151734",
    shadowRadius: 30,
    shadowOpacity: 0.4,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statAmount: {
    color: "#4F566D",
    fontSize: 18,
    fontWeight: "300",
  },
  statTitle: {
    color: "#C3C5CD",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  form: {
    padding: 10,
    alignItems: "center",
  },
  input: {
    width: "98%",
    paddingVertical: 7,
    borderColor: "rgba(187,187,187,0.87)",
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  submit: {
    width: 150,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "rgba(179,0,255,0.39)",
  },
});
