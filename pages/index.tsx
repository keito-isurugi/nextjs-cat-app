import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import { Loader } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

type SearchCatImage = {
    id: number
    url: string
    width: number
    height: number
}

type IndexPageProps = {
  initialCatImageUrl: string
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search")
  const result = await res.json();
  return result[0]
}

const Home: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true)
    const catImage = await fetchCatImage()
    setCatImageUrl(catImage.url)
    setIsLoading(false)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <h1>Cat Photo App</h1>
      {isLoading 
      ? <Loader active sise="huge"/>
      : <p>{catImageUrl}</p>
    }
     {/* <img src={catImageUrl} alt="" width={500} height="auto" /> */}
      <button onClick={() => handleClick()} style={{ marginTop: 18 }}>cat of the day</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage()
  return {
    props: {
      initialCatImageUrl: catImage.url
    }
  }
}

export default Home
