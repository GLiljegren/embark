import { action, makeObservable, observable, computed } from "mobx"

interface StripThumbnail {
    id: number
    img: string
  }
 
  
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

    removeStrip(id: number) {
        this.strips = this.strips.filter((strip) => strip.id !== id)
    }

    get stripCount() {
        return this.strips.length
    }
}

export const StripStore = new StripStoreImplementation()