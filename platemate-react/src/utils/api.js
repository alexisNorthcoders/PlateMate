import axios from 'axios';

export const askGPT = async (prompt) => {
    const { data } = await axios.post(`https://alexisraspberry.changeip.co/recipe`, prompt)
    let parsedData = data
    if (data.startsWith("'")) {
        parsedData = data.split("'")[1].trim()
    }
    return parsedData


}