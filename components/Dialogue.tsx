type Props = {
    dialogue: string[];
    updateDialogue: (input: string) => void;
};

export default function Dialogue({ dialogue, updateDialogue }: Props) {
    return (
        <section className="border-3 w-full text-center p-3 row-span-34" id="overflow">
            <ul>
                {dialogue.map((item) => (
                    <li>{item}</li>
                ))}
            </ul>
        </section>
    );
}
