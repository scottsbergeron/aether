import Phaser from 'phaser';
import { BattleController } from './controllers/BattleController';
import { BattleView } from './views/BattleView';

// Create a random battle
const battleController = BattleController.newRandomBattle(8, 6);
const battleView = new BattleView(battleController);

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#0f3460',
    scene: {
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function create(this: Phaser.Scene) {
    // Render the battle view
    battleView.render(this);
}

function update(this: Phaser.Scene, time: number, delta: number) {
    // Update the battle view each frame
    battleView.update(this, time, delta);
}

