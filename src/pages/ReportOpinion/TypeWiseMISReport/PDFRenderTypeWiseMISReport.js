/* eslint-disable dot-notation */
import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pdf from "react-to-pdf";
import './pdfStyle.css';
import moment from 'moment/moment';
import axios from 'axios';

import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

import { LoadingButton } from '@mui/lab';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, InputLabel, MenuItem, FormControl } from '@mui/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Icon from '@mui/material/Icon';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


import JSON_CONST from '../../../components/CONSTVALUE.json';

const ref = React.createRef();

export default function PDFRenderTypeWiseMISReport (props) {
    const ref = React.createRef();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#FFFFFF',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const params = useParams()
    const [paramsData, setParamsData] = useState(params.data && JSON.parse(decodeURI(params.data)));
    const [resData, setResData] = useState([]);
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = async () => {
        const {from, to} = paramsData;
        const Datetitle = [{"Sr" : `FROM : ${moment(from).format('DD-MM-YYYY')} | TO : ${moment(to).format('DD-MM-YYYY')}`}];
        const emptyRow0 = [{"Sr" : ''}]; // Empty row to skip a line
        // Prepare the title row
        const title = [{"Sr" : 'Export INTELLECTIVE LAW OFFICES | All Bank Wise Cases Received'}];
        const emptyRow = [{"Sr" : ''}]; // Empty row to skip a line

        const dataXLSX = [...emptyRow0, ...title, ...Datetitle, ...emptyRow, ...resData];

        // Create worksheet and workbook
        const ws = XLSX.utils.json_to_sheet(dataXLSX, { skipHeader: true });
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        // Set title row style to bold
        ws['A1'].s = { font: { bold: true } };
        ws['A2'].s = { font: { bold: true } };
        ws['A3'].s = { font: { bold: true } };
        
        // Set column widths
        const colWidths = [
            { wch: 10 }, // Sr
            { wch: 15 }, // Rep Date
            { wch: 20 }, // Bank
            { wch: 20 }, // Branch
            { wch: 25 }, // Customer name
            { wch: 25 }, // Aps No
            { wch: 15 }, // Ref No
            { wch: 25 }, // Seller Name
            { wch: 20 }, // Phone No
            { wch: 20 }, // Prepared By
            { wch: 20 }, // Type
            { wch: 30 }, // Address
            { wch: 20 }, // Roof Right
            { wch: 20 }, // Receipt Date
            { wch: 15 }, // Sent On
            { wch: 20 }, // Status
            { wch: 25 }, // Remarks
        ];
        ws['!cols'] = colWidths;

        // Generate Excel file
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, `Export All TYPE Wise Cases Received${fileExtension}`);
    }

    const [dd, setDD] = useState({
        pageOrientation: 'landscape',
        pageSize: 'A4',
        pageMargins: [ 40, 10, 40, 10 ],
        content: [
            {text: 'INTELLECTIVE LAW OFFICES', style: 'header'},
            {text: 'Advicates, Legal Advisers & Consultants', style: 'headerSub'},
            {text: `Bank Wise Report Type MIS :-                                From: ${moment(paramsData.from).format('DD-MM-YYYY')}     To: ${moment(paramsData.to).format('DD-MM-YYYY')}                                                 As on Date: ${moment().format('DD-MM-YYYY')}`, style: 'subheader'},
            {
                style: 'tableExample',
                table: {
                    body: [
                        [{text:'Rep No', style: 'tableHeaderMain'},
                        {text: 'Sr', style: 'tableHeaderMain'},
                         {text:'Rep Date', style: 'tableHeaderMain'},
                         {text:'Bank', style: 'tableHeaderMain'},
                         {text:'Branch', style: 'tableHeaderMain'},
                         {text:'Customer Name', style: 'tableHeaderMain'},  
                         {text:'Aps No', style: 'tableHeaderMain'}, 
                         {text:'Ref No', style: 'tableHeaderMain'},
                         {text:'Seller Name', style: 'tableHeaderMain'},
                         {text:'Phone No', style: 'tableHeaderMain'},
                         {text:'Prepared By', style: 'tableHeaderMain'}, 
                         {text:'Type', style: 'tableHeaderMain'}, 
                         {text:'Address', style: 'tableHeaderMain'},
                         {text:'Roof Right', style: 'tableHeaderMain'},
                         {text:'Receipt Date', style: 'tableHeaderMain'}, 
                         {text:'Sent On', style: 'tableHeaderMain'}, 
                         {text:'Status', style: 'tableHeaderMain'}, 
                         {text:'Remarks', style: 'tableHeaderMain'}, ],
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
            },
            headerSub: {
                fontSize: 16,
                alignment: 'center'
            }
        },
        defaultStyle: {
            // alignment: 'justify'
        }
        
    });

    const exportToPdf = (value) => {
        pdfMake.createPdf(value).open();
    }

    useEffect(() => {

        // ADD TO ROW FOR THE PDF
        const tableHeadder = [];
        tableHeadder.push(dd.content[3].table.body[0]);

        const fullDD = dd;
        let fullData = [];
        const pushToMain = tableHeadder;
        try {
            axios.post(`${JSON_CONST.DB_URL}option/typeWiseReport`, paramsData)
                .then((response) => {
                    console.log(response);
                    response.data.forEach((row) => {
                        fullData = [];
                        // Push to Temp
                        fullData.push({text: row.repNo, style: 'tableHeader'})
                        fullData.push({text: row.id, style: 'tableHeader'})
                        fullData.push({text: row.reportDate, style: 'tableHeader'})
                        fullData.push({text: row.bankName.name, style: 'tableHeader'})
                        fullData.push({text: row.branchName.name, style: 'tableHeader'})
                        fullData.push({text: row.customerBorrower, style: 'tableHeader'})
                        fullData.push({text: row.apsNo, style: 'tableHeader'})
                        fullData.push({text: row.refNo, style: 'tableHeader'})
                        fullData.push({text: row.uid, style: 'tableHeader'})
                        fullData.push({text: row.phoneNo, style: 'tableHeader'})
                        // fullData.push({text: row.odbdate, style: 'tableHeader'})
                        fullData.push({text: row.preparedByName.name, style: 'tableHeader'})
                        fullData.push({text: row.type.name, style: 'tableHeader'})
                        fullData.push({text: row.streetSectorLocal, style: 'tableHeader'})
                        fullData.push({text: row.roofRight, style: 'tableHeader'})
                        fullData.push({text: row.reciptDate, style: 'tableHeader'})
                        fullData.push({text: row.reportSentOn, style: 'tableHeader'})
                        fullData.push({text: row.status, style: 'tableHeader'})
                        fullData.push({text: row.remarks, style: 'tableHeader'})

                        // Push To Main
                        pushToMain.push(fullData)
                    });

                    // assign main Value
                    fullDD.content[3].table.body = pushToMain;
                    setDD(fullDD);
                    
                    const resDataConst = response.data;
                    const setXL = [];

                    const setHeders = {
                        'Sr': 'Sr',
                        'Rep Date': 'Rep Date',
                        'Bank': 'Bank',
                        'Branch': 'Branch',
                        'Customer Name': 'Customer Name',
                        'Aps No': 'Aps No',
                        'Bank Ref No': 'Bank Ref No',
                        'Seller Name': 'Seller Name',
                        'Phone No': 'Phone No',
                        'Prepared By': 'Prepared By',
                        'Type': 'Type',
                        'Address': 'Address',
                        'Roof Right': 'Roof Right',
                        'Receipt Date': 'Receipt Date',
                        'Sent On': 'Sent On',
                        'Status': 'Status',
                        'Remarks': 'Remarks',
                    };
                    setXL.push(setHeders)

                    resDataConst.forEach((row, index) => {
                        const setXLSX = {
                            'Sr': index + 1,
                            'Rep Date': row.reportDate ? moment(row.reportDate).format('DD-MM-YYYY') : '',
                            'Bank': row?.bankName?.name,
                            'Branch': row?.branchName?.name,
                            'Customer Name': row.customerBorrower,
                            'Aps No': row.apsNo,
                            'Ref No': row.refNo,
                            'Seller Name': row.uid,
                            'Phone No': row.phoneNo,
                            'Prepared By': row?.preparedByName?.name,
                            'Type': row?.type?.name,
                            'Address': row.streetSectorLocal,
                            'Roof Right': row.roofRight,
                            'Receipt Date': row.reciptDate,
                            'Sent On': row.reportSentOn,
                            'Status': row.status,
                            'Remarks': row.remarks,
                        }

                        setXL.push(setXLSX)
                    })                    
                    setResData(setXL)
                    setIsLoading(false);
                    
                }).catch((error) => {
                    console.log(error);
                });
        }
        catch (err) {
            console.log(err)
        }
    }, [dd, dd.content, paramsData]);
    const [isLoading, setIsLoading] = useState(true);

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
