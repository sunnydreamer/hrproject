import React from 'react'
import './styles.css'

function HousingReport({houseInfo, setShowComment}){

    let address = "19000 New jersey road, 2323, New York, Australia"

    // get the report
    // console.log(houseInfo.housingReport)



    let houseReport = houseInfo;
    // console.log(JSON.stringify(houseReport))
    // console.log(Array.isArray(houseReport))
    console.log(JSON.stringify(houseReport), "=============")

    if(!houseReport){
        console.log("dones't exist")
    }

    if (!Array.isArray(houseReport)) {
        return <div>No housing report available</div>;
      }

    // function showComment(){
    //     setShowComment(true);
    //     console.log("pressed")
    // }

    return(
        <div className="Housing-Report">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        {/* <th>Created By</th> */}
                        {/* <th>Timestamp</th> */}
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {houseReport.map((each, index) => 
                    (
                        <tr key={index} onClick={showComment}>
                            <td>{each.title}</td>
                            <td>{each.description}</td>
                            <td>{each.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )

}

export default HousingReport