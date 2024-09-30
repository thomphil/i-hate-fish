import { Method } from "../App";

class GameRuntime {
    private running: boolean = false;
    private lastTime: number = 0;
    private deltaTime: number = 0;
    private frameDuration: number;

    // methodsStateRef, setFishErradicated, setFishCount
    constructor(
        private methodsStateRef: React.MutableRefObject<Array<Method>>,
        private setFishErradicated: (value: number | ((prevState: number) => number)) => void,
        private setFishCount: (value: number | ((prevState: number) => number)) => void,
        fps: number = 60
    ) {
        this.methodsStateRef = methodsStateRef;
        this.setFishErradicated = setFishErradicated;
        this.setFishCount = setFishCount;

        this.gameLoop = this.gameLoop.bind(this);
        this.frameDuration = 1000 / fps;
    }

    start() {
        this.running = true;
        this.lastTime = performance.now();
        requestAnimationFrame(this.gameLoop);
    }

    stop() {
        this.running = false;
    }

    private gameLoop(currentTime: number) {
        if (!this.running) return;

        this.deltaTime = currentTime - this.lastTime;

        if (this.deltaTime >= this.frameDuration) {
            this.lastTime = currentTime - (this.deltaTime % this.frameDuration); // Adjust lastTime to account for any extra time

            this.update(this.deltaTime);
        }

        requestAnimationFrame(this.gameLoop);
    }

    private calculateFishCaught = (method: Method, deltaTime: number) => {
        let fishCaught = method.count * method.efficiency * deltaTime / 1000;

        if (method.level > 0) {
            fishCaught *= method.level * 5;
        }

        // for every magnitude of 1000, multiply by 10
        const bonus = Math.floor(Math.log10(method.count) / 1);
        fishCaught *= Math.pow(10, bonus);

        return fishCaught;
    }

    private update(deltaTime: number) {
        let fishCaught = 0;

        this.methodsStateRef.current.forEach((method) => {
            fishCaught += this.calculateFishCaught(method, deltaTime)
        });

        this.setFishCount((fishCount: number) => fishCount + fishCaught);
        this.setFishErradicated((fishErradicated: number) => fishErradicated + fishCaught);
    }

    render() {
        return "<div>Yes</div>";
    }
}

export default GameRuntime;