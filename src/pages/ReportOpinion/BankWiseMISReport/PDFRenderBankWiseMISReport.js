import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pdf from "react-to-pdf";
import './pdfStyle.css';
import moment from 'moment/moment';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, InputLabel, MenuItem, FormControl } from '@mui/material';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Icon from '@mui/material/Icon';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import JSON_CONST from '../../../components/CONSTVALUE.json';


const ref = React.createRef();

// Register fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#FFFFFF',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function PDFRenderBankWiseMISReport (props) {
    const ref = React.createRef();
    const params = useParams()
    const [paramsData, setParamsData] = useState(params.data && JSON.parse(decodeURI(params.data)));
    const [resData, setResData] = useState([]);
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const [dd, setDD] = useState({
        pageOrientation: 'landscape',
        pageSize: 'A4',
        pageMargins: [ 40, 10, 40, 10 ],
        content: [
            {text: 'All Bank Wise Cases Received', style: 'header'},
            {text: `Bank Wise Report:-                                                       From: ${moment(paramsData.from).format('DD-MM-YYYY')}     To: ${moment(paramsData.to).format('DD-MM-YYYY')}                                                 As on Date: ${moment().format('DD-MM-YYYY')}`, style: 'subheader'},
            {
                style: 'tableExample',
                table: {
                    body: [
                        [{text: 'Sr', style: 'tableHeaderMain'}, {text:'App no', style: 'tableHeaderMain'}, {text:'Rep No', style: 'tableHeaderMain'}, {text:'Branch', style: 'tableHeaderMain'}, {text:'Type', style: 'tableHeaderMain'}, {text:'Customer / Borrower', style: 'tableHeaderMain'}, {text:'Address', style: 'tableHeaderMain'}, {text:'DSA', style: 'tableHeaderMain'}, {text:'App Date', style: 'tableHeaderMain'}, {text:'Rep Date', style: 'tableHeaderMain'}, {text:'Sent On', style: 'tableHeaderMain'}, {text:'Prepared By', style: 'tableHeaderMain'}, {text:'Remarks', style: 'tableHeaderMain'}, {text:'User ID'} ],
    
                        [{text: 'OK', style: 'tableHeader'},{text: 'OK', style: 'tableHeader'},{text: 'OK', style: 'tableHeader'},{text: 'OK', style: 'tableHeader'},{text: 'OK', style: 'tableHeader'},{text: 'OK', style: 'tableHeader'},{text: 'OK', style: 'tableHeader'},{text: 'OK', style: 'tableHeader'},{text: 'OK', style: 'tableHeader'},{text: 'OK', style: 'tableHeader'},{text: 'OK', style: 'tableHeader'},{text: 'OK', style: 'tableHeader'},{text: 'OK', style: 'tableHeader'},{text: 'OK', style: 'tableHeader'},]
                    ]
                }
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10],
                alignment: 'center'
            },
            subheader: {
                fontSize: 12,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            subheadingTable: {
                fontSize: 10,
                bold: false,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 0, 0, 0],
            },
            tableHeader: {
                fontSize: 9,
                color: 'black'
            },
            tableHeaderMain: {
                bold: true,
                color: 'black'
            }
        },
        defaultStyle: {
            // alignment: 'justify'
        }
        
    });

    const exportToExcel = async () => {
        // const ws = XLSX.utils.json_to_sheet(resData);
        // const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        // const excelBuffer = XLSX.write(wb, { bookType : 'xlsx', type: 'array'});
        // const data = new Blob([excelBuffer], {type: fileType});
        // FileSaver.saveAs(data, `Export All Bank Wise Cases Received${fileExtension}`);

        // Extract keys to use as headers
        const headers = Object.keys(resData[0]);

        // Create an array of arrays from the data object
        const dataArray = resData.map(item => headers.map(header => item[header]));

        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet([['All Bank Wise Cases Received'], [], headers, ...dataArray]);

        // Style the header row
        const headerStyle = {
            font: { bold: true },
            alignment: { horizontal: 'center' },
            fill: { fgColor: { rgb: 'FFFFAA00' } } // Example: Yellow background
        };

        worksheet.A1.s = headerStyle; // Apply style to the custom header

        headers.forEach((header, index) => {
            const cellAddress = XLSX.utils.encode_cell({ r: 2, c: index });
            worksheet[cellAddress].s = headerStyle; // Apply style to each header cell
        });

        // Create workbook and append worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Write the workbook to a file
        XLSX.writeFile(workbook, 'Export All Bank Wise Cases Received.xlsx');
    }

    const exportToPdf = (value) => {
        pdfMake.createPdf(value).open();
    }

    useEffect(() => {

        // ADD TO ROW FOR THE PDF
        const tableHeadder = [];
        tableHeadder.push(dd.content[2].table.body[0]);

        const fullDD = dd;
        let fullData = [];
        const pushToMain = tableHeadder;
        try {
            axios.post(`${JSON_CONST.DB_URL}option/bankWiseReport`, paramsData)
                .then((response) => {
                    console.log(response);
                    response.data.forEach((row) => {
                        fullData = [];
                        // Push to Temp
                        fullData.push({text: row.id, style: 'tableHeader'})
                        fullData.push({text: row.apsNo, style: 'tableHeader'})
                        fullData.push({text: row.repNo, style: 'tableHeader'})
                        fullData.push({text: row.branchName.name, style: 'tableHeader'})
                        fullData.push({text: 'N.A', style: 'tableHeader'})
                        fullData.push({text: row.customerBorrower, style: 'tableHeader'})
                        fullData.push({text: row.streetSectorLocal, style: 'tableHeader'})
                        fullData.push({text: 'N.A', style: 'tableHeader'})
                        fullData.push({text: row.reciptDate, style: 'tableHeader'})
                        fullData.push({text: row.reportDate, style: 'tableHeader'})
                        fullData.push({text: row.reportSentOn, style: 'tableHeader'})
                        fullData.push({text: row.preparedByName.name, style: 'tableHeader'})
                        fullData.push({text: row.remarks, style: 'tableHeader'})
                        fullData.push({text: 'N.A', style: 'tableHeader'})

                        // Push To Main
                        pushToMain.push(fullData)
                    });

                    // assign main Value
                    fullDD.content[2].table.body = pushToMain;
                    setDD(fullDD);
                    console.log('pushToMain', pushToMain);
                    console.log('fullData', fullData);
                    console.log('dd', dd);

                    setResData(response.data)
                    console.log('XLSX', response.data)
                    
                }).catch((error) => {
                    console.log(error);
                });
        }
        catch (err) {
            console.log(err)
        }
    }, [dd, dd.content, paramsData]);


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                    <Item style={{backgroundColor: '#FFFFFF',display: 'flex', justifyContent: 'right', marginTop: '200px'}}>
                        <Card style={{backgroundColor: '#B14019'}} sx={{ minWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={''}
                                title=""
                            >
                                <PictureAsPdfOutlinedIcon style={{marginTop: '20px', fontSize: '140px', color: 'white'}} />
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={{color: 'white'}}>
                                PDF EXPORT 
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button style={{backgroundColor: '#F9F9F9'}} onClick={(e) => exportToPdf(dd)} size="small">PDF</Button>
                                &nbsp;&nbsp;&nbsp;<sub style={{color: '#F9F9F9'}}>Click to open/download</sub>
                            </CardActions>
                        </Card>
                    </Item>
                    </Grid>
                    <Grid item xs={6}>
                    <Item style={{backgroundColor: '#FFFFFF',display: 'flex', justifyContent: 'left', marginTop: '200px'}}>
                    <Card style={{backgroundColor: '#1C9F44'}} sx={{ minWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image=""
                                title=""
                            >
                                <FileDownloadOutlinedIcon style={{marginTop: '20px', fontSize: '140px', color: 'white'}} />
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={{color: 'white'}}>
                                XLSX EXPORT
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button style={{backgroundColor: '#F9F9F9'}} onClick={(e) => exportToExcel(e)} size="small">XLSX </Button>
                                &nbsp;&nbsp;&nbsp;<sub style={{color: '#F9F9F9'}}>Click to open/download</sub>
                            </CardActions>
                        </Card>
                    </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
