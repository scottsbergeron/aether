import Phaser from 'phaser';
import { HexMap } from '../models/HexMap';
import { TerrainType } from '../models/Tile';
import { Renderable } from './Renderable';

export class HexMapView implements Renderable {
    private hexMap: HexMap;
    private hexSize: number;
    private offsetX: number;
    private offsetY: number;
    private graphicsObjects: Phaser.GameObjects.Graphics[] = [];

    constructor(hexMap: HexMap, hexSize: number = 30, offsetX: number = 400, offsetY: number = 300) {
        this.hexMap = hexMap;
        this.hexSize = hexSize;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    render(scene: Phaser.Scene): void {
        // Clear existing graphics
        this.destroy(scene);

        // Get all tiles and render them
        const tiles = this.hexMap.getAllTiles();
        tiles.forEach(([q, r, tile]) => {
            this.renderTile(scene, q, r, tile.terrainType);
        });
    }

    destroy(scene: Phaser.Scene): void {
        this.graphicsObjects.forEach(graphics => graphics.destroy());
        this.graphicsObjects = [];
    }

    /**
     * Render a single tile at the given coordinates
     */
    private renderTile(scene: Phaser.Scene, q: number, r: number, terrainType: TerrainType): void {
        const graphics = scene.add.graphics();
        this.graphicsObjects.push(graphics);

        // Convert axial coordinates to pixel coordinates (pointy-top hexagons)
        const x = this.hexSize * Math.sqrt(3) * (q + r / 2) + this.offsetX;
        const y = this.hexSize * (3 / 2) * r + this.offsetY;

        const color = this.getTerrainColor(terrainType);
        const strokeColor = 0x000000;
        const strokeWidth = 2;

        graphics.fillStyle(color, 1);
        graphics.lineStyle(strokeWidth, strokeColor, 1);

        const points = this.getHexagonPoints(x, y, this.hexSize);
        
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
     * Get the 6 points of a hexagon at a specific position (flat-top orientation)
     */
    private getHexagonPoints(centerX: number, centerY: number, size: number): Array<{ x: number; y: number }> {
        const points: Array<{ x: number; y: number }> = [];
        // Rotate by 30 degrees (π/6) to get flat-top hexagons instead of pointy-top
        const rotationOffset = Math.PI / 6;
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i + rotationOffset;
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

