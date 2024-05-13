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

export default function PDFRenderRegistrationLedger (props) {
    const ref = React.createRef();
    const params = useParams()
    const [paramsData, setParamsData] = useState(params.data && JSON.parse(decodeURI(params.data)));
    const [resData, setResData] = useState([]);
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const [dd, setDD] = useState({
        pageOrientation: 'landscape',
        pageSize: 'A4',
        pageMargins: [ 10, 10, 10, 10 ],
        content: [
            {text: 'INTELLECTIVE LAW OFFICES', style: 'header'},
            {text: 'Advicates, Legal Advisers & Consultants', style: 'headerSub'},
            {text: `Registration Ledger Wise Report:-                                                                                  Date As on: ${moment().format('DD-MM-YYYY')}`, style: 'subheader'},
            {
                style: 'tableExample',
                table: {
                    body: [
                        [
                            {text: 'Sr', style: 'tableHeaderMain'}, 
                            {text:'Bank', style: 'tableHeaderMain'}, 
                            {text:'Reg Date', style: 'tableHeaderMain'}, 
                            {text:'App no', style: 'tableHeaderMain'}, 
                            {text:'Seller', style: 'tableHeaderMain'}, 
                            {text:'Property Details', style: 'tableHeaderMain'}, 
                            {text:'Reg Off', style: 'tableHeaderMain'}, 
                            {text:'Property', style: 'tableHeaderMain'}, 
                            {text:'Next Follow Up Date', style: 'tableHeaderMain'}, 
                            {text:'R.D Sent', style: 'tableHeaderMain'}, 
                            {text:'T.D Sent', style: 'tableHeaderMain'}, 
                            {text:'Courior Date', style: 'tableHeaderMain'},
                            {text: 'SL', style: 'tableHeaderMain'}, 
                            {text: 'Vol No', style: 'tableHeaderMain'},  
                            {text:'Remarks', style: 'tableHeaderMain'}, 
                            {text:'Ack', style: 'tableHeaderMain'},
                            {text:'Other remark', style: 'tableHeaderMain'},
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
                fontSize: 7,
                color: 'black',
                margin: [0, 0, 0, 0],
            },
            tableHeaderMain: {
                bold: true,
                fontSize: 10,
                color: 'black',
                margin: [0, 0, 0, 0],
            },
            headerSub: {
                fontSize: 16,
                alignment: 'center'
            },
            tableHeaderAppNo: {
                fontSize: 6,
                color: 'black',
                margin: [0, 0, 0, 0],
            },
        },
        defaultStyle: {
            // alignment: 'justify'
        }
        
    });

    const exportToExcel = async () => {
        const dataXLSX = resData;
        const ws = XLSX.utils.json_to_sheet(dataXLSX);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType : 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, `Export INTELLECTIVE LAW OFFICES Registration Ledger Wise Report${fileExtension}`);
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
        setIsLoading(true);
        try {
            axios.post(`${JSON_CONST.DB_URL}disbursal/registrationBTGlobalREport`, paramsData)
                .then((response) => {
                    console.log('##',response.data);
                    response.data.forEach((row, index) => {
                        fullData = [];

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
                        
                        const addLineBreaksMore = (str) => {
                            let result = '';
                            while (str.length > 0) {
                                result += `${str.substring(0, 20)  }\n`;
                                str = str.substring(10);
                            }
                            return result.trim();
                        };

                        const rearrangeDates = (str) => {
                            if(str){
                                const originalDate = str;
                                const parts = originalDate.split('-');
                                const rearrangedDate = `${parts[1]}-${parts[2]}-${parts[0]}`;
                                return rearrangedDate;
                            }
                        };

                        


                        // Push to Temp
                        fullData.push({text: index + 1, style: 'tableHeader'})
                        fullData.push({text: row?.bankName.name, style: 'tableHeader'})
                        fullData.push({text: row?.registrationDate && moment(row?.registrationDate).format('DD-MM-YYYY'), style: 'tableHeader'})
                        fullData.push({text: addLineBreaks(row?.applicationNo), style: 'tableHeaderAppNo'})
                        fullData.push({text: row?.seller, style: 'tableHeader'})
                        fullData.push({text: row?.purchaser, style: 'tableHeader'})
                        fullData.push({text: row?.registrarOffName?.name, style: 'tableHeader'})
                        fullData.push({text: row?.propertyDetails, style: 'tableHeaderAppNo'})
                        fullData.push({text: row?.rdSentOn && moment(row?.rdSentOn).format('DD-MM-YYYY'), style: 'tableHeader'})
                        fullData.push({text: row?.nextDate && moment(row?.nextDate).format('DD-MM-YYYY'), style: 'tableHeader'})
                        fullData.push({text: row?.tdSentOn && moment(row?.tdSentOn).format('DD-MM-YYYY'), style: 'tableHeader'})
                        fullData.push({text: rearrangeDates(row?.courierDate), style: 'tableHeader'})
                        fullData.push({text: row?.slNo, style: 'tableHeaderAppNo'})
                        fullData.push({text: row?.volNo, style: 'tableHeaderAppNo'})
                        fullData.push({text: row?.remarksName?.name, style: 'tableHeader'})
                        fullData.push({text: addLineBreaks(row?.ackRecived), style: 'tableHeaderAppNo'})
                        fullData.push({text: addLineBreaks(row?.otherRemarkIfAny), style: 'tableHeaderAppNo'})
                        fullData.push({text: row?.statusValue, style: 'tableHeaderAppNo'})
                        // Push To Main
                        pushToMain.push(fullData)
                    });

                    // assign main Value
                    fullDD.content[3].table.body = pushToMain;
                    setDD(fullDD);
                    
                    const resDataConst = response.data;
                    const setXL = [];
                    resDataConst.forEach((row, index) => {
                        const setXLSX = {
                            'S.NO': index + 1,
                            'REGN DATE': row.registrationDate ? moment(row.registrationDate).format('DD-MM-YYYY') : '',
                            'BANK': row?.bankName?.name,
                            'BRANCH': row?.branchName?.name,
                            'APPLICATION NO': row.applicationNo,
                            'SELLER': row.seller,
                            'SELLER PHONE NO': row.phone,
                            'PURCHASER': row.purchaser,
                            'PURCHASER PHONE NO': row.phoneMobile,
                            'PROPERTY DETAILS': row.propertyDetails,
                            'REGISTRAR OFFICE': row?.registrarOffName?.name,
                            'DEED WRITER': row.deedWriterAdv,
                            'BUILDER OFFICE': row.address,
                            'HANDLED BY/EXECUTIVE NAME': row?.handledByName?.name,
                            'TRANSACTIN NO': row.id,
                            'ROOT DOCS SENT ON': row.rdSentOn ? moment(row.rdSentOn).format('DD-MM-YYYY') : '',
                            'SALE DEED SENT AT': row.sentAt ? moment(row.sentAt).format('DD-MM-YYYY') : '',
                            'CASE CLOSED -YES/NO': row.caseCloseVal,
                            'CASE CLOSED DATE': row.caseClosed ? moment(row.caseClosed).format('DD-MM-YYYY') : '',
                            'ACKNOWLEDGEMENT': row.ack,
                            'REMARKS': row?.remarksName?.name,
                            'OTHER REMARKS': row.remarks,
                            'NEXT FOLLOW UP DATE': row.nextDate ? moment(row.nextDate).format('DD-MM-YYYY') : '',
                            'STATUS': row.statusValue,
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

    // Loader
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>  {isLoading ? (
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
