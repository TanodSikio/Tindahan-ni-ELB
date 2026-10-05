import { useEffect, useState } from "react";
import { fetchProfile, Profile } from "@/data/customers";

export function useProfile(){
    const [profile, setProfile] = useState<Profile | null >(null);
    useEffect(() => {
        let live= true;
        fetchProfile().then((row) => live && setProfile(row)).catch(() => {});
        return() => { live = false; };
    }, []);
    return profile;
}