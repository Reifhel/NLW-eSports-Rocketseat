// 18:00 -> 1080

export function convertHoursStringToMinutes(hourString: string){
    const [horas, minutos] = hourString.split(':').map(Number);
    const minutesAmount = (horas * 60 )+ minutos;

    return minutesAmount;
}