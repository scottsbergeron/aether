import { Tile } from './Tile';

export class HexMap {
    private tiles: Map<string, Tile> = new Map();

    /**
     * Get a tile at the specified hexagonal coordinates (q, r)
     * @param q - Column coordinate
     * @param r - Row coordinate
     * @returns The tile at the coordinates, or undefined if not found
     */
    getTile(q: number, r: number): Tile | undefined {
        const key = this.getKey(q, r);
        return this.tiles.get(key);
    }

    /**
     * Set a tile at the specified hexagonal coordinates (q, r)
     * @param q - Column coordinate
     * @param r - Row coordinate
     * @param tile - The tile to place
     */
    setTile(q: number, r: number, tile: Tile): void {
        const key = this.getKey(q, r);
        this.tiles.set(key, tile);
    }

    /**
     * Check if a tile exists at the specified coordinates
     * @param q - Column coordinate
     * @param r - Row coordinate
     * @returns True if a tile exists at the coordinates
     */
    hasTile(q: number, r: number): boolean {
        const key = this.getKey(q, r);
        return this.tiles.has(key);
    }

    /**
     * Get all tiles in the map
     * @returns An array of [q, r, tile] tuples
     */
    getAllTiles(): Array<[number, number, Tile]> {
        const result: Array<[number, number, Tile]> = [];
        this.tiles.forEach((tile, key) => {
            const [q, r] = this.parseKey(key);
            result.push([q, r, tile]);
        });
        return result;
    }

    /**
     * Generate a unique key for hexagonal coordinates
     * @param q - Column coordinate
     * @param r - Row coordinate
     * @returns A string key
     */
    private getKey(q: number, r: number): string {
        return `${q},${r}`;
    }

    /**
     * Parse a key back into coordinates
     * @param key - The string key
     * @returns [q, r] coordinates
     */
    private parseKey(key: string): [number, number] {
        const [q, r] = key.split(',').map(Number);
        return [q, r];
    }
}

