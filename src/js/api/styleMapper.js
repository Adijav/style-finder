import axios from '../../axiosStyles'; 

const fetchStyleData = async () => {
    const tempObj = {};
    const response = await axios.get('/styles.json');   
    response.data.forEach(style => {
        tempObj[style.charAt(0).toUpperCase()] ? tempObj[style.charAt(0).toUpperCase()].push(style) : tempObj[style.charAt(0).toUpperCase()] = [style];
    })
    return tempObj;
}

export default fetchStyleData;