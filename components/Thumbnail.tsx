import Link from "next/link"
import Image from "next/image"
import { StripThumbnail } from "../types/striptypes"

const Thumbnail = (props: { strip: StripThumbnail }) => {
    const {num, img} = props.strip
    return (
        <Link href={`strips/${num}`} >
            <Image src={img} alt="" objectFit="cover" width="200px" height="200px" style={{borderRadius: "10px"}}/>
        </Link>
    )
}

export default Thumbnail