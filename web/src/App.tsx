import "./styles/main.css";

import * as Dialog from "@radix-ui/react-dialog"; 

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";

import logoImg from "./assets/logo-nlw-esports.svg";
import { GameController } from "phosphor-react";
import { Input } from "./form/Input";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";
import { GameBarSlider } from "./components/GameBarSlider";

interface Game{
  id: string,
  title: string,
  bannerUrl: string,
  _count:{
    ads: number;
  }
}

function App() {

  return (

  <div className="max-w-[1334px] mx-auto flex flex-col items-center my-20">
    <img src={logoImg} alt="Logo" />

    <h1 className="text-6xl text-white font-black mt-20"> 
    Seu <span className="bg-nlw-gradiant bg-clip-text text-transparent">duo</span> está aqui. 
    </h1>

      <GameBarSlider />


    <Dialog.Root>
      <CreateAdBanner />
      <CreateAdModal />
      
    </Dialog.Root>
    



  </div>)  
}

export default App
