import Link from "next/link"
import Image from "next/image"

export default function Custom404() {
    return <>
        <h1 className="title">This is not the strip you are looking for...</h1>
        <Image src={'https://cdn0.iconfinder.com/data/icons/famous-characters-add-on-vol-2-glyph/48/Sed-35-512.png'} alt="Ben Kenobi" width={200} height={200}/>
        <Link href={`/strips/${Math.floor(Math.random() * 1000)}`}>
            <button className="styled-button">Try a random one</button>
        </Link>
    </>

  }
