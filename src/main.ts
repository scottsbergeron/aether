import Phaser from 'phaser';
import { BattleController } from './controllers/BattleController';

// Create a random battle
const battleController = BattleController.newRandomBattle(8, 6);

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
    // Start the battle scene through the controller
    battleController.startScene(this);
}

function update(this: Phaser.Scene, time: number, delta: number) {
    // Update the battle scene each frame
    battleController.updateScene(this, time, delta);
}

