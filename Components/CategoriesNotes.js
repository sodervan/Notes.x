import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";
import useStore from "../Store/Store";

const CategoriesNotes = ({ route, navigation }) => {
  const [theCatNotes, setCatNotes] = useState([]);
  const { category } = route.params;
  const notes = useStore((state) => state.notes);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 20 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
  };

  useEffect(() => {
    const catNotes = notes.filter(
      (item) => item.categoryName && item.categoryName === category.name,
    );
    // console.log(notes);
    setCatNotes(catNotes);
    // console.log(catNotes);
  }, [category, notes]);

  const renderNote = ({ item, index }) => {
    return (
      <Animated.View style={[animatedStyle, { marginBottom: 15 }]}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={{
            backgroundColor: item.color,
            padding: 20,
            borderRadius: 12,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 18,
              color: "#333",
            }}
          >
            {item.title}
          </Text>
          <Text style={{ fontSize: 16, color: "#666", marginTop: 5 }}>
            {item.description}
          </Text>
          <Text style={{ fontSize: 12, color: "#999", marginTop: 10 }}>
            {item.date}
          </Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={{ padding: 20, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>
          {category.name}
        </Text>
      </View>

      {theCatNotes.length > 0 ? (
        <FlatList
          data={theCatNotes}
          renderItem={renderNote}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("NewNotesPage", { name: category.name })
            }
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f1f1f1",
              width: 80,
              height: 80,
              borderRadius: 40,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <Ionicons name="add" size={40} color="#FA8E63" />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              color: "#999",
              fontFamily: "Poppins-Regular",
            }}
          >
            Add a new note
          </Text>
        </View>
      )}
    </View>
  );
};

export default CategoriesNotes;
