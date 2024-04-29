import React from 'react'
import './styles.css'



function HousingDetail({ houseInfo }){
    // console.log(houseInfo.housingReport)

    // let house = houseInfo.housing.house
    console.log(houseInfo);

    // let address = JSON.stringify(house)



    // if (houseInfo === null) {
    //     return <div>Loading...</div>;
    // }

    return(
        <h1>hi</h1>
        // <div className="Housing-Div">
        //     <img id="Profile-Pic" src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-768x576.png"></img>

        //     <div className='Housing-Div-Detail'>
        //         <div className="Housing-Address">
        //             <h3>Address:</h3>
        //             {/* <h4>{address}</h4> */}
        //         </div>
        //         <div className="Housing-Roomate">
        //             <h3>Roomates</h3>
        //             <ul>
        //                 {/* for now there are none */}
        //                 {/* {houseInfo.roommates.map((each, index) => 
        //                     <li key={index}>{each}</li>
        //                 )} */}
        //             </ul>
        //         </div>
        //     </div>

        // </div>
    )

}

export default HousingDetail