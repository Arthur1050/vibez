import TabsContent from "@/components/TabsContent";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <>
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
        <Tabs.Screen
          name="perfil"
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <MaterialIcons color={color} name={"person"} size={24} />
            ),
          }}
        />
      </TabsContent>
    </>
  );
}
