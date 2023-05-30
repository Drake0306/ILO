import React from 'react';
import Pdf from "react-to-pdf";
import './pdfStyle.css';
import { LoadingButton } from '@mui/lab';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, InputLabel, MenuItem, FormControl } from '@mui/material';

const ref = React.createRef();

export default function PDFRenderBillExpenses (props) {
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
                                        <h5>To:</h5>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} className="dateAlignment" mt={3}>
                                        <h5>Date: 26/12/2022</h5>
                                    </Grid>
                                    


                                    <Grid item xs={12} sm={12} md={12} lg={12} className="subSubject">
                                        <h5>Sub: Legal, Title Search Report, ROC, E-Filling & Disbursal - Invoice for Expenses of <br/>December, 2022</h5>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} className="" mt={3}>
                                        <h5>Bill No:</h5>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="">
                                        <p className='normalLable'> <u>Towards expenses search & inspectino of documents for Delhi based properties</u> </p>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="">
                                        <table border={1} className="table">
                                            <thead>
                                                <tr>
                                                    <th className='firstone'><h5>No of Cases</h5></th>
                                                    <th className='middleone'><h5>Description</h5></th>
                                                    <th className='middleone'><h5>Rate</h5></th>
                                                    <th className='lastone'><h5>Amount</h5></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='' />
                                                    <td className='normalLable'> <b>Inspectinon fees as per list attached</b> </td>
                                                    <td className='' />
                                                    <td className='' />
                                                </tr>
                                                <tr>
                                                    <td className='' />
                                                    <td className=''> <h5>Total:</h5> </td>
                                                    <td className='' />
                                                    <td className='' />
                                                </tr>
                                                <tr>
                                                    <td className='' />
                                                    <td className='' />
                                                    <td className=''>  &nbsp; </td>
                                                    <td className='' />
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
                                    

                                </Grid>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
