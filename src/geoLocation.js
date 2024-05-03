export default async function getIp() {
    try{
        const response = await fetch('https://api.bigdatacloud.net/data/client-ip');
        //console.log(response)
        const data = await response.json();
        //console.log(data);
        return data.ipString;
    }
    catch {
        return "Rome";       //If ip lookup doesn't work
    }
}