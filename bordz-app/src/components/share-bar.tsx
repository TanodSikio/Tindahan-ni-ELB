import { View } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { ThemedText } from "./themed-text";

type ShareBarProps = { name: string; balance: number; share: number };

export function ShareBar({ name, balance, share }: ShareBarProps) {
  const theme = useTheme();

  return (
    <View>
      <ThemedText type="small">{name}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        P {balance.toFixed(2)} · {Math.round(share * 100)}%
      </ThemedText>

      <View
        style={{
          height: 8,
          borderRadius: 4,
          backgroundColor: theme.backgroundSelected,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: 8,
            width: `${Math.max(share * 100, 2)}%`,
            backgroundColor: "#3c87f7",
          }}
        />
      </View>
    </View>
  );
}
