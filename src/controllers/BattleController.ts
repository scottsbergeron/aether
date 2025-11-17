import { BattleState } from '../models/BattleState';
import { MapGenerator } from './MapGenerator';

export class BattleController {
    private battleState: BattleState;

    constructor(battleState: BattleState) {
        this.battleState = battleState;
    }

    /**
     * Create a new random battle with the specified dimensions
     * @param width - Number of hexes wide (must be >= 1)
     * @param height - Number of hexes tall (must be >= 1)
     * @param hash - Optional hash for reproducible map generation
     * @returns A new BattleController instance with a randomly generated map
     */
    static newRandomBattle(width: number, height: number, hash?: string): BattleController {
        const mapGenerator = new MapGenerator(hash);
        const map = mapGenerator.newRandomMap(width, height);
        const battleState = new BattleState(map);
        return new BattleController(battleState);
    }

    /**
     * Get the battle state
     * @returns The BattleState instance
     */
    getState(): BattleState {
        return this.battleState;
    }
}

