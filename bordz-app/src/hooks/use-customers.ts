import { Customer, fetchCustomers } from "@/data/customers";
import { problemFor, Status } from "@/data/problem";
import { useEffect, useState } from "react";

export function useCustomers() {
  const [status, setStatus] = useState<Status>("loading");
  const [customer, setCustomers] = useState<Customer[]>([]);
  const [problem, setPorblem] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let live = true;
    setStatus("loading");
    fetchCustomers()
      .then((rows) => {
        if (!live) return;
        setCustomers(rows);
        setStatus(rows.length === 0 ? "empty" : "content");
      })
      .catch((e) => {
        if (!live) return;
        setPorblem(problemFor(e));
        setStatus("error");
      });
    return () => {
      live = false;
    };
  }, [attempt]);

  return { status, customer, problem, retry: () => setAttempt(attempt + 1) };
}
