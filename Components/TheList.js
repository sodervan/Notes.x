import React, { useEffect } from "react";
import { Pressable, FlatList, View, Text, TextInput } from "react-native";
import useStore from "../Store/Store";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";

const ListItem = ({
  item,
  index,
  setCurrent,
  navigation,
  enableSelection,
  isSelection,
  selectedIndexes,
  removeSelection,
}) => {
  const scale = useSharedValue(1);
  const height = useSharedValue(100);
  let deleteTimeout = null;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const handlePressIn = () => {
    scale.value = withSpring(0.98);

    deleteTimeout = setTimeout(() => {
      if (selectedIndexes.includes(index)) {
        removeSelection(index);
      } else {
        enableSelection(index);
      }
      // handlePressOut();
    }, 500);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);

    if (deleteTimeout) {
      clearTimeout(deleteTimeout);
    }
  };
  useEffect(() => {
    console.log(selectedIndexes);
  }, [selectedIndexes]);
  return (
    <Animated.View style={[animatedStyle, { marginBottom: 15 }]}>
      <Pressable
        onPress={() => {
          if (selectedIndexes.length > 0) {
            if (selectedIndexes.includes(index)) {
              removeSelection(index);
            } else {
              enableSelection(index);
            }
          } else {
            setCurrent(index);
            navigation.navigate("NewNotesPage");
          }
        }}
        onPressIn={() => {
          handlePressIn();
        }}
        onPressOut={() => {
          handlePressOut();
        }}
      >
        <Animated.View
          style={[
            selectedIndexes.includes(index)
              ? { borderColor: "#FA8E63", borderWidth: 2 }
              : {},
            {
              flexDirection: "column",
              gap: 7,
              position: "relative",
              width: "100%",
              borderRadius: 15,
              padding: 20,
              backgroundColor: item.color,
            },
          ]}
        >
          {item.categoryName ? (
            <View
              style={{
                position: "absolute",
                right: 18,
                bottom: 18,
                borderRadius: 5,
                backgroundColor: "white",
                paddingHorizontal: 10,
                paddingVertical: 1
              }}
            >
              <Text>{item.categoryName}</Text>
            </View>
          ) : (
            ""
          )}
          <View
            style={{
              position: "absolute",
              top: 3,
              right: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedIndexes.includes(index) ? (
              <Ionicons name="checkmark-circle" color="#FA8E63" size={40} />
            ) : (
              ""
            )}
            {selectedIndexes.length > 0 && !selectedIndexes.includes(index) ? (
              <Ionicons
                name="radio-button-off-outline"
                color="#FA8E63"
                size={40}
              />
            ) : (
              ""
            )}
          </View>
          <View>
            <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold" }}>
              {item.title}
            </Text>
          </View>
          <View>
            <TextInput
              style={{
                color: "gray",
                backgroundColor: "transparent",
                fontSize: 16,
              }}
              value={item.description}
              multiline
              editable={false}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#9d9d9d" }}>{item.date || ""}</Text>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const TheList = () => {
  const navigation = useNavigation();
  const notes = useStore((state) => state.notes);
  const setCurrent = useStore((state) => state.setCurrentNote);
  const clearTitle = useStore((state) => state.clearTitle);
  const clearDesc = useStore((state) => state.clearDesc);
  const enableSelection = useStore((state) => state.handleEnableSelection);
  const isSelection = useStore((state) => state.isSelection);
  const selectedIndexes = useStore((state) => state.selectedIndexes);
  const removeSelection = useStore((state) => state.removeSelection);

  useEffect(() => {
    clearDesc();
    clearTitle();
  }, [notes]);

  return (
    <FlatList
      data={notes}
      renderItem={({ item, index }) => (
        <ListItem
          item={item}
          index={index}
          setCurrent={setCurrent}
          navigation={navigation}
          enableSelection={enableSelection}
          isSelection={isSelection}
          selectedIndexes={selectedIndexes}
          removeSelection={removeSelection}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{
        paddingBottom: 75,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
      }}
    />
  );
};

export default TheList;
