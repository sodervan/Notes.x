import React, { useRef, useEffect, useCallback } from "react";
import { useKeyboard } from "@react-native-community/hooks";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import useStore from "../Store/Store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const handleHead = ({ tintColor }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);

const NewNotesPage = () => {
  const navigation = useNavigation();
  const richText = useRef();
  const keyboard = useKeyboard();
  const title = useStore((state) => state.title);
  const desc = useStore((state) => state.description);
  const changeTitle = useStore((state) => state.setTitle);
  const changeDesc = useStore((state) => state.setDescription);
  const getCurrent = useStore((state) => state.currentNote);
  const clearCurrent = useStore((state) => state.clearCurrent);
  const handleScreenLeave = useCallback(() => {
    setTimeout(() => {
      changeTitle("");
      changeDesc("");
      clearCurrent()
    }, 100);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener(
        "beforeRemove",
        handleScreenLeave,
      );

      return unsubscribe;
    }, [navigation, handleScreenLeave]),
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "padding" : "height"}
      >
        {/* Fixed Title Input */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: "white",
          }}
        >
          <TextInput
            value={title}
            placeholder="TITLE"
            style={{
              width: "100%",
              paddingVertical: 5,
              fontSize: 18,
              fontFamily: "Poppins-Bold",
            }}
            onChangeText={(text) => {
              changeTitle(text);
            }}
          />
        </View>

        {/* Scrollable RichEditor Content */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 70,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              paddingHorizontal: 10,
              flex: 1,
              backgroundColor: "white",
            }}
          >
            <RichEditor
              ref={richText}
              style={{
                flex: 1,
                borderTopColor: "#eeeeee",
                borderTopWidth: 1,
                paddingVertical: 15,
              }}
              placeholder="Start typing your note..."
              onChange={(text) => {
                changeDesc(text);
              }}
              initialContentHTML={desc}
            />
          </View>
        </ScrollView>

        {/* Toolbar for text formatting actions */}
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            backgroundColor: "black",
            padding: 10,
            borderRadius: 20,
            zIndex: 20,
          }}
        >
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertImage,
              actions.heading1,
              actions.undo,
              actions.redo,
            ]}
            iconMap={{
              [actions.heading1]: handleHead,
            }}
            style={{ backgroundColor: "black" }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewNotesPage;
