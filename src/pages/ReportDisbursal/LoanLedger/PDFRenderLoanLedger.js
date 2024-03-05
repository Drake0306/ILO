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

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import JSON_CONST from '../../../components/CONSTVALUE.json';
import Loader from '../../Loader/Loader';

const ref = React.createRef();

// Register fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function PDFRenderLoanLedger (props) {
    const ref = React.createRef();
    const params = useParams()
    const [paramsData, setParamsData] = useState(params.data && JSON.parse(decodeURI(params.data)));
    const [resData, setResData] = useState([]);
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const [dd, setDD] = useState({
        pageOrientation: 'landscape',
        pageSize: 'A4',
        pageMargins: [ 10, 10, 40, 10 ],
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
                            {text:'Take Over', style: 'tableHeaderMain'}, 
                            {text:'App no', style: 'tableHeaderMain'}, 
                            // {text:'DSA', style: 'tableHeaderMain'}, 
                            {text:'Customer', style: 'tableHeaderMain'}, 
                            {text:'Take Over From', style: 'tableHeaderMain'}, 
                            {text:'Property', style: 'tableHeaderMain'}, 
                            {text:'Coll Date', style: 'tableHeaderMain'}, 
                            {text:'Doc Sent', style: 'tableHeaderMain'}, 
                            {text:'Handled By', style: 'tableHeaderMain'}, 
                            // {text:'Amount', style: 'tableHeaderMain'}, 
                            // {text:'Chq Date', style: 'tableHeaderMain'}, 
                            // {text:'Chq Rev', style: 'tableHeaderMain'}, 
                            // {text:'Chq Return', style: 'tableHeaderMain'}, 
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
        const ws = XLSX.utils.json_to_sheet(resData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType : 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, `Export${fileExtension}`);
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
                    console.log(response);
                    response.data.forEach((row) => {
                        fullData = [];
                        // Push to Temp
                        fullData.push({text: row?.id, style: 'tableHeader'})
                        fullData.push({text: row?.loanTakenFrom, style: 'tableHeader'})
                        fullData.push({text: row?.applicationNo, style: 'tableHeader'})
                        // fullData.push({text: row?.dsaName?.name, style: 'tableHeader'})
                        fullData.push({text: row?.customerName, style: 'tableHeader'})
                        fullData.push({text: row?.loanTakenFrom, style: 'tableHeader'})
                        fullData.push({text: row?.propertyDetails, style: 'tableHeader'})
                        fullData.push({text: row?.collectionDate && moment(row?.collectionDate).format('DD-MM-YYYY'), style: 'tableHeader'})
                        fullData.push({text: row?.docSentToBankDate && moment(row?.docSentToBankDate).format('DD-MM-YYYY'), style: 'tableHeader'})
                        fullData.push({text: row?.handledByName?.name, style: 'tableHeader'})
                        // fullData.push({text: row?.amount, style: 'tableHeader'})
                        // fullData.push({text: row?.chequeDate && moment(row?.chequeDate).format('DD-MM-YYYY'), style: 'tableHeader'})
                        // fullData.push({text: row?.chequeReceivedDate && moment(row?.chequeReceivedDate).format('DD-MM-YYYY'), style: 'tableHeader'})
                        // fullData.push({text: row?.chequeReturnDate && moment(row?.chequeReturnDate).format('DD-MM-YYYY'), style: 'tableHeader'})
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
                    console.log(error);
                    setIsLoading(false);
                });
        }
        catch (err) {
            console.log(err)
            setIsLoading(false);
        }
    }, [dd, dd.content, paramsData]);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>  
            {isLoading ? (
                    <Loader />
                ) : (
                    <center mt={5}>
                        <LoadingButton size="large" type="button" onClick={(e) => exportToPdf(dd)} variant="contained" color="error" > EXPORT PDF </LoadingButton>
                        &nbsp; &nbsp;&nbsp;
                        <LoadingButton size="large" type="button" onClick={(e) => exportToExcel(e)} variant="contained" color="success" > EXPORT XLSX </LoadingButton>
                        <br/>
                    </center>
            )}
        </>
    )
}
