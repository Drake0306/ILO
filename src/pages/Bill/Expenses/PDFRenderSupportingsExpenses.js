import React from 'react';
import Pdf from "react-to-pdf";
import './pdfStyle.css';
import { LoadingButton } from '@mui/lab';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, InputLabel, MenuItem, FormControl } from '@mui/material';

const ref = React.createRef();

export default function PDFRenderSupportingsExpenses (props) {
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
                    <div className="pageTwo" ref={ref}>
                        <div className="subpageTwo">
                            <Container >
                                <Grid container alignItems="center" paddingLeft={0} paddingBottom={0} paddingRight={0} paddingTop={0} spacing={0}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} className="headTitle">
                                        <h3>LIST OF THE CASES HANDELED FOR THE MONTH OF &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; December ,2022</h3>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="subHead">
                                        <h3>Bank: </h3>
                                        <br/>
                                        <h3>Bill No: </h3>
                                    </Grid>
                                    
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="">
                                        <table border={0} className="tableTwo">
                                            <thead>
                                                <tr>
                                                    <th className='borderLine' style={{width: '30px'}}><h5>Sr</h5></th>
                                                    <th className='borderLine' style={{width: '150px'}}><h5>Borrower's Name</h5></th>
                                                    <th className='borderLine' style={{width: '70px'}}><h5>App No</h5></th>
                                                    <th className='borderLine' style={{width: '70px'}}><h5>APS No</h5></th>
                                                    <th className='borderLine' style={{width: '70px'}}><h5>Type</h5></th>
                                                    <th className='borderLine' style={{width: '70px'}}><h5>Status</h5></th>
                                                    <th className='borderLine' style={{width: '200px'}}><h5>Address</h5></th>
                                                    <th className='borderLine' style={{width: '70px'}}><h5>Rep Date</h5></th>
                                                    <th className='borderLine' style={{width: '70px'}}><h5>Fee (Rs.)</h5></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='borderLine' />
                                                    <td className='borderLine'> &nbsp; </td>
                                                    <td className='borderLine' />
                                                    <td className='borderLine' />
                                                    <td className='borderLine' />
                                                    <td className='borderLine' />
                                                    <td className='borderLine' />
                                                    <td className='borderLine' />
                                                    <td className='borderLine' />
                                                </tr>
                                                
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
