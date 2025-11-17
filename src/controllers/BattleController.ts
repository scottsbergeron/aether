import Phaser from 'phaser';
import { BattleState } from '../models/BattleState';
import { MapGenerator } from './MapGenerator';
import { BattleView } from '../views/BattleView';
import { SceneControllable } from './SceneControllable';

export class BattleController implements SceneControllable {
    private battleState: BattleState;
    private battleView: BattleView;

    constructor(battleState: BattleState) {
        this.battleState = battleState;
        this.battleView = new BattleView(battleState);
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

    /**
     * Get the battle view
     * @returns The BattleView instance
     */
    getView(): BattleView {
        return this.battleView;
    }

    /**
     * Initialize and render the scene
     * @param scene - The Phaser scene
     */
    startScene(scene: Phaser.Scene): void {
        this.battleView.render(scene);
    }

    /**
     * Update the scene each frame
     * @param scene - The Phaser scene
     * @param time - Current time
     * @param delta - Time since last frame
     */
    updateScene(scene: Phaser.Scene, time: number, delta: number): void {
        this.battleView.update(scene, time, delta);
    }
}

