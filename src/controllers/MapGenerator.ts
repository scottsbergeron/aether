import { HexMap } from '../models/Map';
import { Tile, TerrainType } from '../models/Tile';

export class MapGenerator {
    private seed: number;

    constructor(hash?: string) {
        // Generate a seed from the hash, or use current time if no hash provided
        if (hash) {
            this.seed = this.hashString(hash);
        } else {
            this.seed = Date.now();
        }
    }

    /**
     * Generate a new random hexagonal map with the specified dimensions
     * @param width - Number of hexes wide (must be >= 1)
     * @param height - Number of hexes tall (must be >= 1)
     * @returns A new HexMap instance with randomly generated terrain
     */
    newRandomMap(width: number, height: number): HexMap {
        if (width < 1 || height < 1) {
            throw new Error('Width and height must be >= 1');
        }

        const map = new HexMap();
        const terrainTypes = Object.values(TerrainType);

        // Generate tiles in a rectangular pattern using offset coordinates
        // For a rectangular hex grid with odd-r offset (odd rows shifted right),
        // convert offset coordinates to axial coordinates
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                // Convert offset coordinates to axial coordinates
                // For odd-r offset: axial_q = col - floor(row / 2)
                const axialQ = col - Math.floor(row / 2);
                const axialR = row;
                
                // Get random terrain type
                const randomIndex = this.randomInt(0, terrainTypes.length - 1);
                const terrainType = terrainTypes[randomIndex];
                
                // Create and place the tile using axial coordinates
                const tile = new Tile(terrainType);
                map.setTile(axialQ, axialR, tile);
            }
        }

        return map;
    }

    /**
     * Generate a hash from a string to use as a seed
     * @param str - The string to hash
     * @returns A numeric hash value
     */
    private hashString(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    /**
     * Generate a random integer between min and max (inclusive) using the seed
     * @param min - Minimum value (inclusive)
     * @param max - Maximum value (inclusive)
     * @returns A random integer
     */
    private randomInt(min: number, max: number): number {
        // Simple seeded random number generator (Linear Congruential Generator)
        this.seed = (this.seed * 1664525 + 1013904223) % Math.pow(2, 32);
        const random = Math.abs(this.seed) / Math.pow(2, 32);
        return Math.floor(random * (max - min + 1)) + min;
    }
}

