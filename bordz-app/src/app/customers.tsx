import { useState } from 'react';
import { Button, FlatList, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomerRow } from '@/components/customer-row';
import { ThemedText } from '@/components/themed-text';
import { SEED } from '@/data/customers';

export default function CustomersScreen() {
    const [customers, setCustomers] = useState(SEED);
    const [query, setQuery] = useState("");
    const shown = customers.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
    );

    function addWalkIn(){
        const id = String(Date.now());
        const walkin = {id, name: "Walk-in", balance: 0, lastPaid: "Never"};
        setCustomers([...customers, walkin]);
    }

    const total = shown.reduce((sum, c) => sum + c.balance, 0);
    return(
        <SafeAreaView style={{flex: 1, padding: 24, gap: 12}}>
            <ThemedText style={{fontSize: 28, fontWeight: "600"}}>Customers</ThemedText>
            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search customers"
                style={{borderWidth: 1, borderRadius: 8, padding: 12}}
            />
            <Text style={{fontSize: 18}}>Total Owed: P {total.toFixed(2)}</Text>
            <Button title="Add Walk-in" onPress={addWalkIn}/>
            <FlatList
                data={shown}
                keyExtractor={(c) => c.id}
                renderItem={({item}) => <CustomerRow {...item}/>}
                ListEmptyComponent={<Text>No Customers Match "{query}".</Text>}
            />
        </SafeAreaView>
    );
}