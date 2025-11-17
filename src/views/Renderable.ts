import Phaser from 'phaser';

/**
 * Interface for objects that can be rendered in Phaser
 * @template T - The type of state data required for rendering
 */
export interface Renderable<T> {
    /**
     * Render this object to the Phaser scene
     * @param scene - The Phaser scene to render to
     * @param state - The state data needed for rendering
     */
    render(scene: Phaser.Scene, state: T): void;

    /**
     * Update the render (called each frame)
     * @param scene - The Phaser scene
     * @param state - The state data needed for updating
     * @param time - Current time
     * @param delta - Time since last frame
     */
    update?(scene: Phaser.Scene, state: T, time: number, delta: number): void;

    /**
     * Clean up any Phaser objects created during rendering
     * @param scene - The Phaser scene
     */
    destroy?(scene: Phaser.Scene): void;
}

