import type { Player } from "../objects/Player";
import location from "../objects/Location";
import React from "react";
import type { Quest } from "../objects/Player";

type Props = {
    quest: Quest;
};

export default function QuestUI({ quest }: Props) {
    // let loco = location(player, updateLocation);
    // React.useEffect(() => {
    //     console.log("test");

    //     loco = location(player, updateLocation);
    // }, [player.location]);

    return (
        <section className="border-3 w-full h-fit text-center p-3">
            <h1 className="text-2xl font-bold">{quest.name}</h1>
            <p>{quest.description}</p>
            <p>{quest.inventory}</p>
        </section>
    );
}
