export default function InputError({ message }: { message?: string }) {
    return message ? <p className="text-sm text-destructive-foreground">{message}</p> : null;
}
