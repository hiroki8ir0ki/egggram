import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import Fire from "../Fire";
import firebase from "firebase";

// temporary data until we pull from Firebase

export default class HomeScreen extends Component {
  state = {
    posts: null,
    postsRef: Fire.shared.firestore.collection("posts"),
  };

  componentDidMount() {
    this.state.postsRef.onSnapshot((querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          image: doc.data().image,
          likes: doc.data().likes,
          location: doc.data().location,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
          uid: doc.data().uid,
        };
        temp.push(data);
      });

      this.setState({ posts: temp });
    });
  }

  toggleLike = (post) => {
    const userId = Fire.shared.uid;

    post.likes.includes(userId)
      ? Fire.shared.unlike(post)
      : Fire.shared.like(post);
  };

  renderPost = (post) => {
    const uid = Fire.shared.uid;
    return (
      <View style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>
            <Ionicons name="ios-more" size={24} color="#73788B" />
          </View>

          <Text style={styles.post}>{post.text}</Text>

          <Image
            source={{
              uri: post.image,
            }}
            style={styles.postImage}
            resizeMode="cover"
          />

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => this.toggleLike(post)}>
              <Ionicons
                name={
                  post.likes.includes(uid) ? "ios-heart" : "ios-heart-empty"
                }
                size={24}
                color="#73788B"
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>

            <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>

        <FlatList
          style={styles.feed}
          data={this.state.posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
