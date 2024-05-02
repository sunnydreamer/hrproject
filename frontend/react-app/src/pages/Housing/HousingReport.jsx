import React from 'react'
import './styles.css'

function HousingReport({data, setShowComment}){

    // let houseInfo = data.house;





    let houseReport = data.house?.housingReport;





    if(!houseReport){
        console.log("dones't exist")
    }

    if (!Array.isArray(houseReport)) {
        return <div>No housing report available</div>;
      }

    function showComment(event, each){
        setShowComment({
            showBool: true,
            comments: each.housingComments,
            housingID: each._id
        });
    }

    return(
        <div className="Housing-Report">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created By</th>
                        <th>Timestamp</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {houseReport.map((each, index) => 
                    (
                        <tr key={index} onClick={() => showComment(event, each)} id={each.housingComment}>
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