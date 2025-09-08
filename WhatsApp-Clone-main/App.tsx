import { PaperProvider } from "react-native-paper";
import RootNavigator from "@navigators/RootNavigator";

export default function App() {
  return (
    <PaperProvider>
      <RootNavigator />
    </PaperProvider>
  );
}
