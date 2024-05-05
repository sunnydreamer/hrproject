


import React, {useState} from 'react'
// import './styles.css'
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';


function FileThumbnail({fileUrl}) {


    

    return (
        <div>
            <iframe title="PDF Viewer" src={fileUrl} style={{ width: '70%', height: '500px' }}></iframe>
        </div>
    );
}


function Documents({data}){

    // console.log(data)
    // console.log(data.opt, "===");
    //when luolian finsihes pull out the data.opt, which is array
        //go trhoug it and pull out the links

    //also use data.driversLicense.licenseImage




    //for now just use the test ones 
    // const pdfUrl = "https://testbuckethrproject.s3.amazonaws.com/73398308.jpg"


    const [showPopup, setShowPopup] = useState({
        opt: false,
        i20:false, 
        receipt: false,
        i983: false
    });

    const togglePopup = (event) => {
        const buttonId = event.currentTarget.name;

        // setShowPopup(prevState => !prevState);

        setShowPopup(prevState => ({ ...prevState, [buttonId]: !prevState[buttonId] }));


    };

    const pdfUrl= "https://testbuckethrproject.s3.amazonaws.com/HR+Project+2024+March.pdf"

    console.log(data, "======")

    return(
        <div className='Document-Div'>
    {/* EAD */}
    {data.opt?.ead?.document && (
        <div>
            <a href={data.opt.ead} target="_blank" rel="noopener noreferrer">EAD </a>
            <button onClick={(e) => togglePopup(e, 'ead')}>Open Preview</button>
            {showPopup.ead && (
                <div className="popup">
                    <div className="popup-inner">
                        <button onClick={(e) => togglePopup(e, 'ead')}>Close</button>
                        <FileThumbnail fileUrl={data.opt.ead} />
                    </div>
                </div>
            )}
        </div>
    )}
    
    {/* I20 */}
    {data.opt?.i20?.document && (
        <div>
            <a href={data.opt.i20} target="_blank" rel="noopener noreferrer">I20 </a>
            <button onClick={(e) => togglePopup(e, 'i20')}>Open Preview</button>
            {showPopup.i20 && (
                <div className="popup">
                    <div className="popup-inner">
                        <button onClick={(e) => togglePopup(e, 'i20')}>Close</button>
                        <FileThumbnail fileUrl={data.opt.i20} />
                    </div>
                </div>
            )}
        </div>
    )}

    {/* I983 */}
    {data.opt?.i983?.document && (
        <div>
            <a href={data.opt.i983} target="_blank" rel="noopener noreferrer">I983 </a>
            <button onClick={(e) => togglePopup(e, 'i983')}>Open Preview</button>
            {showPopup.i983 && (
                <div className="popup">
                    <div className="popup-inner">
                        <button onClick={(e) => togglePopup(e, 'i983')}>Close</button>
                        <FileThumbnail fileUrl={data.opt.i983} />
                    </div>
                </div>
            )}
        </div>
    )}

    {/* Receipt */}
    {data.opt?.receipt?.document && (
        <div>
            <a href={data.opt.receipt} target="_blank" rel="noopener noreferrer">Receipt </a>
            <button onClick={(e) => togglePopup(e, 'receipt')}>Open Preview</button>
            {showPopup.receipt && (
                <div className="popup">
                    <div className="popup-inner">
                        <button onClick={(e) => togglePopup(e, 'receipt')}>Close</button>
                        <FileThumbnail fileUrl={data.opt.receipt} />
                    </div>
                </div>
            )}
        </div>
    )}
</div>
    )
}
export default Documents



