import { addCustomer } from "@/data/customers";
import { problemFor } from "@/data/problem";
import { useState } from "react";
import { Button, Modal, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "./themed-text";

type AddCustomerModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdded: () => void;
};

export function AddCustomerModal({
  visible,
  onClose,
  onAdded,
}: AddCustomerModalProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);
  const [problem, setProblem] = useState("");

  const balance = Number(amount);
  const valid =
    name.trim() !== "" &&
    amount !== "" &&
    !Number.isNaN(balance) &&
    balance >= 0;

  function save() {
    setSaving(true);
    setProblem("");
    addCustomer(name.trim(), balance)
      .then(() => {
        setName("");
        setAmount("");
        onClose();
        onAdded();
      })
      .catch((e) => {
        setProblem(problemFor(e));
        setSaving(false);
      });
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            editable={!saving}
            style={styles.input}
          />
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Amount owed"
            keyboardType="decimal-pad"
            editable={!saving}
            style={styles.input}
          />
          {problem !== "" && <ThemedText>{problem}</ThemedText>}
          <Button
            title={saving ? "Saving" : "Add"}
            onPress={save}
            disabled={!valid || saving}
          />
          <Button title="Cancel" onPress={onClose} disabled={saving} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  card: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
});
