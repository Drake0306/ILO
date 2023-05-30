import React from 'react';
import Pdf from "react-to-pdf";
import './pdfStyle.css';
import { LoadingButton } from '@mui/lab';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, InputLabel, MenuItem, FormControl } from '@mui/material';

const ref = React.createRef();

export default function PDFRenderCaseByRemarksWise (props) {
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
                                    <h3>INTELLECTIVE LAW OFFICES</h3>
                                    <h3 style={{fontSize: '15px'}}>Advicates, Legal Advisers & Consultants</h3>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} mt={9} className="subHead">
                                        <h3>Registration Register</h3>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} mt={9} className="subHeadEnd">
                                        <h3>As on Date: 21/12/22 </h3>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={5} className="subHead">
                                        <h3>Remark:</h3>
                                        <h3>Bank:</h3>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2} mt={2} className="subHead">
                                        <h3>Period From:&nbsp;</h3>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2} mt={2} className="subHead">
                                        <h3>Period To:&nbsp;</h3>
                                    </Grid>
                                    

                                    
                                    
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="">
                                        <table border={0} className="tableTwo">
                                            <thead>
                                                <tr>
                                                    <th rowSpan={2} className='borderLine' style={{width: '30px'}}><h5>Sl</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Regn Date</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Application No</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Seller</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '200px'}}><h5>Partner Name/Add/Ph</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '150px'}}><h5>Reg Off</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Rec No</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Property</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Dead Writer</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Handled</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>R.D Sent</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>T.D Sent</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>S.D Sent</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Courior Date</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Remark</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>Other Remark</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px'}}><h5>DSA</h5></th>
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
                                                    <td className='borderLine' />
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
