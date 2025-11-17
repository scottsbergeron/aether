import Phaser from 'phaser';

/**
 * Interface for controllers that manage Phaser scenes
 */
export interface SceneControllable {
    /**
     * Initialize and render the scene
     * @param scene - The Phaser scene
     */
    startScene(scene: Phaser.Scene): void;

    /**
     * Update the scene each frame
     * @param scene - The Phaser scene
     * @param time - Current time
     * @param delta - Time since last frame
     */
    updateScene(scene: Phaser.Scene, time: number, delta: number): void;
}

