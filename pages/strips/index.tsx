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
    const [isLoadingImages, setIsLoadingImages] = useState(false)
    useEffect(() => {
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
        const req = await fetch(`/api/strips/${stripStore.stripCount}?sortByLatest=${stripStore.sortByLatest}`)
        const result = await req.json()
        stripStore.addStrips(result)
        setIsLoadingImages(false)
    }

    const toggleSortByLatest = () => {
        stripStore.toggleSorting()
        stripStore.removeStrips()
        getStrips()
    }

    return <>
        <h3>{stripStore.sortByLatest ? 'Latest Strips' : 'First Strips'}</h3>
        {!isLoadingImages ? <button onClick={toggleSortByLatest} className="styled-button">TOGGLE LATEST / FIRST STRIPS</button>
        : null }
        <ThumbnailList strips={stripStore.strips} />
        {isLoadingImages ? <MoonLoader color="white"/> 
        : <>
        <button onClick={getStrips} className="styled-button">LOAD MORE STRIPS</button>
        </>
        }
    </>
})

export default StripList