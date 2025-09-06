import TabsContent from "@/components/TabsContent";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  const backgroundColor = useThemeColor('--color-background');

  return (
    <>
    <View style={{ flex: 1, backgroundColor }}>
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
    </View>
    </>
  );
}