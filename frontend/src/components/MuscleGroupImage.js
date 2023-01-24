import {useEffect, useState} from "react";
import axios from "axios";

//<MuscleGroupImage muscleGroups={["biceps", "triceps", "hamstring"]}

const MuscleGroupImage = ({ muscleGroups }) => {
  const [image, setImage] = useState("");

    const fetchImage = async() => {
        axios.get(`https://muscle-group-image-generator.p.rapidapi.com/getImage?muscleGroups=${muscleGroups.join(",")}`, {
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                'X-RapidAPI-Host': 'muscle-group-image-generator.p.rapidapi.com',
            },
            responseType: "arraybuffer"
        }).then((response) => {
            const imageFile = new Blob([response.data]);
            const imageUrl = URL.createObjectURL(imageFile);  
            setImage(imageUrl)
        });
    }

    useEffect(() => {
        fetchImage()
    }, [])

    return <img src={image} alt={`${muscleGroups.join(",")}`} />
}

export default MuscleGroupImage;
