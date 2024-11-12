import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import useStore from "../Store/Store";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RichEditor } from "react-native-pell-rich-editor";
import React, { useRef } from "react";
import TheList from "./TheList";

const Notes = () => {
  const richText = React.useRef();
  const notes = useStore((state) => state.notes);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <View>
          <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15 }}>
            List Notes
          </Text>
        </View>
        <View></View>
      </View>

      {/* NOTES LIST */}
      {notes.length > 0 ? <TheList /> : ""}

      {notes.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 150,
          }}
        >
          <Ionicons name="trash-bin-outline" size={70} />
          <Text>No Notes yet</Text>
        </View>
      ) : (
        ""
      )}
    </>
  );
};

export default Notes;
