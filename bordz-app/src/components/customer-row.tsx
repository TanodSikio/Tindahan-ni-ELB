import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

type CustomerRowProps = {name: string, balance: number, lastPaid: string};

export function CustomerRow({name, balance, lastPaid}: CustomerRowProps) {
    const [expanded, setExpanded] = useState(false);
    return(
        <Pressable
            onPress={() => setExpanded(!expanded)}
            style={{paddingVertical: 14, borderBottomWidth: 1, borderColor: "#ddd"}}
        >
            <View style={{paddingVertical: 14, borderBottomWidth: 1, borderColor: "#ddd"}}>
                <ThemedText style={{fontSize: 18}}>{name}</ThemedText>
                <ThemedText>P {balance.toFixed(2)}</ThemedText>
                {expanded && <Text>Last Paid: {lastPaid}</Text>}
            </View>
        </Pressable>
    );
}