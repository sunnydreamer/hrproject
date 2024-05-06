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

    // console.log(houseInfo)
    const address = houseInfo.housing?.address.street + " "
                    + houseInfo.housing?.address.city + ", "
                    + houseInfo.housing?.address.state + ", "
                    + houseInfo.housing?.address.zip + " "

    // const roomates = houseInfo.housing.roommates[0].firstName;
    const roommates = houseInfo.housing?.roommates;





    if (houseInfo === null) {
        return <div>Loading...</div>;
    }

    return(
        <>
        <div className="Housing-Div">
             <img id="Profile-Pic" src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/295090917.jpg?k=d17621b71b0eaa0c7a37d8d8d02d33896cef75145f61e7d96d296d88375a7d39&o=&hp=1"></img>

            <div className='Housing-Div-Detail'>
                <div className="Housing-Address">
                    <h3>Address:</h3>
                    <h4>{address}</h4>
                </div>
                <div className="Housing-Roomate">
                    <h3>Roomates</h3>
                    <table>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map through roommates array to create table rows */}
                            {roommates?.map((each, index) => (
                            <tr key={index}>
                                <td>{each.firstName} {each.lastName}</td>
                                <td>{each.phone?.cell}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        </>
    )

}

export default HousingDetail