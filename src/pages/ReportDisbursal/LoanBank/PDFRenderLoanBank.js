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

export default function PDFRenderLoanBank (props) {
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
            axios.post(`${JSON_CONST.DB_URL}disbursal/registrationBTGlobalREport`, paramsData)
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
            <div>
                <div className="book">
                    <div className="pageTwo" ref={ref}>
                        <div className="subpageTwo">
                            <Container >
                                <Grid container alignItems="center" paddingLeft={0} paddingBottom={0} paddingRight={0} paddingTop={0} spacing={0}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} className="headTitle">
                                    <h3>INTELLECTIVE LAW OFFICES</h3>
                                    <h3 style={{fontSize: '15px'}}>Advicates, Legal Advisers & Consultants</h3>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4} mt={9} className="subHead">
                                        <h3>Loan Take Over - Status</h3>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2} mt={9} className="subHead">
                                        <h3>&nbsp;</h3>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2} mt={9} className="subHead">
                                        <h3>&nbsp;</h3>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4} mt={9} className="subHeadEnd">
                                        <h3>As on Date: {moment().format('DD-MM-YYYY')} </h3>
                                    </Grid>
                                    
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="">
                                        <table border={0} className="tableTwo">
                                            <thead>
                                                <tr>
                                                    <th rowSpan={2} className='borderLine' style={{width: '30px'}}><h5>Sl</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>App no</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '200px'}}><h5>DSA</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '150px'}}><h5>Customer</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Take Over</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Doc Sent To Bank</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Amount</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Chq Date</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Chq Rev</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Chq Return</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Remark</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Oth Remark</h5></th>
                                                </tr>
                                                
                                            </thead>
                                            <tbody>
                                            {resData.map((row) => (
                                                <tr key={row.id}>
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.id} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.applicationNo} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.dsaName?.name} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row.customerName} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.loanTakenFrom} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.docSentToBankDate && moment(row?.docSentToBankDate).format('DD-MM-YYYY')} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.amount} </td>   
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.chequeDate && moment(row?.chequeDate).format('DD-MM-YYYY')} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.chequeReceivedDate && moment(row?.chequeReceivedDate).format('DD-MM-YYYY')} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.chequeReturnDate && moment(row?.chequeReturnDate).format('DD-MM-YYYY')} </td> 
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.remarksName?.name} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.otherRemarkIfAny} </td>
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
