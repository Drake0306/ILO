/* eslint-disable dot-notation */
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

export default function PDFRenderLoanRegistrationCaseHandledBy (props) {
    const ref = React.createRef();
    const params = useParams()
    const [paramsData, setParamsData] = useState(params.data && JSON.parse(decodeURI(params.data)));
    const [resData, setResData] = useState([]);
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const [dd, setDD] = useState({
        pageOrientation: 'landscape',
        pageSize: 'A4',
        pageMargins: [ 5, 10, 40, 10 ],
        content: [
            {text: 'INTELLECTIVE LAW OFFICES', style: 'header'},
            {text: 'Advicates, Legal Advisers & Consultants', style: 'headerSub'},
            {text: `Loan Taken Over Register:-                                                                                  Date As on: ${moment().format('DD-MM-YYYY')}`, style: 'subheader'},
            {
                style: 'tableExample',
                table: {
                    body: [
                        [
                            {text: 'Sr', style: 'tableHeaderMain'}, 
                            {text:'Bank', style: 'tableHeaderMain'}, 
                            {text:'Regn Date', style: 'tableHeaderMain'}, 
                            {text:'App No', style: 'tableHeaderMain'}, 
                            // {text:'Seller', style: 'tableHeaderMain'}, 
                            // {text:'Purchase Details', style: 'tableHeaderMain'}, 
                            // {text:'Reg Off', style: 'tableHeaderMain'}, 
                            // {text:'Rec No', style: 'tableHeaderMain'}, 
                            {text:'Property', style: 'tableHeaderMain'}, 
                            // {text:'R.D Sent', style: 'tableHeaderMain'}, 
                            // {text:'T.D Sent', style: 'tableHeaderMain'}, 
                            // {text:'S.D Sent', style: 'tableHeaderMain'}, 
                            // {text:'Courior Date', style: 'tableHeaderMain'}, 
                            {text:'Remark', style: 'tableHeaderMain'}, 
                            {text:'Other remark', style: 'tableHeaderMain'}
                        ],
    
                        []
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

    const exportToExcel = async () => {
        const {from, to} = paramsData;
        const Datetitle = [{"Sl No" : `FROM : ${moment(from).format('DD-MM-YYYY')} | TO : ${moment(to).format('DD-MM-YYYY')}`}];
        const emptyRow0 = [{"Sl No" : ''}]; // Empty row to skip a line
        // Prepare the title row
        const title = [{"Sl No" : 'Export INTELLECTIVE LAW OFFICES | Advicates, Legal Advisers & Consultants'}];
        const emptyRow = [{"Sl No" : ''}]; // Empty row to skip a line

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
            { wch: 10 }, // Sl No
            { wch: 20 }, // Bank
            { wch: 15 }, // Date
            { wch: 25 }, // Application number
            { wch: 30 }, // Property details
            { wch: 30 }, // Remarks
            { wch: 30 }, // Other remarks
        ];
        ws['!cols'] = colWidths;

        // Generate Excel file
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, `Export INTELLECTIVE LAW OFFICES Loan Registration Case Handled By${fileExtension}`);
    }

    const exportToPdf = (value) => {
        pdfMake.createPdf(value).open();
    }

    useEffect(() => {

        // ADD TO ROW FOR THE PDF
        const tableHeadder = [];
        tableHeadder.push(dd.content[3].table.body[0]);
        console.log('1',dd)
        const fullDD = dd;
        let fullData = [];
        const pushToMain = tableHeadder;
        try {
            axios.post(`${JSON_CONST.DB_URL}disbursal/registrationBTGlobalREport`, paramsData)
                .then((response) => {
                    console.log(response);
                    response.data.forEach((row) => {
                        fullData = [];
                        // Push to Temp
                        fullData.push({text: row?.id, style: 'tableHeader'})
                        fullData.push({text: row?.bankName?.name, style: 'tableHeader'})
                        fullData.push({text: moment(row?.registrationDate).format('DD-MM-YYYY'), style: 'tableHeader'})
                        fullData.push({text: row?.applicationNo, style: 'tableHeader'})
                        // fullData.push({text: row?.seller, style: 'tableHeader'})
                        // fullData.push({text: row?.purchaser, style: 'tableHeader'})
                        // fullData.push({text: row?.registrarOffName?.name, style: 'tableHeader'})
                        // fullData.push({text: row?.reciptNo, style: 'tableHeader'})
                        fullData.push({text: row?.propertyDetails, style: 'tableHeader'})
                        // fullData.push({text: row?.rdSentOn && moment(row?.rdSentOn).format('DD-MM-YYYY'), style: 'tableHeader'})
                        // fullData.push({text: row?.tdSentOn && moment(row?.tdSentOn).format('DD-MM-YYYY'), style: 'tableHeader'})
                        // fullData.push({text: row?.sdSentOn && moment(row?.sdSentOn).format('DD-MM-YYYY'), style: 'tableHeader'})
                        // fullData.push({text: row?.courierDate && moment(row?.courierDate).format('DD-MM-YYYY'), style: 'tableHeader'})
                        fullData.push({text: row?.remarksName?.name, style: 'tableHeader'})
                        fullData.push({text: row?.otherRemarkIfAny, style: 'tableHeader'})

                        // Push To Main
                        pushToMain.push(fullData)
                    });

                    // assign main Value
                    fullDD.content[3].table.body = pushToMain;
                    setDD(fullDD);

                    const resDataConst = response.data;
                    const setXL = [];

                    const setHeders = {
                        'Sl No': 'Sl No',
                        'Bank ': 'Bank ',
                        'Date': 'Date',
                        'Application number': 'Application number',
                        'Property details': 'Property details',
                        'Remarks': 'Remarks',
                        'Other remarks': 'Other remarks',
                    };
                    setXL.push(setHeders)

                    resDataConst.forEach((row, index) => {
                        const setXLSX = {
                            'Sl No': index + 1,
                            'Bank ': row?.bankName?.name,
                            'Date': row.registrationDate ? moment(row.registrationDate).format('DD-MM-YYYY') : '',
                            'Application number': row.applicationNo,
                            'Property details': row.propertyDetails,
                            'Remarks': row?.remarksName?.name,
                            'Other remarks': row.otherRemarkIfAny,
                        }

                        setXL.push(setXLSX)
                    })                    
                    setResData(setXL)
                    
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
