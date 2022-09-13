import type { NextApiRequest, NextApiResponse } from 'next'
import { StripStore } from '../../../store/stripstore'
import { StripThumbnail } from "../../../types/striptypes"

const fetchStrips = async (firstNumber: number, lastNumber: number) => {
  let result: StripThumbnail[] = []
  for (let index = firstNumber; index < lastNumber; index++) {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StripThumbnail[]>
) {
  const { stripId } = req.query
  const parsedId = stripId ? 
    (typeof stripId === 'string') ? parseInt(stripId) 
      : parseInt(stripId?.join())
    : 0
  const strips = fetchStrips(parsedId, parsedId+20)
  StripStore.addStrips(await strips)
  res.status(200).json(await strips)
}
