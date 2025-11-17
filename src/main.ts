import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#0f3460',
    scene: {
        create: create
    }
};

const game = new Phaser.Game(config);

function create(this: Phaser.Scene) {
    // Add title text
    this.add.text(400, 200, 'AETHER', {
        fontSize: '64px',
        fontFamily: 'Arial',
        color: '#e94560',
        stroke: '#16213e',
        strokeThickness: 4
    }).setOrigin(0.5);

    // Add subtitle text
    this.add.text(400, 280, 'A Fantasy Game', {
        fontSize: '24px',
        fontFamily: 'Arial',
        color: '#ffffff',
        fontStyle: 'italic'
    }).setOrigin(0.5);

    // Add some decorative elements
    this.add.circle(200, 150, 30, 0xe94560, 0.5);
    this.add.circle(600, 150, 30, 0xe94560, 0.5);
    this.add.circle(200, 450, 30, 0xe94560, 0.5);
    this.add.circle(600, 450, 30, 0xe94560, 0.5);

    // Add instruction text
    this.add.text(400, 500, 'Game Starting...', {
        fontSize: '18px',
        fontFamily: 'Arial',
        color: '#a0a0a0'
    }).setOrigin(0.5);
}

