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

export default function PDFRenderExutivePeformanceSummary (props) {
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
                    const array = [];
                    if(paramsData.caseHandlledBy !== ''){
                        response.data.forEach(element => {
                            if(paramsData.caseHandlledBy === element.handledBy) {
                                array.push(element)
                            }
                        });
                        setResData(array)
                    } else {
                        setResData(response.data)
                    }
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
                                    <Grid item xs={6} sm={6} md={6} lg={6} mt={9} className="subHead">
                                        <h3>Registration Register - List of Docs Sent to Bank</h3>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} mt={9} className="subHeadEnd">
                                        <h3>As on Date: {moment().format('DD-MM-YYYY')} </h3>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={5} className="subHead">
                                        <h3>Case Handlled By</h3>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="">
                                        <table border={0} className="tableTwo">
                                            <thead>
                                                <tr>
                                                    <th rowSpan={2} className='borderLine' style={{width: '30px'}}><h5>Sl</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Bank</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Regn</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '200px'}}><h5>Purchase Details</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '150px'}}><h5>Reg Off</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>R.D Sent</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>T.D Sent</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>S.D Sent</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Other Remark</h5></th>
                                                </tr>
                                                
                                            </thead>
                                            <tbody>
                                            {resData.map((row) => (
                                                <tr key={row.id}>
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.id} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.bankName?.name} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {moment(row?.registrationDate).format('DD-MM-YYYY')} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.purchaser} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.registrarOffName?.name} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.rdSentOn && moment(row?.rdSentOn).format('DD-MM-YYYY')} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.tdSentOn && moment(row?.tdSentOn).format('DD-MM-YYYY')} </td>                                                        
                                                    <td className='borderLine' style={{fontSize: '9px', textAlign: 'left'}}> {row?.sdSentOn && moment(row?.sdSentOn).format('DD-MM-YYYY')} </td>                                                        
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
