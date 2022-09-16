import axios from "axios";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect, useState } from "react";
import { GameBanner } from "./GameBanner";

interface Game{
    id: string,
    title: string,
    bannerUrl: string,
    _count:{
      ads: number;
    }
  }


export function GameBarSlider(){
    const [sliderRef] = useKeenSlider({
      loop: true,
      slides: {
        perView: 6,
        spacing: 15,
      },
    })

    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
      axios('http://localhost:3333/games')
      .then(response =>{
        setGames(response.data)
      })
    }, [])

    return(
        <div ref={sliderRef} className="keen-slider mt-8">
            {games.map(game => {
            return (
                <div className="keen-slider__slide">
                    <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads}/>
                </div>
            )})}
        </div>
    )
}