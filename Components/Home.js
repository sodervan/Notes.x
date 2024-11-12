import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Notes from "./Notes";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [activePage, setActiveState] = useState("notes");

  const handlePageChange = (prop) => {
    setActiveState(prop);
  };

  return (
    <>
      <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
        {/* Floating Button */}
        <Pressable
          style={{
            position: "absolute",
            bottom: 120,
            right: 20,
            zIndex: 20,
            backgroundColor: "black",
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            elevation: 4,
          }}
          onPress={() => {
            navigation.navigate("NewNotesPage");
          }}
        >
          <Ionicons name="add" size={30} color="white" />
        </Pressable>

        {/* Tabs */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            height: 60,
            backgroundColor: "#F6F6F6",
            padding: 7,
            borderRadius: 17,
            gap: 5,
          }}
        >
          {/* Notes Tab */}
          <TouchableOpacity
            style={[
              activePage === "notes"
                ? {
                    backgroundColor: "black",
                    flex: 1,
                    borderRadius: 17,
                    alignItems: "center",
                    justifyContent: "center",
                  }
                : {
                    flex: 1,
                    borderRadius: 17,
                    alignItems: "center",
                    justifyContent: "center",
                  },
            ]}
            onPress={() => handlePageChange("notes")}
          >
            <Text
              style={
                activePage === "notes"
                  ? {
                      color: "white",
                      fontFamily: "Poppins-SemiBold",
                    }
                  : { color: "gray" }
              }
            >
              Notes
            </Text>
          </TouchableOpacity>

          {/* Highlights Tab */}
          <TouchableOpacity
            style={[
              activePage === "highlights"
                ? {
                    backgroundColor: "black",
                    flex: 1,
                    borderRadius: 17,
                    alignItems: "center",
                    justifyContent: "center",
                  }
                : {
                    flex: 1,
                    borderRadius: 17,
                    alignItems: "center",
                    justifyContent: "center",
                  },
            ]}
            onPress={() => handlePageChange("highlights")}
          >
            <Text
              style={
                activePage === "highlights"
                  ? { color: "white", fontFamily: "Poppins-SemiBold" }
                  : { color: "gray" }
              }
            >
              Highlights
            </Text>
          </TouchableOpacity>

          {/* Favourites Tab */}
          <TouchableOpacity
            style={[
              activePage === "favourites"
                ? {
                    backgroundColor: "black",
                    flex: 1,
                    borderRadius: 17,
                    alignItems: "center",
                    justifyContent: "center",
                  }
                : {
                    flex: 1,
                    borderRadius: 17,
                    alignItems: "center",
                    justifyContent: "center",
                  },
            ]}
            onPress={() => handlePageChange("favourites")}
          >
            <Text
              style={
                activePage === "favourites"
                  ? { color: "white", fontFamily: "Poppins-SemiBold" }
                  : { color: "gray" }
              }
            >
              Favourites
            </Text>
          </TouchableOpacity>
        </View>
        <Notes />
      </View>
    </>
  );
};

export default Home;
