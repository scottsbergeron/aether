import Phaser from 'phaser';
import { BattleState } from '../models/BattleState';
import { HexMapView } from './HexMapView';
import { Renderable } from './Renderable';

export class BattleView implements Renderable<BattleState> {
    private hexMapView: HexMapView | null = null;

    constructor() {
        // No state stored - it's passed in on each render/update call
    }

    render(scene: Phaser.Scene, state: BattleState): void {
        if (!this.hexMapView) {
            this.hexMapView = new HexMapView(30, 400, 300);
        }
        this.hexMapView.render(scene, state.map);
    }

    update(scene: Phaser.Scene, state: BattleState, time: number, delta: number): void {
        // Update logic can be added here if needed
    }

    destroy(scene: Phaser.Scene): void {
        if (this.hexMapView) {
            this.hexMapView.destroy(scene);
            this.hexMapView = null;
        }
    }
}

