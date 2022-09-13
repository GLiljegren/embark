import { NextPage } from "next"
import { StripStore } from '../../store/stripstore'
import { observer } from 'mobx-react'
import { useEffect, useState } from "react"
import MoonLoader from "react-spinners/MoonLoader";
import ThumbnailList from "../../components/ThumbnailList"

interface StripListProps {
    stripStore: typeof StripStore
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
        <ThumbnailList strips={stripStore.strips} />
        {isLoadingImages ? <MoonLoader color="white"/> 
        : <button onClick={getStrips} className="styled-button">LOAD MORE STRIPS</button>}
    </>
})

export default StripList