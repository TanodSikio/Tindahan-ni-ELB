import * as Device from "expo-device";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ShareBar } from "@/components/share-bar";
import { Stat } from "@/components/stat";
import { ThemedText } from "@/components/themed-text";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { summarise } from "@/data/summary";
import { useCustomers } from "@/hooks/use-customers";
import { useRouter } from "expo-router";

function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { status, customer, problem, retry } = useCustomers();
  const summary = summarise(customer);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statRow}>
        <Stat label="Total owed" value={`P ${summary.total.toFixed(2)}`} />
        <Stat label="Averaged owed" value={`P ${summary.average.toFixed(2)}`} />
      </View>
      <View style={styles.statRow}>
        <Stat
          label="Still owing"
          value={`${summary.owing} of ${summary.count}`}
        />
        <Stat label="Settled" value={String(summary.settled)} />
      </View>

      {summary.ranked.map((c) => (
        <ShareBar
          key={c.id}
          name={c.name}
          balance={c.balance}
          share={c.share}
        />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: Spacing.three,
    padding: Spacing.four,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.three,
  },
});
