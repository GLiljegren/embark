import type { NextApiRequest, NextApiResponse } from 'next'
import { StripThumbnail } from "../../../types/striptypes"

const fetchStrips = async (firstNumber: number, lastNumber: number, sortByLatest: boolean) => {
  let result: StripThumbnail[] = []
  for (
    let index = firstNumber; 
    sortByLatest ? index > lastNumber : index < lastNumber; 
    sortByLatest ? index-- : index++
    ) {
      try {
          const request = await fetch(`https://xkcd.com/${index}/info.0.json`)
          const data = await request.json()
          result.push({num: index, img: data.img})
      } catch (error) {
          console.error('Failed to fetch Comic strips', error)
      }
  }
  return result
}

const fetchLatestStrip = async () => {
  try {
      const request = await fetch(`https://xkcd.com/info.0.json`)
      const data = await request.json()
      return data.num
  } catch (error) {
      console.error('Failed to fetch latest comic strips', error)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StripThumbnail[]>
) {
  const { stripId, sortByLatest } = req.query
  const parsedId = stripId ? 
    (typeof stripId === 'string') ? parseInt(stripId) 
      : parseInt(stripId?.join())
    : 0
  const parsedSort = (sortByLatest === 'true') ? true : false
  let strips: StripThumbnail[]
  if(parsedSort) {
    const latestStripNumber = await fetchLatestStrip()
    strips = await fetchStrips(latestStripNumber-parsedId, latestStripNumber-parsedId-20, parsedSort)
  } else {
    strips = await fetchStrips(parsedId+1, parsedId+20, parsedSort)
  }
  res.status(200).json(strips)
}
