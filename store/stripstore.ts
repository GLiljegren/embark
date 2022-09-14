import { action, makeObservable, observable, computed } from "mobx"
import { StripThumbnail } from "../types/striptypes"
  
class StripStoreImplementation {
    strips: StripThumbnail[] = []
    latestStripNumber: number = 0
    sortByLatest: boolean = true

    constructor() {
        makeObservable(this, {
            strips: observable,
            latestStripNumber: observable, 
            sortByLatest: observable,
            addStrips: action,
            removeStrips: action,
            setTotalNumberOfStrips: action,
            toggleSorting: action,
            stripCount: computed,
        })
    }

    addStrips(strips: StripThumbnail[]) {
        strips.forEach((strip) => {
            this.strips.push(strip)
        })
    }

    removeStrips() {
        this.strips = []
    }

    setTotalNumberOfStrips(num: number) {
        this.latestStripNumber = num
    }

    toggleSorting() {
        this.sortByLatest = !this.sortByLatest
    }

    get stripCount() {
        return this.strips.length
    }
}

export const StripStore = new StripStoreImplementation()