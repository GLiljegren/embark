import Link from "next/link"

export default function Custom404() {

    return <>
        <h1 className="title">This is not the strip you are looking for...</h1>
        <Link href={`/strips/${Math.floor(Math.random() * 1000)}`}>
            <button className="styled-button">Try a random one</button>
        </Link>
    </>

  }
