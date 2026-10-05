export function problemFor(e: unknown): string{
    if(e instanceof Error && e.message === "timeout")
        return "The server took too long. Try again.";
    if(e instanceof TypeError)
        return "No connection. Check your Wi-Fi and try again.";
    if(e instanceof Error && e.message === "401")
        return "Sign in again.";
    if(e instanceof Error && e.message === "403")
        return "Only the admin can do that.";
    if(e instanceof Error && e.message === "404")
        return "Something went wrong";
    return "Something went wrong. Please try again";
}

export type Status = "loading" | "empty" | "error" | "content";