import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pdf from "react-to-pdf";
import './pdfStyle.css';
import moment from 'moment/moment';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, InputLabel, MenuItem, FormControl } from '@mui/material';
import JSON_CONST from '../../../components/CONSTVALUE.json';

const ref = React.createRef();

export default function PDFRenderPaymentLedger (props) {
    const ref = React.createRef();
    const params = useParams()
    const [paramsData, setParamsData] = useState(params.data && JSON.parse(decodeURI(params.data)));
    const [resData, setResData] = useState([]);

    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [4,2]
    };

    useEffect(() => {
        try {
            axios.post(`${JSON_CONST.DB_URL}builderPayment/paymentLedgerReport`, paramsData)
                .then((response) => {
                    console.log(response);
                    setResData(response.data)
                }).catch((error) => {
                    console.log(error);
                });
        }
        catch (err) {
            console.log(err)
        }
      }, [paramsData]);


    return (
        <> 
            <center>
                <Pdf targetRef={ref} filename="Professional-Fee.pdf">
                    {({ toPdf }) => (
                    <LoadingButton size="large" type="button" onClick={toPdf} variant="contained" color="error" > Generate PDF </LoadingButton>
                    )}
                </Pdf>
            </center>
            <div style={{marginTop: '100px'}}>
                <div className="book">
                    <div className="pageOne" ref={ref}>
                        <div className="subpageTwo">
                            <Container>
                                <Grid container alignItems="center" paddingLeft={0} paddingBottom={0} paddingRight={0} paddingTop={0} spacing={0}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} className="headTitle">
                                        <h3>INTELLECTIVE LAW OFFICES</h3>
                                        <h3 style={{fontSize: '15px'}}>Advicates, Legal Advisers & Consultants</h3>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} lg={3} mt={9} className="subHead"/>
                                    <Grid item xs={3} sm={3} md={3} lg={3} mt={9} className="subHead">
                                        <h3>From:&nbsp; {moment(paramsData.from).format('DD-MM-YYYY')}</h3>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2} mt={9} className="subHead">
                                        <h3>&nbsp;&nbsp;&nbsp;&nbsp;To:&nbsp; {moment(paramsData.to).format('DD-MM-YYYY')}</h3>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4} mt={9} className="subHeadEnd">
                                        <h3>As on Date: {moment().format('DD-MM-YYYY')} </h3>
                                    </Grid>
                                    
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="">
                                        <table border={1} className="tableTwo">
                                            <thead>
                                                <tr>
                                                    <th rowSpan={2} className='borderstyle' style={{width: '30px'}}><h5>Sr</h5></th>
                                                    <th rowSpan={2} className='borderstyle' style={{width: '150px'}}><h5>Customer Name</h5></th>
                                                    <th rowSpan={2} className='borderstyle' style={{width: '70px'}}><h5>File No</h5></th>
                                                    <th rowSpan={2} className='borderstyle' style={{width: '70px'}}><h5>Rec Date</h5></th>
                                                    <th rowSpan={2} className='borderstyle' style={{width: '70px'}}><h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Loan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ac No</h5></th>
                                                    <th rowSpan={2} className='borderstyle' style={{width: '70px'}}><h5>Ref No</h5></th>
                                                    <th rowSpan={2} className='borderstyle' style={{width: '200px'}}><h5>Address</h5></th>
                                                    <th rowSpan={1} colSpan={4} className='borderstyle' style={{width: '70px'}}><h5>Pay order Details</h5></th>
                                                    <th rowSpan={2} className='borderstyle' style={{width: '70px'}}><h5>Remarks</h5></th>
                                                    <th rowSpan={2} className='borderstyle' style={{width: '70px'}}><h5>Receipt &nbsp;&nbsp;&nbsp;No / Date</h5></th>
                                                    <th rowSpan={2} className='borderstyle' style={{width: '70px'}}><h5>Sent on</h5></th>
                                                </tr>
                                                <tr>
                                                    <th className='borderstyle' style={{width: '100px'}}><h5>Favoring</h5></th>
                                                    <th className='borderstyle' style={{width: '70px'}}><h5>Amt</h5></th>
                                                    <th className='borderstyle' style={{width: '70px'}}><h5>PO</h5></th>
                                                    <th className='borderstyle' style={{width: '70px'}}><h5>Date</h5></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {resData.map((row) => (
                                                    <tr key={row.id}>
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.id} </td>                                                        
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.customerBorrower} </td>                                                        
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.fileNo} </td>                                                        
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.recDate} </td>                                                        
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.loanACNo} </td>                                                        
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.refNo} </td>                                                        
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.address} </td>                                                        
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.favoring} </td>                                                        
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.amount} </td>                                                        
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.payOrderNo} </td>                                                        
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.dated} </td>                                                        
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.remarks} </td>                                                        
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.reciptNo} </td>                                                        
                                                        <td className='borderstyle' style={{fontSize: '9px', textAlign: 'left'}}> {row.reciptDate} </td>                                                        
                                                    </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </Grid>

                                </Grid>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
