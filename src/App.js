import { Random, Console } from '@woowacourse/mission-utils';
import Vehicle from './Vehicle.js';
import MESSAGES from './constants/Messages.js';
import { isValidInputRound, isValidInputVehicles } from './utils/validation.js';

class App {
  constructor() {
    this.vehicles = [];
    this.round = 0;
  }

  async setVehicles() {
    const inputVehicles = await Console.readLineAsync(
      MESSAGES.REQUEST.INPUT_VEHICLES,
    );

    isValidInputVehicles(inputVehicles);

    inputVehicles
      .split(',')
      .forEach(name => this.vehicles.push(new Vehicle(name)));
  }

  async setRound() {
    const inputRound = await Console.readLineAsync(
      MESSAGES.REQUEST.INPUT_ROUND,
    );

    isValidInputRound(inputRound);

    this.round = +inputRound;
  }

  processRound() {
    let roundCount = 0;

    Console.print(`\n${MESSAGES.GAME_RESULT}`);

    while (this.round > roundCount) {
      this.vehicles.forEach(item => {
        const randomNumber = Random.pickNumberInRange(0, 9);
        const conditionMovement = randomNumber >= 4;

        if (conditionMovement) item.move();
        item.printPosition();
      });

      Console.print('');
      roundCount += 1;
    }
  }

  async play() {
    await this.setVehicles();
    await this.setRound();
    this.processRound();
  }
}

export default App;
