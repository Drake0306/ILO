import React from 'react';
import Pdf from "react-to-pdf";
import './pdfStyle.css';
import { LoadingButton } from '@mui/lab';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, InputLabel, MenuItem, FormControl } from '@mui/material';

const ref = React.createRef();

export default function PDFRenderBill (props) {
    const ref = React.createRef();
    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [4,2]
    };
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
                    <div className="page" ref={ref}>
                        <div className="subpage">
                            <Container >
                                <Grid container alignItems="center" paddingLeft={0} paddingBottom={0} paddingRight={0} paddingTop={0} spacing={0}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} className="headName">
                                        <h3>Invoice</h3>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} className="" mt={3}>
                                        <h5>Bill No:</h5>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} className="dateAlignment" mt={3}>
                                        <h5>Date: 26/12/2022</h5>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} className="" mt={3}>
                                        <h5>To:</h5>
                                    </Grid>
                                    


                                    <Grid item xs={12} sm={12} md={12} lg={12} className="subject">
                                        <h5>Sub: Legal, Title Search Report, ROC, E-Filling & Disbursal -</h5>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} className="descMain">
                                        <h5 className='desc'>Towards professional charges for the ROC Search & Affecting SRO Search, 
                                            Inspection, Verification & vetting of original documents related to our 
                                            Title Search Report(s) of the month of December,2022 for legal cases of Delhi & NCR</h5>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="">
                                        <table border={0} className="table">
                                            <thead>
                                                <tr>
                                                    <th className='borderLine firstone'><h5>No of Cases</h5></th>
                                                    <th className='borderLine middleone'><h5>Description</h5></th>
                                                    <th className='borderLine lastone'><h5>Amount</h5></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='borderLine' />
                                                    <td className='borderLine'> &nbsp; </td>
                                                    <td className='borderLine' />
                                                </tr>
                                                <tr>
                                                    <td className='borderLine' />
                                                    <td className='borderLine'> <h5>Total:</h5> </td>
                                                    <td className='borderLine' />
                                                </tr>
                                                <tr>
                                                    <td className='borderLineEmptyLeft' />
                                                    <td className='borderLineEmptyMiddle'>  &nbsp; </td>
                                                    <td className='borderLine' />
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="">
                                        <p className='normalLable'>Assuring you for the best of out service. You are requested to release the payment at your earliest</p>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="">
                                        <p className='normalLable'>Thanking You,</p>
                                        <p className='normalLable'>Yours Truly,</p>
                                    </Grid>


                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="">
                                        <h5 className=''>For ILO</h5>
                                    </Grid>


                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={3} className="">
                                        <h5 className=''>Authorised Sognatory</h5>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="">
                                        <p className='normalLable'>Kindly prepare check in the name of " ILO"</p>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={1} className="">
                                        <p className='normalLable'>Our Bank account no MICR Code-IFSC Code-</p>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={1} className="">
                                        <p className='normalLable'>Branch-</p>
                                    </Grid>


                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={1} className="">
                                        <h5 className=''>PAN No:</h5>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={1} className="">
                                        <h5 className='boldLable'>"Service tax is to be paid by the Service Receiver as per Notification No. 25/2012- Service Tax Dated 20th June 2012"</h5>
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
