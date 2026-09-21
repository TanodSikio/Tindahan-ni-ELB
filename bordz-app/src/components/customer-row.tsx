import { ThemedText } from '@/components/themed-text';
import { Pressable, StyleSheet } from 'react-native';

type CustomerRowProps = {name: string, balance: number, onPress: () => void};

export function CustomerRow({name, balance, onPress }: CustomerRowProps) {
    return(
        <Pressable onPress={onPress} style={styles.row}>
            <ThemedText>{name}</ThemedText>
            <ThemedText themeColor='textSecondary'>P {balance.toFixed(2)}</ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});