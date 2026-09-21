export type Customer = {
    id: string;
    name: string;
    balance: number;
    lastPaid: string;
};

const BASE = process.env.EXPO_PUBLIC_API_URL;
if(!BASE) throw new Error("Set EXPO_PUBLIC_API_URL in .env");

function timeout(ms: number): Promise<never>{
    return new Promise((_, fail) =>
        setTimeout(() => fail(new Error("timeout")), ms)
    );
}

async function get(path: string){
    const res = await fetch(BASE + path);
    if(!res.ok) throw new Error(String(res.status));
    return res.json();
}

export const fetchCustomers = (): Promise<Customer[]> => get("/api/customers");
export const fetchCustomer = (id: string): Promise<Customer> => get(`/api/customers/${id}`);