import React from 'react'
import './styles.css'



function HousingDetail({ houseInfo }){



    // let address = houseInfo.housing.address.;

    // 
// city
// : 
// "Oklahoma City"
// state
// : 
// "Oklahoma"
// street
// : 
// "123 Shinchan Ave"
// zip
// : 
// "12345"
    const address = houseInfo.housing.address.street + " "
                    + houseInfo.housing.address.city + ", "
                    + houseInfo.housing.address.state + ", "
                    + houseInfo.housing.address.zip + " "

    // const roomates = houseInfo.housing.roommates[0].firstName;
    const roommates = houseInfo.housing.roommates;





    if (houseInfo === null) {
        return <div>Loading...</div>;
    }

    return(
        <>
        <div className="Housing-Div">
            <img id="Profile-Pic" src="data:image/jpeg;base64,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"></img>

            <div className='Housing-Div-Detail'>
                <div className="Housing-Address">
                    <h3>Address:</h3>
                    <h4>{address}</h4>
                </div>
                <div className="Housing-Roomate">
                    <h3>Roomates</h3>
                    <ul>
                        {/* for now there are none */}
                        {roommates.map((each, index) => 

                            <li key={index}> {each.firstName} {each.lastName}
                                <br/>
                                    Phone: {each.phone.cell}
                            </li>
                            )}   

                    </ul>
                </div>
            </div>

        </div>
        </>
    )

}

export default HousingDetail