import type { Player } from "./Player";

const locations = {
    Grasslands:
        "Where you live. Home of the common people, all angry at the King.",
    Rainforest: "A never ending tsunami of water. Many fish folk live here.",
    RockyMountains:
        "Rough and dry terrain that proves difficult for most life. Tech people excel here.",
    Volcana:
        "Hot and harsh terrain. Inhospitable for most life forms, except for those guarding the King.",
    Courtyard:
        "The kingdom. Here you will find the King, the source of all this corruption.",
};

export default function location(
    player: Player,
    updateLocation: (
        location:
            | "Grasslands"
            | "Rocky Mountains"
            | "Volcana"
            | "Courtyard"
            | "Rainforest",
    ) => void,
): string {
    let text: string = "";
    //console.log(player.positionX);

    if (player.positionX < 5) {
        updateLocation("Grasslands");
    } else if (player.positionX < 10) {
        updateLocation("Rainforest");
    } else if (player.positionX < 15) {
        updateLocation("Rocky Mountains");
    } else if (player.positionX < 20) {
        updateLocation("Volcana");
    } else {
        updateLocation("Courtyard");
    }

    switch (player.location) {
        case "Grasslands":
            text = `${locations.Grasslands}`;
            break;
        case "Rainforest":
            text = `${locations.Rainforest}`;
            break;
        case "Rocky Mountains":
            text = `${locations.RockyMountains}`;
            break;
        case "Volcana":
            text = `${locations.Volcana}`;
            break;
        case "Courtyard":
            text = `${locations.Courtyard}`;
    }

    console.log(player.location);

    return text;
}
