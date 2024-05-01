import React from 'react'
import './styles.css'

function Documents({data}){

    console.log(data)
    console.log(data.opt, "==");

    // data.driversLicense



    return(
        <div className="Document-Div">
            <img id="Profile-Pic" src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-768x576.png"></img>
            <img id="Profile-Pic" src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-768x576.png"></img>
            <img id="Profile-Pic" src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-768x576.png"></img>

        </div>
    )

}

export default Documents