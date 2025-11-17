import Phaser from 'phaser';

/**
 * Interface for objects that can be rendered in Phaser
 */
export interface Renderable {
    /**
     * Render this object to the Phaser scene
     * @param scene - The Phaser scene to render to
     */
    render(scene: Phaser.Scene): void;

    /**
     * Update the render (called each frame)
     * @param scene - The Phaser scene
     * @param time - Current time
     * @param delta - Time since last frame
     */
    update?(scene: Phaser.Scene, time: number, delta: number): void;

    /**
     * Clean up any Phaser objects created during rendering
     * @param scene - The Phaser scene
     */
    destroy?(scene: Phaser.Scene): void;
}

