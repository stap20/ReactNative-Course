import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { Card, Icon, Input, Rating } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            style={{ flex: 1 }}
            raised
            reverse
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.favorite
                ? console.log("Already favorite")
                : props.onPressFav()
            }
          />
          <Icon
            style={{ flex: 1 }}
            raised
            reverse
            name={"pencil"}
            type="font-awesome"
            color="#512DA8"
            onPress={() => props.onPressSub()}
          />
        </View>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          readonly
          imageSize={12}
          style={{ paddingVertical: 10, flexDirection: "row" }}
          startingValue={item.rating}
        />
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      author: "",
      comment: "",
      rating: 1,
    };
  }

  static navigationOptions = {
    title: "Dish Details",
  };

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(dishId) {
    this.toggleModal();
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
  }
  render() {
    const dishId = this.props.navigation.getParam("dishId", "");
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPressFav={() => this.markFavorite(dishId)}
          onPressSub={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <View style={styles.modalRow}>
              <Rating
                showRating
                ratingCount={5}
                style={{ paddingVertical: 10 }}
                startingValue={this.state.rating}
                onFinishRating={this.ratingCompleted}
              />
            </View>
            <View style={styles.modalRow}>
              <Input
                placeholder="Author"
                value={this.state.author}
                onChangeText={(text) => this.setState({ author: text })}
                leftIcon={
                  <Icon
                    name="user-o"
                    type="font-awesome"
                    size={24}
                    color="black"
                    containerStyle={{ margin: 10, marginLeft: -3 }}
                  />
                }
              />
            </View>
            <View style={styles.modalRow}>
              <Input
                placeholder="Comment"
                value={this.state.comment}
                onChangeText={(text) => this.setState({ comment: text })}
                leftIcon={
                  <Icon
                    name="comments-o"
                    type="font-awesome"
                    size={24}
                    color="black"
                    containerStyle={{ margin: 10, marginLeft: -3 }}
                  />
                }
              />
            </View>
            <View style={styles.modalRow}>
              <Button
                onPress={() => {
                  this.handleComment(dishId);
                }}
                color="#512DA8"
                raised
                title="Submit"
              />
            </View>
            <View style={styles.modalRow}>
              <Button
                onPress={() => {
                  this.toggleModal();
                }}
                color="#808080"
                raised
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalRow: {
    margin: 10,
  },
});
