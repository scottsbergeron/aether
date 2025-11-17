import Phaser from 'phaser';
import { BattleState } from '../models/BattleState';
import { HexMapView } from './HexMapView';
import { Renderable } from './Renderable';

export class BattleView implements Renderable {
    private battleState: BattleState;
    private hexMapView: HexMapView | null = null;

    constructor(battleState: BattleState) {
        this.battleState = battleState;
    }

    render(scene: Phaser.Scene): void {
        this.hexMapView = new HexMapView(this.battleState.map, 30, 400, 300);
        this.hexMapView.render(scene);
    }

    update(scene: Phaser.Scene, time: number, delta: number): void {
        // Update logic can be added here if needed
    }

    destroy(scene: Phaser.Scene): void {
        if (this.hexMapView) {
            this.hexMapView.destroy(scene);
            this.hexMapView = null;
        }
    }
}

