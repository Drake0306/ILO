import React from 'react';
import Pdf from "react-to-pdf";
import './pdfStyle.css';
import { LoadingButton } from '@mui/lab';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, InputLabel, MenuItem, FormControl } from '@mui/material';

const ref = React.createRef();

export default function PDFRenderDsaList (props) {
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
                                        <h3>DSA List</h3>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2} className="">
                                        <table border={0} className="tableTwo">
                                            <thead>
                                                <tr>
                                                    <th rowSpan={2} className='borderLine' style={{width: '30px', padding: '8px'}}><h5>Sl</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px', padding: '8px'}}><h5>DEL</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px', padding: '8px'}}><h5>DSA</h5></th>
                                                    <th rowSpan={2} className='borderLine' style={{width: '70px', padding: '8px'}}><h5>CODE</h5></th>
                                                </tr>
                                                
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='borderLine' />
                                                    <td className='borderLine'> &nbsp; </td>
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
