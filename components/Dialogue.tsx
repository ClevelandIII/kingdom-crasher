type Props = {
    dialogue: string[];
    updateDialogue: (input: string) => void;
};

export default function Dialogue({ dialogue, updateDialogue }: Props) {
    return (
        <section
            className="border-3 w-full h-full text-center p-3 scroll-smooth"
            id="overflow"
        >
            <ul className="grid grid-cols-1 gap-3 ">
                {dialogue.map((item, index: number) =>
                    index == 0 ? (
                        <li className="last:text-blue-300">{item}</li>
                    ) : (
                        <>
                            <div className="border-2 w-2/5 m-auto"></div>
                            <li className="last:text-blue-300">{item}</li>
                        </>
                    ),
                )}
            </ul>
        </section>
    );
}
