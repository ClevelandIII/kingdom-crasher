import type { Player } from "../objects/Player";
import location from "../objects/Location";
import React from "react";

type Props = {
    player: Player;
    updateLocation: (
        location:
            | "Grasslands"
            | "Rocky Mountains"
            | "Volcana"
            | "Courtyard"
            | "Rainforest",
    ) => void;
};

export default function LocationText({ player, updateLocation }: Props) {
    let loco = location(player, updateLocation);
    React.useEffect(() => {
        console.log("test");

        loco = location(player, updateLocation);
    }, [player.location]);

    return (
        <section className="border-3 w-full h-fit text-center p-3">
            <h1 className="text-2xl font-bold">{player.location}</h1>
            <p>{loco}</p>
        </section>
    );
}
