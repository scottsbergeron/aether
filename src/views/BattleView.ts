import { BattleController } from '../controllers/BattleController';

export class BattleView {
    private battleController: BattleController;

    constructor(battleController: BattleController) {
        this.battleController = battleController;
    }
}

