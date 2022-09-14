import React from "react"
import Link from "next/link"
import { StripStore } from "../store/stripstore"

const StepButttons = (props: { currentId: number }) => {
    const {currentId} = props
    const nextId = StripStore.sortByLatest ? currentId - 1 : currentId + 1
    const prevId = StripStore.sortByLatest ? currentId + 1 : currentId - 1

    return (
        <div className="step-buttons">
            <Link  href={`/strips/${prevId}`}>
                <button className="styled-button">PREVIOUS</button>
            </Link>
            <Link className="card" href={`/strips/${nextId}`}>
                <button className="styled-button">NEXT</button>
            </Link>
        </div>
    )
}

export default StepButttons