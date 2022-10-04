class PerformanceMonitor {
    #frames;
    #frameCount;
    //delta refers to interval from frame to frame
    //max delta is greatest
    #delta;
    #deltaLow;
    #deltaCount;
    #deltaLowCount;
    constructor() {
        this.#frames = 0;
        this.#frameCount = 0;
        this.#delta = 0;
        this.#deltaLow = 1000;
        this.#deltaCount = 0;
        this.#deltaLowCount = 1000;
    }

    get fps() {
        return this.#frames;
    }

    get delta() {
        return this.#delta;
    }

    get deltaLow() {
        return this.#deltaLow;
    }

    increaseFrameCount() {
        this.#frameCount += 1;
    }
    /**
     * update deltaCount, a temporary variable to hold delta
     * @param {Number} num 
     * @returns 
     */
    updateDeltaCount(num) {
        if (!Number.isInteger(num) || num < 0) {
            return;
        }
        if (num > this.#deltaCount) {
            this.#deltaCount = num;
        }
        if (num < this.#deltaLowCount) {
            this.#deltaLowCount = num;
        }
    }
    update() {
        this.#frames = this.#frameCount;
        this.#delta = this.#deltaCount;
        this.#deltaLow = this.#deltaLowCount;
        // reset frame count and delta
        this.#frameCount = 0;
        this.#deltaCount = 0;
        this.#deltaLowCount = 1000;
    }
}
Object.freeze(PerformanceMonitor);