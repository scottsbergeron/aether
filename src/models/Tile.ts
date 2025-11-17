export enum TerrainType {
    Water = 'water',
    Plains = 'plains',
    Mountain = 'mountain'
}

export class Tile {
    terrainType: TerrainType;

    constructor(terrainType: TerrainType = TerrainType.Plains) {
        this.terrainType = terrainType;
    }
}

