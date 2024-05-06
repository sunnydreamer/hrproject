import React from 'react'
import './styles.css'
import { Button } from '@mui/material';
import axios from 'axios';



function HousingComment({showComment, setShowComment, data}){

  const handleCommentChange = (index, newValue) => {
    const updatedComments = [...showComment.comments];
    updatedComments[index].description = newValue;
    setShowComment({
      ...showComment,
      comments: updatedComments
    });
  };

  const handleCommentEdit = (event) =>{
    //build thing send it to server
    const payload = {
      reportId : showComment.reportId,
      comment : showComment.comments,
      username: data.username,
      userId: data._id


  }

  // showComment._id == data._id
  // console.log(showComment._id, data._id)
  console.log(showComment.comments[0].createdBy, "99099999")

  axios.put("http://localhost:3000/user/housing/comment/change", payload, {
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

    // console.log(showComment)
    return (
      <div className='Comment-Div'>
        <table>
          <thead>
              <tr>
                <th>Username</th>
                <th>Time</th>
                <th>Comment</th>


              </tr>
          </thead>
          <tbody>
            {showComment.comments.map((each, index) => (
              <tr key={index}>
                <td>

                  {each.username}
                  </td>
                  <td>

              {each.timestamp}
              </td>
                <td>
                <input 
                style={{ width: '25vw' }} 
                type="text" 
                value={each.description} 
                onChange={(e) => handleCommentChange(index, e.target.value)}
                // onChange={(e) => alert(showComment.id, data._id)}

                readOnly = {(each.createdBy != data._id)}

                className={each.createdBy !== data._id ? "grey-background" : ""}

              />                
              </td>
              </tr>
            ))}
          </tbody>
          <Button  variant="contained"  color="primary" onClick={handleCommentEdit}>Save</Button>

        </table>
      </div>
    );

}

export default HousingComment