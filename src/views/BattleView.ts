import Phaser from 'phaser';
import { BattleController } from '../controllers/BattleController';
import { HexMapView } from './HexMapView';
import { Renderable } from '../Renderable';

export class BattleView implements Renderable {
    private battleController: BattleController;
    private hexMapView: HexMapView | null = null;

    constructor(battleController: BattleController) {
        this.battleController = battleController;
    }

    render(scene: Phaser.Scene): void {
        const battleState = this.battleController.getState();
        this.hexMapView = new HexMapView(battleState.map, 30, 400, 300);
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

