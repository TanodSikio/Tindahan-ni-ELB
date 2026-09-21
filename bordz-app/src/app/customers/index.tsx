import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';

import { CustomerRow } from '@/components/customer-row';
import { ThemedText } from '@/components/themed-text';
import { Customer, fetchCustomers } from '@/data/customers';
import { problemFor, Status } from '@/data/problem';
import { ThemedView } from '@/components/themed-view';

export default function CustomersScreen() {
    const router = useRouter();
    const theme = useTheme();
    const [status, setStatus] = useState<Status>("loading");
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [problem, setProblem] = useState("");
    const [attempt, setAttempt] = useState(0);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setStatus("loading");
        let live = true;
        fetchCustomers()
            .then((rows) => {
                if(!live) return;
                setCustomers(rows);
                setStatus(rows.length === 0 ? "empty" : "content");
            })
            .catch((e) => {
                if(!live) return;
                setProblem(problemFor(e));
                setStatus("error");
            });
        return () => { live = false; };
    }, [attempt]);

    function addWalkIn(){
        const id = String(Date.now());
        const walkin = {id, name: "Walk-in", balance: 0, lastPaid: "Never"};
        setCustomers([...customers, walkin]);
    }

    const shown = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
    );
    const total = shown.reduce((sum, c) => sum + c.balance, 0);

    if(status === "loading") return(
        <ThemedView style={styles.middle}><ActivityIndicator/></ThemedView>
    );
    if(status === "error") return(
        <ThemedView style={styles.middle}>
            <ThemedText>{problem}</ThemedText>
            <Button title="Try again" onPress={() => setAttempt(attempt + 1)}/>
        </ThemedView>
    );
    if(status === "empty") return(
        <ThemedView style={styles.middle}><ThemedText>No customer yet.</ThemedText></ThemedView>
    );

    return(
        <SafeAreaView style={styles.screen}>
            <ThemedText style={{fontSize: 28, fontWeight: "600"}}>Customers</ThemedText>
            <TextInput value={query} onChangeText={setQuery} placeholder="Search customers"
                style={[styles.search, { color: theme.text, borderColor: theme.textSecondary}]} />
            <Button title="Add Walk-in" onPress={addWalkIn}/>
            <ThemedText>Total owed: P {total.toFixed(2)}</ThemedText>
            <FlatList data={shown} keyExtractor={(c) => c.id}
                renderItem={({item}) => <CustomerRow name={item.name} balance={item.balance}
                onPress={() => router.push(`/customers/${item.id}`)}/>
            }
                ListEmptyComponent={<ThemedText>No customer match "{query}".</ThemedText>}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    middle: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
    screen: { flex: 1, padding: 24, gap: 12 },
    search: { borderWidth: 1, borderRadius: 8, padding: 12 },
});