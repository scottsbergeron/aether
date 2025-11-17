import Phaser from 'phaser';
import { Tile, TerrainType } from '../models/Tile';
import { Renderable } from './Renderable';

interface TileState {
    tile: Tile;
    q: number;
    r: number;
}

export class TileView implements Renderable<TileState> {
    private hexSize: number;
    private graphics: Phaser.GameObjects.Graphics | null = null;

    constructor(hexSize: number = 30) {
        this.hexSize = hexSize;
    }

    render(scene: Phaser.Scene, state: TileState): void {
        if (this.graphics) {
            this.graphics.destroy();
        }

        this.graphics = scene.add.graphics();
        this.drawHexagon(this.graphics, state);
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
    private calculatePixelPosition(q: number, r: number): { x: number; y: number } {
        const size = this.hexSize;
        return {
            x: size * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r),
            y: size * (3 / 2) * r
        };
    }

    /**
     * Draw a hexagon at the tile's position
     */
    private drawHexagon(graphics: Phaser.GameObjects.Graphics, state: TileState): void {
        const color = this.getTerrainColor(state.tile.terrainType);
        const strokeColor = 0x000000;
        const strokeWidth = 2;

        graphics.fillStyle(color, 1);
        graphics.lineStyle(strokeWidth, strokeColor, 1);

        const pos = this.calculatePixelPosition(state.q, state.r);
        const points = this.getHexagonPoints(pos.x, pos.y);
        
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
    private getHexagonPoints(centerX: number, centerY: number): Array<{ x: number; y: number }> {
        const points: Array<{ x: number; y: number }> = [];
        const size = this.hexSize;
        
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            points.push({
                x: centerX + size * Math.cos(angle),
                y: centerY + size * Math.sin(angle)
            });
        }
        
        return points;
    }

    /**
     * Get color based on terrain type
     */
    private getTerrainColor(terrainType: TerrainType): number {
        switch (terrainType) {
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
}

