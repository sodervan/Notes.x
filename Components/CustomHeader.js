import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import useStore from "../Store/Store";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();
  const catName = useStore((state) => state.categoryName);
  const notes = useStore((state) => state.notes);
  const addToNotes = useStore((state) => state.addToNote);
  const word = useStore((state) => state.title);
  const desc = useStore((state) => state.description);
  const colors = useStore((state) => state.colors);
  // const clearTitle = useStore((state) => state.clearTitle);
  // const clearDesc = useStore((state) => state.clearDesc);
  const currentNote = useStore((state) => state.currentNote);
  const clearCurrent = useStore((state) => state.clearCurrent);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  const getDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  };
  return (
    <View style={styles.headerContainer}>
      {title === "NewNotesPage" ? (
        <TouchableOpacity>
          <Ionicons name="close-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      ) : (
        ""
      )}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        {title !== "NewNotesPage" ? (
          <Image
            source={require("../assets/logo-removebg-preview.png")}
            style={{ width: 50, height: 50, resizeMode: "cover" }}
          />
        ) : (
          ""
        )}
        <Text style={styles.headerTitle}>
          {title === "NewNotesPage" ? "Edit Note" : "Notes.x"}
        </Text>
      </View>
      {title !== "NewNotesPage" ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <Ionicons name="search-outline" size={25} color="black" />
          <Ionicons name="notifications-outline" size={25} color="black" />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            if (catName) {
              addToNotes({
                categoryName: catName,
                title: word,
                description: desc,
                date: getDate(),
                color: getRandomColor(),
              });
            } else {
              if (currentNote.title) {
                notes.splice(currentNote.id, 1);
                addToNotes({
                  title: word,
                  description: desc,
                  date: getDate(),
                  color: getRandomColor(),
                });
                clearCurrent();
              } else {
                addToNotes({
                  title: word,
                  description: desc,
                  date: getDate(),
                  color: getRandomColor(),
                });
              }
            }

            navigation.navigate("MainTabs");
          }}
        >
          <Ionicons name="checkmark-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 28,
    flexDirection: "row",
    backgroundColor: "white",
    height: 130,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#eeeeee",
    borderWidth: 1,
  },
  headerTitle: {
    color: "black",
    fontSize: 23,
    fontFamily: "Poppins-Bold",
  },
});

export default CustomHeader;
