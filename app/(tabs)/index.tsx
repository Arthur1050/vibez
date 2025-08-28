import Map from '@/components/Map';
import { View } from "react-native";
import '../global.css';

export default function Index() {
  return (
    <View style={{flex: 1}}>
      <Map />
    </View>
  );
}