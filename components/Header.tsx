import Link from "next/link"

const Header = () => {
    return (
        <div className="header">
            <h1>
                <Link href="/strips">XKCD</Link>
            </h1>
        </div>
    )
}

export default Header