import Phaser from 'phaser';
import { Tile, TerrainType } from '../models/Tile';
import { Renderable } from '../Renderable';

export class TileView implements Renderable {
    private tile: Tile;
    private q: number;
    private r: number;
    private hexSize: number;
    private graphics: Phaser.GameObjects.Graphics | null = null;
    private x: number = 0;
    private y: number = 0;

    constructor(tile: Tile, q: number, r: number, hexSize: number = 30) {
        this.tile = tile;
        this.q = q;
        this.r = r;
        this.hexSize = hexSize;
        this.calculatePixelPosition();
    }

    render(scene: Phaser.Scene): void {
        if (this.graphics) {
            this.graphics.destroy();
        }

        this.graphics = scene.add.graphics();
        this.drawHexagon(this.graphics);
    }

    destroy(scene: Phaser.Scene): void {
        if (this.graphics) {
            this.graphics.destroy();
            this.graphics = null;
        }
    }

    /**
     * Convert axial coordinates (q, r) to pixel coordinates
     */
    private calculatePixelPosition(): void {
        const size = this.hexSize;
        this.x = size * (Math.sqrt(3) * this.q + Math.sqrt(3) / 2 * this.r);
        this.y = size * (3 / 2 * this.r);
    }

    /**
     * Draw a hexagon at the tile's position
     */
    private drawHexagon(graphics: Phaser.GameObjects.Graphics): void {
        const color = this.getTerrainColor();
        const strokeColor = 0x000000;
        const strokeWidth = 2;

        graphics.fillStyle(color, 1);
        graphics.lineStyle(strokeWidth, strokeColor, 1);

        // Draw hexagon (6 points)
        const points = this.getHexagonPoints();
        graphics.beginPath();
        graphics.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            graphics.lineTo(points[i].x, points[i].y);
        }
        graphics.closePath();
        graphics.fillPath();
        graphics.strokePath();
    }

    /**
     * Get the 6 points of a hexagon
     */
    private getHexagonPoints(): Array<{ x: number; y: number }> {
        const points: Array<{ x: number; y: number }> = [];
        const size = this.hexSize;
        
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            points.push({
                x: this.x + size * Math.cos(angle),
                y: this.y + size * Math.sin(angle)
            });
        }
        
        return points;
    }

    /**
     * Get color based on terrain type
     */
    private getTerrainColor(): number {
        switch (this.tile.terrainType) {
            case TerrainType.Water:
                return 0x4a90e2; // Blue
            case TerrainType.Plains:
                return 0x7cb342; // Green
            case TerrainType.Mountain:
                return 0x757575; // Gray
            default:
                return 0xffffff; // White
        }
    }

    /**
     * Get the pixel x coordinate
     */
    getPixelX(): number {
        return this.x;
    }

    /**
     * Get the pixel y coordinate
     */
    getPixelY(): number {
        return this.y;
    }
}

