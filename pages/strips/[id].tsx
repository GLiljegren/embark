import Head from "next/head"
import Image from "next/image"
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useState } from "react"
import StepButtons from "../../components/StepButtons"

export default function Strip({strip}: InferGetServerSidePropsType<GetServerSideProps> ) {
    const [ratio, setRatio] = useState(16/9)
    return <>
        <Head>
            <title>{strip.safe_title}</title>
        </Head>
        <h1 className="title">{strip.title}</h1>
        <div className="image-container">
            <Image 
            src={strip.img} 
            alt={strip.alt} 
            title={strip.transcript} 
            layout="responsive"
            width={200}
            height={200 / ratio}
            onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                setRatio(naturalWidth / naturalHeight)
            }/>
        </div>
        <StepButtons currentId={strip.num}/>
    </> 
}

export const getServerSideProps: GetServerSideProps = async({ params }) => {
    // Fetch the latest strip
    const maxNumRequest = await fetch(`https://xkcd.com/info.0.json`)
    const maxNumData = await maxNumRequest.json()
    const maxNum = maxNumData?.num
    const currentNum = params?.id
    const parsedNum = currentNum ? 
    (typeof currentNum === 'string') ? parseInt(currentNum) 
      : parseInt(currentNum?.join()) : 0
    // Validate if id of visited url corresponds to a comic
    if(!parsedNum || parsedNum > maxNum || parsedNum < 1) {
        return {
            notFound: true,
          }
    }

    const request = await fetch(`https://xkcd.com/${params?.id}/info.0.json`)
    const data = await request.json()

    return {
        props: { strip: data}
    }
}
