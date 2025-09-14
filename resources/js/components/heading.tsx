type HeadingProps = {
    title: string;
    description: string;
};

export default function Heading({ title, description }: HeadingProps) {
    return (
        <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}
