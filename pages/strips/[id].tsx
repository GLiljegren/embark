import Head from "next/head"
import Image from "next/image"
import { GetStaticPaths, GetStaticProps, GetServerSideProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next'
import { useState } from "react"
import StepButtons from "../../components/StepButtons"
export default function Strip({strip}: InferGetStaticPropsType<GetStaticProps> ) {
    const [ratio, setRatio] = useState(16/9) // default to 16:9

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

export const getStaticProps: GetStaticProps = async({ params }) => {
    
    const request = await fetch(`https://xkcd.com/${params?.id}/info.0.json`)
    const data = await request.json()

    return {
        props: { strip: data}
    }
}

export const getStaticPaths: GetStaticPaths = async() => {

    const request = await fetch(`https://xkcd.com/info.0.json`)
    const data = await request.json()
    const totalNumberOfStrips = data.num
    const stripIndices = [...Array(totalNumberOfStrips).keys()]
    stripIndices.splice(403)
    return {
        paths: stripIndices.map(stripIndex => `/strips/${stripIndex+1}`),
        fallback: false,
      }}
