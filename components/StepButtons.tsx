import Link from "next/link"

const StepButttons = (props: { currentId: number }) => {
    const {currentId} = props
    return (
        <div className="step-buttons">
            <Link  href={`/strips/${currentId - 1}`}>
                <button className="styled-button">Previous</button>
            </Link>
            <Link className="card" href={`/strips/${currentId + 1}`}>
                <button className="styled-button">Next</button>
            </Link>
        </div>
    )
}

export default StepButttons