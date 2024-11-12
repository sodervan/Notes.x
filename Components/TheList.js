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
}) => {
  const scale = useSharedValue(1);
  const height = useSharedValue(100);
  let deleteTimeout = null;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 20 });

    deleteTimeout = setTimeout(() => {
      enableSelection(index);
      handlePressOut();
    }, 500);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 });

    if (deleteTimeout) {
      clearTimeout(deleteTimeout);
    }
  };

  return (
    <Animated.View style={[animatedStyle, { marginBottom: 15 }]}>
      <Pressable
        onPress={() => {
          if (!isSelection) {
            setCurrent(index);
            navigation.navigate("NewNotesPage");
          } else {
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
            isSelection ? { borderColor: "orange", borderWidth: 2 } : {},
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
          <View style={{position: "absolute", top: 2, right: 2, backgroundColor: "orange", alignItems: "center", justifyContent: "center"}}>
            <Ionicons name="radio-button-off-outline" color="white" size="20"/>
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
