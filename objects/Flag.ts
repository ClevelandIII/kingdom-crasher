import type { Player } from "./Player";
import type { Quest } from "./Player";

export function flag(
    updateDialogue: (string: string) => void,
    player: Player,
    updateQuest: (input: Quest) => void,
    quest: Quest,
    updatePlayer: (input: Player) => void
): void {
    //console.log("Testing!" + " " + updateFlag);
    //updatePlayer({ ...player, flag: player.flag + updateFlag });
    //player.flag = player.flag + updateFlag;

    if (player.flag == 1 && quest.name == "None") {
        updateDialogue(
            `You reach the door of the Grasslands. It has text written on it, saying, "Collect 10 metal scrap to open". They must want you to walk around until you encounter and defeat enough Thieves to collect all their scrap!`,
        );
        updateQuest({
            name: "Scrap Quest",
            description: "Collect 10 scrap from Thieves!",
            inventory: 0,
        });
    }

    if (player.flag == 1 && quest.inventory >= 10) {
        console.log("Second stage unlocked!");
        
        updatePlayer({ ...player, flag: (player.flag += 1) });
        updateQuest({
            name: "None",
            description: "None",
            inventory: 0,
        });
        updateDialogue("You collected all 10 pieces of scrap! Now, you can proceed to the next area!")
    }
}
