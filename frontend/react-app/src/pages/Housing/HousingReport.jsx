import React, {useState} from 'react'
import './styles.css'
import HousingComment from './HousingComment';
import axios from 'axios';
import { Button } from '@mui/material';


function HousingReport({data}){
    let houseReport = data.house?.housingReport;

    const [comment, setComment] = useState("");
    // const [currHouseId, setcurrHouseId] = useState("");

    const [showComment, setShowComment] = useState({
        showBool : false,
        comments : [],
        reportId: ""
      });


    function handleComment(){
        const payload = {
            reportId : showComment.reportId,
            comment : comment,
            username: data.username,
            userId: data._id
        }


     axios.put("http://localhost:3000/user/housing/comment/new", payload, {
        authenticate: true
     })
      .then(response =>
        {
          console.log(response.data)
        //   setIsOpen(false);
        }
      )
      .catch(error => 
          console.error(error)
            // setIsOpen(true);
      )

      }


    if(!houseReport){
        console.log("doesn't exist")
    }

    if (!Array.isArray(houseReport)) {
        return <div>No housing report available</div>;
      }

    function handleshowComment(event, each){
        setShowComment({
            showBool: true,
            comments: each.housingComments,
            reportId: each._id
        });
    }

    return (
        <div>
        <div className="Housing-Report">


          <table className="report-table">
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
            {houseReport.map((each, index) => {
            if (each.createdBy._id === data._id) {
                return (
                <tr key={index} onClick={(event) => handleshowComment(event, each)} id={each.housingComment}>
                    <td>{each.title}</td>
                    <td>{each.description}</td>
                    <td>{each.createdBy.username || ''}</td>
                    <td>{each.timestamp}</td>
                    <td>{each.status}</td>
                </tr>
                );
            } else {
                return null; // Return null if createdBy._id doesn't match the specific condition
            }
            })}
            </tbody>
          </table>
          </div>


          <div className="Housing-Report"> 

          {showComment.showBool? 
          <div>
            <h2 className='Housing'>Report Comments</h2>
            {/*comeback to the comments, and filter out only the ones for that user*/}
            <HousingComment data={data} showComment={showComment} setShowComment={setShowComment}></HousingComment>
            <br></br>

            <h2>New Comment</h2>
            <input 
                type="text" 
                name="Comment" 
                id="Comment"
                style={{ width: '50vw' }} 
                value={comment} 
                onChange={(event) => {
                  setComment(event.target.value)}}
            />
            <br></br>
            <Button   variant="contained"  color="primary" onClick={handleComment}>Submit</Button>
          </div>
          :
          <div></div>}          

        </div>
        </div>
      );
    }
    

export default HousingReport