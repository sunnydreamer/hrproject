


import React, {useState} from 'react'
import './styles.css'
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';


function FileThumbnail({fileUrl}) {


    

    return (
        <div>
            <iframe title="PDF Viewer" src={fileUrl} style={{ width: '70%', height: '500px' }}></iframe>
        </div>
    );
}


function Documents({data}){
    const [showPopup, setShowPopup] = useState({
        opt: false,
        i20:false, 
        receipt: false,
        i983: false,
        license: false
    });

    const togglePopup = (event, which) => {
        const buttonId = which;
        setShowPopup(prevState => ({ ...prevState, [buttonId]: !prevState[buttonId] }));
        console.log(data)
    };

    // const pdfUrl= "https://testbuckethrproject.s3.amazonaws.com/HR+Project+2024+March.pdf"

    return(

        <div className='Document-Div'>

{data.driversLicense?.licenseImage && (
        <div >
            <a href={data.driversLicense?.licenseImage} target="_blank" rel="noopener noreferrer">EAD </a>
            <button onClick={(e) => togglePopup(e, 'ead')}>Open Preview</button>
            {showPopup.license && (
                <div className="popup">
                    <div className="popup-inner">
                        <button onClick={(e) => togglePopup(e, 'license')}>Close</button>
                        <FileThumbnail fileUrl={data.driversLicense?.licenseImage} />
                    </div>
                </div>
            )}
        </div>
    )}

    {/* EAD */}
    {data.opt?.ead?.document && (
        <div>
            <a href={data.opt.ead.document} target="_blank" rel="noopener noreferrer">EAD </a>
            <button onClick={(e) => togglePopup(e, 'ead')}>Open Preview</button>
            {showPopup.ead && (
                <div className="popup">
                    <div className="popup-inner">
                        <button onClick={(e) => togglePopup(e, 'ead')}>Close</button>
                        <FileThumbnail fileUrl={data.opt.ead.document} />
                    </div>
                </div>
            )}
        </div>
    )}
    
    {/* I20 */}
    {data.opt?.i20?.document && (
        <div>
            <a href={data.opt.i20.document} target="_blank" rel="noopener noreferrer">I20 </a>
            <button onClick={(e) => togglePopup(e, 'i20')}>Open Preview</button>
            {showPopup.i20 && (
                <div className="popup">
                    <div className="popup-inner">
                        <button onClick={(e) => togglePopup(e, 'i20')}>Close</button>
                        <FileThumbnail fileUrl={data.opt.i20.document} />
                    </div>
                </div>
            )}
        </div>
    )}

    {/* I983 */}
    {data.opt?.i983?.document && (
        <div>
            <a href={data.opt.i983.document} target="_blank" rel="noopener noreferrer">I983 </a>
            <button onClick={(e) => togglePopup(e, 'i983')}>Open Preview</button>
            {showPopup.i983 && (
                <div className="popup">
                    <div className="popup-inner">
                        <button onClick={(e) => togglePopup(e, 'i983')}>Close</button>
                        <FileThumbnail fileUrl={data.opt.i983.document} />
                    </div>
                </div>
            )}
        </div>
    )}

    {/* Receipt */}
    {data.opt?.receipt?.document && (
        <div class="document-each">
            <a href={data.opt.receipt.document} target="_blank" rel="noopener noreferrer">Receipt </a>
            <button onClick={(e) => togglePopup(e, 'receipt')}>Open Preview</button>
            {showPopup.receipt && (
                <div className="popup">
                    <div className="popup-inner">
                        <button onClick={(e) => togglePopup(e, 'receipt')}>Close</button>
                        <FileThumbnail fileUrl={data.opt.receipt.document} />
                    </div>
                </div>
            )}
        </div>
    )}
</div>

    )
}
export default Documents



