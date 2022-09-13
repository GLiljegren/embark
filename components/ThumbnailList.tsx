import { StripThumbnail } from "../types/striptypes"
import Thumbnail from "./Thumbnail"

const ThumbnailList = (props: { strips: StripThumbnail[] }) => {
    const {strips} = props

    return (
        <ul className="card-grid">
        {strips.map((strip: StripThumbnail) => <li key={strip.num} className="card">
                <Thumbnail strip={strip}/>
          </li>
        )}
        </ul>
    )
}

export default ThumbnailList