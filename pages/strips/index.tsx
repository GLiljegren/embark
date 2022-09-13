import { NextPage } from "next"
import { StripStore } from '../../store/stripstore'
import { observer } from 'mobx-react'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import MoonLoader from "react-spinners/MoonLoader";

interface StripListProps {
    stripStore: typeof StripStore
}

interface StripThumbnail {
    id: number
    img: string
}

const StripList: NextPage<StripListProps> = observer(({stripStore}) => {
    const [numberOfStrips, setNumberOfStrips] = useState(0)
    const [isLoadingImages, setIsLoadingImages] = useState(false)

    useEffect(() => {
        setNumberOfStrips(stripStore.stripCount)
        if(stripStore.stripCount === 0) {
            try {
                getStrips()

            } catch {
                console.error('Error fetching strips from XKCD')
            }
        }
    }, [])

    const getStrips = async () => {
        setIsLoadingImages(true)
        const req = await fetch(`/api/strips/${numberOfStrips+1}`)
        const result = await req.json()
        stripStore.addStrips(result)
        setNumberOfStrips(stripStore.stripCount)
        setIsLoadingImages(false)
    }

    return <>
        <h1>Strips</h1>
        <ul className="card-grid">
        {stripStore.strips.map((strip: StripThumbnail) => 
          <li key={strip.id} className="card">
            <Link href={`strips/${strip.id}`} >
                <Image src={strip.img} alt="" objectFit="cover" width="200px" height="200px" style={{borderRadius: "10px"}}/>
            </Link>
          </li>
        )}
        </ul>
        {isLoadingImages ? <MoonLoader color="white"/> : <button onClick={getStrips} className="styled-button">Load more strips</button>}
    </>
})

export default StripList