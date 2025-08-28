import TabsContent from "@/components/TabsContent";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function TabLayout() {
  return (
    <>
      <View>
        <Text>Teste</Text>
      </View>
      <TabsContent>
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <MaterialIcons color={color} name={"house"} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <MaterialIcons color={color} name={"explore"} size={24} />
            ),
          }}
        />
      </TabsContent>
    </>
  );
}
