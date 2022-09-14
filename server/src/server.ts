import express, { response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';

// importando funções uteis
import { convertHoursStringToMinutes } from "./utils/convert-hours-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-string-to-hout";

// criando o app e o db
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors())

// Listagem de games com contagem de anúncio
app.get("/games", async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count:{
                select: {
                    ads: true
                }
            }
        }
    })

    return response.json(games);
});

// Criação de novos anúncios
app.post("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id;
    const body = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHoursStringToMinutes(body.hourStart),  
            hourEnd: convertHoursStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel, 
        }
    })

    return response.json(ad);
});

// Listagem de anúncios por game
app.get('/games/:id/ads', async (request, response) => {

    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            yearsPlaying: true,
            weekDays: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true

        },
        where:{
            gameId
        },
        orderBy:{
            createdAt: "desc",
        },
        
    })

    return response.json(ads.map(ad => {
        return{

            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    }))
});

// Buscar discord pelo ID do anúncio
app.get('/ads/:id/discord', async (request, response) => {

    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true,
        },
        where: {
            id: adId
        }
    })

    return response.json({
        discord: ad.discord
    })
});

app.listen(3333);
