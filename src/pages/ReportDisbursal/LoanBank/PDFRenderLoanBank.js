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
import Loader from '../../Loader/Loader';

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

export default function PDFRenderLoanBank (props) {
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
            {text: 'INTELLECTIVE LAW OFFICES', style: 'header'},
            {text: 'Advicates, Legal Advisers & Consultants', style: 'headerSub'},
            {text: `Loan Taken Over Report:-                                                                                  Date As on: ${moment().format('DD-MM-YYYY')}`, style: 'subheader'},
            {
                style: 'tableExample',

                table: {
                    body: [
                        [
                            {text: 'Sl No', style: 'tableHeaderMain'}, 
                            {text: 'Date', style: 'tableHeaderMain'}, 
                            {text: 'Bank', style: 'tableHeaderMain'}, 
                            {text: 'Branch', style: 'tableHeaderMain'}, 
                            {text:'App no', style: 'tableHeaderMain'}, 
                            {text:'Customer', style: 'tableHeaderMain'}, 
                            {text: 'Phone', style: 'tableHeaderMain'}, 
                            {text: 'Property details', style: 'tableHeaderMain'}, 
                            {text:'Take Over', style: 'tableHeaderMain'}, 
                            {text:'Handled by', style: 'tableHeaderMain'}, 
                            {text:'Transaction number', style: 'tableHeaderMain'}, 
                            {text:'Doc Sent To Bank', style: 'tableHeaderMain'}, 
                            {text:'Remark', style: 'tableHeaderMain'}, 
                            {text:'Other remark', style: 'tableHeaderMain'},
                            {text:'Next follow up date', style: 'tableHeaderMain'},
                            {text:'Status', style: 'tableHeaderMain'},
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
                fontSize: 6,
                color: 'black'
            },
            headerSub: {
                fontSize: 16,
                alignment: 'center'
            },
            tableHeaderMain: {
                bold: true,
                fontSize: 10,
                color: 'black',
                margin: [0, 0, 0, 0],
            },
        },
        defaultStyle: {
            // alignment: 'justify'
        }
        
    });

    const exportToExcel = async () => {
        // Prepare the title row
        const title = [['Export INTELLECTIVE LAW OFFICES | Advicates, Legal Advisers & Consultants']];
        const emptyRow = [['']]; // Empty row to skip a line

        const dataXLSX = [...title, ...emptyRow, ...resData];

        // Create worksheet and workbook
        const ws = XLSX.utils.json_to_sheet(dataXLSX, { skipHeader: true });
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        // Merge cells for the title
        // ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 20 } }];

        // Set title row style to bold
        // eslint-disable-next-line dot-notation
        ws['A1'].s = { font: { bold: true } };

        // Set column widths
        const colWidths = [
            { wch: 10 }, // Sl No
            { wch: 15 }, // Date
            { wch: 20 }, // Bank
            { wch: 20 }, // Branch
            { wch: 25 }, // Application number
            { wch: 25 }, // Customer name
            { wch: 15 }, // Phone number
            { wch: 30 }, // Property details
            { wch: 20 }, // Loan taken over
            { wch: 20 }, // Handled by
            { wch: 25 }, // Transaction number
            { wch: 20 }, // Document receive on
            { wch: 20 }, // Document sent on
            { wch: 20 }, // Document sent at
            { wch: 15 }, // Case close
            { wch: 20 }, // Case close date
            { wch: 25 }, // Acknowledgment received
            { wch: 20 }, // Volume number
            { wch: 20 }, // Serial number
            { wch: 30 }, // Remarks
            { wch: 30 }, // Other remarks
            { wch: 20 }, // Next follow up date
            { wch: 15 }  // Status
        ];
        ws['!cols'] = colWidths;

        // Generate Excel file
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, `Export INTELLECTIVE LAW OFFICES Loan Taken Over Report${fileExtension}`);
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

        const addLineBreaks = (str) => {
            let result = '';
            if(str) {
                while (str.length > 0) {
                    result += `${str.substring(0, 12)  }\n`;
                    str = str.substring(10);
                }
                return result.trim();
            }
        };


        const pushToMain = tableHeadder;
        setIsLoading(true);
        try {
            axios.post(`${JSON_CONST.DB_URL}disbursal/registrationBTGlobalREport`, paramsData)
                .then((response) => {
                    console.log(response);
                    response.data.forEach((row, innerIndex) => {
                        fullData = [];
                        // Push to Temp
                        fullData.push({text: innerIndex + 1, style: 'tableHeader'})
                        fullData.push({text: row.registrationDate ? moment(row.registrationDate).format('DD-MM-YYYY') : '', style: 'tableHeader'})
                        fullData.push({text: row?.bankName?.name, style: 'tableHeader'})
                        fullData.push({text: row?.branchName?.name, style: 'tableHeader'})
                        fullData.push({text: addLineBreaks(row?.applicationNo), style: 'tableHeader'})
                        fullData.push({text: row?.customerName, style: 'tableHeader'})
                        fullData.push({text: row?.phoneNo, style: 'tableHeader'})
                        fullData.push({text: row?.propertyDetails, style: 'tableHeader'})
                        fullData.push({text: row?.loanTakenFrom, style: 'tableHeader'})
                        fullData.push({text: row?.handledByName?.name, style: 'tableHeader'})
                        fullData.push({text: row?.id && moment(row?.docSentToBankDate).format('DD-MM-YYYY'), style: 'tableHeader'})
                        fullData.push({text: row?.docSentToBankDate && moment(row?.docSentToBankDate).format('DD-MM-YYYY'), style: 'tableHeader'})
                        fullData.push({text: row?.remarksName?.name, style: 'tableHeader'})
                        fullData.push({text: row?.otherRemarkIfAny, style: 'tableHeader'})
                        fullData.push({text: row?.nextDate, style: 'tableHeader'})
                        fullData.push({text: row?.statusValue, style: 'tableHeader'})

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
                        'Date': 'Date',
                        'Bank ': 'Bank ',
                        'Branch': 'Branch',
                        'Application number': 'Application number',
                        'Customer name': 'Customer name',
                        'Phone number': 'Phone number',
                        'Property details': 'Property details',
                        'Loan taken over': 'Loan taken over',
                        'Handled by': 'Handled by',
                        'Transaction number': 'Transaction number',
                        'Document receive on': 'Document receive on',
                        'Document sent on': 'Document sent on',
                        'Document sent at': 'Document sent at',
                        'Case close': 'Case close',
                        'Case close date': 'Case close date',
                        'Acknowledgment received': 'Acknowledgment received',
                        'Volume number': 'Volume number',
                        'Serial number': 'Serial number',
                        'Remarks': 'Remarks',
                        'Other remarks': 'Other remarks',
                        'Next follow up date': 'Next follow up date',
                        'Status': 'Status'
                    };
                    setXL.push(setHeders)

                    resDataConst.forEach((row, index) => {
                        const setXLSX = {
                            'Sl No': index + 1,
                            'Date': row.registrationDate ? moment(row.registrationDate).format('DD-MM-YYYY') : '',
                            'Bank ': row?.bankName?.name,
                            'Branch': row?.branchName?.name,
                            'Application number': row.applicationNo,
                            'Customer name': row.customerName,
                            'Phone number': row.phoneNo,
                            'Property details': row.propertyDetails,
                            'Loan taken over': row.loanTakenFrom,
                            'Handled by': row?.handledByName?.name,
                            'Transaction number': row.id,
                            'Document receive on': row.collectionDate ? moment(row.collectionDate).format('DD-MM-YYYY') : '',
                            'Document sent on': row.docSentToBankDate ? moment(row.docSentToBankDate).format('DD-MM-YYYY') : '',
                            'Document sent at': row.sentAt,
                            'Case close': row.caseCloseVal,
                            'Case close date': row.caseClose ? moment(row.caseClose).format('DD-MM-YYYY') : '',
                            'Acknowledgment received': row?.ackRecived,
                            'Volume number': row.volNo,
                            'Serial number': row.slNo,
                            'Remarks': row?.remarksName?.name,
                            'Other remarks': row.otherRemarkIfAny,
                            'Next follow up date': row.nextDate ? moment(row.nextDate).format('DD-MM-YYYY') : '',
                            'Status': row.statusValue,
                        }

                        setXL.push(setXLSX)
                    })                    
                    setResData(setXL)
                    setIsLoading(false);
                    
                }).catch((error) => {
                    setIsLoading(false);
                    console.log(error);
                });
        }
        catch (err) {
            setIsLoading(false);
            console.log(err)
        }
    }, [dd, dd.content, paramsData]);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading ? (
                    <Loader />
                ) : (
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
            )}
        </>
    )
}
