import { action, makeObservable, observable, computed } from "mobx"
import { StripThumbnail } from "../types/striptypes"
  
class StripStoreImplementation {
    strips: StripThumbnail[] = []


    constructor() {
        makeObservable(this, {
            strips: observable,
            addStrips: action,
            removeStrip: action,
            stripCount: computed
        })
    }

    addStrips(strips: StripThumbnail[]) {
        strips.forEach((strip) => {
            this.strips.push(strip)
        })
    }

    removeStrip(num: number) {
        this.strips = this.strips.filter((strip) => strip.num !== num)
    }

    get stripCount() {
        return this.strips.length
    }
}

export const StripStore = new StripStoreImplementation()