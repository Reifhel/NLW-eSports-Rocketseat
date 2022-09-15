import "./styles/main.css";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog"; 

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";

import logoImg from "./assets/logo-nlw-esports.svg";
import { GameController } from "phosphor-react";
import { Input } from "./form/Input";

interface Game{
  id: string,
  title: string,
  bannerUrl: string,
  _count:{
    ads: number;
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data =>{
      setGames(data)
    })
  }, [])

  return (

  <div className="max-w-[1334px] mx-auto flex flex-col items-center my-20">
    <img src={logoImg} alt="Logo" />

    <h1 className="text-6xl text-white font-black mt-20"> 
    Seu <span className="bg-nlw-gradiant bg-clip-text text-transparent">duo</span> está aqui. 
    </h1>

    
    <div className="grid grid-cols-7 gap-6 mt-16">

      {games.map(game => {
        return <GameBanner 
          key={game.id}
          bannerUrl={game.bannerUrl} 
          title={game.title} 
          adsCount={game._count.ads}
          />
      })}

    </div>

    <Dialog.Root>
      <CreateAdBanner />

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed">

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
            <Dialog.Title className="text-3xl text-white font-black"> Publique um anúncio </Dialog.Title>

              <form className="mt-8 flex flex-col gap-4">

                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">Qual o game?</label>
                  <Input id="game" placeholder="selecione o game que deseja jogar" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name"> Seu nome (ou nickname)</label>
                  <Input id="name" placeholder="Como te chamam dentro do game?"/>
                </div>

                <div className="grid grid-cols-2 gap-6">

                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <Input id="yearsPlaying" type="number" placeholder="tudo bem ser ZERO" />
                  </div>

                  <div className="flex flex-col gap-2"> 
                    <label htmlFor="discord">Qual seu discord?</label>
                    <Input id="discord" type="text" placeholder="Usuário#0000" />
                  </div>

                </div>

                <div className="flex gap-6">

                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma Jogar</label>

                    <div className="grid grid-cols-4 gap-1">
                      <button 
                      title="Domingo"
                      className="w-8 h-8 rounded-sm bg-zinc-900"
                      >
                        D
                      </button>
                      <button 
                        title="Segunda"
                        className="w-8 h-8 rounded-sm bg-zinc-900"
                      >
                        S
                      </button>
                      <button 
                        title="Terça"
                        className="w-8 h-8 rounded-sm bg-zinc-900"
                      >
                        T
                      </button>
                      <button 
                        title="Quarta"
                        className="w-8 h-8 rounded-sm bg-zinc-900"
                      >
                        Q
                      </button>
                      <button 
                        title="Quinta"
                        className="w-8 h-8 rounded-sm bg-zinc-900"
                      >
                        Q
                      </button>
                      <button 
                        title="Sexta"
                        className="w-8 h-8 rounded-sm bg-zinc-900"
                      >
                        S
                      </button>
                      <button 
                          title="Sabado"
                          className="w-8 h-8 rounded-sm bg-zinc-900"
                      >
                        S
                      </button>
                    </div>

                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual o horario do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="time" id="hourStart" placeholder="De"/>
                      <Input type="time" id="hourEnd" placeholder="Até" />
                    </div>
                  </div>

                </div>

                <div className="mt-2 flex gap-2 text-sm">
                  <Input type="checkbox" id="" /> Costumo me conectar ao chat de voz
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                  <button 
                    type="submit"
                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                  > 
                  <GameController size={24}/>
                  Encontrar duo
                  </button>
                </footer>

              </form>

          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
    



  </div>)  
}

export default App
