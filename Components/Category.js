import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import useStore from "../Store/Store";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const colorOptions = [
  {
    background: "#FF6B6B", // thick red
    backgroundLight: "#FFE6E6", // light red
  },
  {
    background: "#4ECDC4", // thick teal
    backgroundLight: "#D8F6F2", // light teal
  },
  {
    background: "#FFD93D", // thick yellow
    backgroundLight: "#FFF8DC", // light yellow
  },
  {
    background: "#6A4C93", // thick purple
    backgroundLight: "#E8DEF1", // light purple
  },
  {
    background: "#FF9F1C", // thick orange
    backgroundLight: "#FFECD1", // light orange
  },
  {
    background: "#2EC4B6", // thick turquoise
    backgroundLight: "#D9F4F1", // light turquoise
  },
  {
    background: "#E71D36", // thick crimson
    backgroundLight: "#FCE4E8", // light crimson
  },
];

const Category = () => {
  const categories = useStore((state) => state.categories);
  const handleCategories = useStore((state) => state.handleAddCategories);
  const isAddCategories = useStore((state) => state.addCategories);
  const addToCategory = useStore((state) => state.addToCategories);
  const screenHeight = Dimensions.get("window").height;
  const overlayOpacity = useSharedValue(0);
  const translateY = useSharedValue(screenHeight);
  const navigation = useNavigation();
  const [selectedColor, setSelectedColor] = useState(
    colorOptions[0].background,
  );
  const [selectedBackground, setSelectedBackground] = useState(
    colorOptions[0].backgroundLight,
  );
  const [categoryName, setCategoryName] = useState("");
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 20 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
  };
  useEffect(() => {
    translateY.value = isAddCategories ? screenHeight * 0.5 : screenHeight;
    overlayOpacity.value = isAddCategories
      ? withTiming(0.5, { duration: 300 })
      : withTiming(0, { duration: 300 });
  }, [isAddCategories]);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(translateY.value, {
          duration: 1000,
          dampingRatio: 1,
        }),
      },
    ],
    height: screenHeight,
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    zIndex: 10,
    padding: 20,
  }));
  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    top: 0,
    left: 0,
    zIndex: 5,
  }));
  return (
    <>
      {/*Add Modal*/}
      {isAddCategories && (
        <Animated.View style={[overlayStyle]}></Animated.View>
      )}
      <Animated.View style={[animatedStyle]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingVertical: 10,
          }}
        >
          <View></View>
          <Text style={{ fontSize: 20, fontFamily: "Poppins-SemiBold" }}>
            Add New Category
          </Text>
          <TouchableOpacity onPress={handleCategories}>
            <Ionicons name="close-circle-outline" color="black" size={30} />
          </TouchableOpacity>
        </View>

        <TextInput
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
            padding: 10,
            marginVertical: 15,
            fontSize: 16,
            fontFamily: "Poppins-Regular",
          }}
          placeholder="Enter category name"
          value={categoryName}
          onChangeText={setCategoryName}
        />

        <Text
          style={{
            fontSize: 16,
            marginVertical: 10,
            fontFamily: "Poppins-SemiBold",
          }}
        >
          Choose a Color
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginBottom: 20,
          }}
        >
          {colorOptions.map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedColor(color.background);
                setSelectedBackground(color.backgroundLight);
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: color.background,
                margin: 5,
                borderWidth: selectedColor === color.background ? 2 : 0,
                borderColor:
                  selectedColor === color.background ? "#000" : "transparent",
              }}
            />
          ))}
        </View>

        <Animated.View
          style={[
            scaleStyle,
            {
              width: "100%",
              flexDirection: "column",
              padding: 15,
              borderRadius: 15,
              backgroundColor: "#000",
              alignItems: "center",
              marginTop: 10,
              justifyContent: "center",
            },
          ]}
        >
          <Pressable
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              addToCategory({
                name: categoryName,
                color: selectedColor,
                background: selectedBackground,
                notes: [],
              });
              console.log(categories);
              handleCategories(); // Close modal
            }}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
                fontFamily: "Poppins-SemiBold",
              }}
            >
              Add Category
            </Text>
          </Pressable>
        </Animated.View>
      </Animated.View>

      {/*CATEGORIES*/}
      <View style={{ padding: 20, flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15, fontFamily: "Poppins-SemiBold" }}>
            List Categories
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleCategories();
              console.log(isAddCategories);
            }}
          >
            <Ionicons name="add-circle-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {categories.length > 0 ? (
          <FlatList
            data={categories}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CategoriesNotes", { category: item })
                }
                style={{
                  flex: 1,
                  paddingVertical: 20,
                  borderRadius: 20,
                  backgroundColor: item.background,
                  alignItems: "center",
                  // justifyContent: "center",
                  padding: 10,
                  margin: 5,
                }}
              >
                <Ionicons name="folder-open" color={item.color} size={60} />
                <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 70,
            }}
          >
            <Ionicons name="trash-bin-outline" color="black" size={70} />
            <Text>No Categories</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default Category;
