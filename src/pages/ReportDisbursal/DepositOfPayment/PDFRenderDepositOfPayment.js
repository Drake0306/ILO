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

export default function PDFRenderDepositOfPayment (props) {
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
            {text: `Deposit Of Payment Wise Report:-                                                                                  Date As on: ${moment().format('DD-MM-YYYY')}`, style: 'subheader'},
            {
                style: 'tableExample',
                table: {
                    body: [
                        [
                            {text: 'Sr', style: 'tableHeaderMain'}, 
                            {text:'Transection No', style: 'tableHeaderMain'}, 
                            {text:'Receipt Date', style: 'tableHeaderMain'}, 
                            {text: 'Bank APS NO', style: 'tableHeaderMain'}, 
                            {text: 'Customer Name', style: 'tableHeaderMain'}, 
                            {text:'Phone', style: 'tableHeaderMain'}, 
                            {text:'Address', style: 'tableHeaderMain'}, 
                            {text:'Builder', style: 'tableHeaderMain'}, 
                            {text:'Executive', style: 'tableHeaderMain'}, 
                            {text:'Date of Deposit', style: 'tableHeaderMain'}, 
                            {text:'Ack Received', style: 'tableHeaderMain'}, 
                            {text:'Ack Filed', style: 'tableHeaderMain'}, 
                            {text:'Status', style: 'tableHeaderMain'},
                            {text:'Remark', style: 'tableHeaderMain'}
                        ],
    
                        [
                            {text: 'OK', style: 'tableHeader'},
                            {text: 'OK', style: 'tableHeader'},
                            {text: 'OK', style: 'tableHeader'},
                            {text: 'OK', style: 'tableHeader'},
                            {text: 'OK', style: 'tableHeader'},
                            {text: 'OK', style: 'tableHeader'},
                            {text: 'OK', style: 'tableHeader'},
                            {text: 'OK', style: 'tableHeader'},
                            {text: 'OK', style: 'tableHeader'},
                            {text: 'OK', style: 'tableHeader'},
                            {text: 'OK', style: 'tableHeader'},
                            {text: 'OK', style: 'tableHeader'},
                            {text: 'OK', style: 'tableHeader'},
                        ]
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
                fontSize: 8,
                color: 'black',
                margin: [0, 0, 0, 0],
            },
            tableHeaderMain: {
                bold: true,
                fontSize: 10,
                color: 'black',
                margin: [0, 0, 0, 0],
            },
            tableHeaderAppNo: {
                fontSize: 6,
                color: 'black',
                margin: [0, 0, 0, 0],
            },
            tableHeaderAppNoWidth: {
                fontSize: 6,
                // maxWidth: '50px',
                color: 'black',
                margin: [0, 0, -5, 0],
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
            axios.post(`${JSON_CONST.DB_URL}depositOfPayment/registrationGlobalREport`, paramsData)
                .then((response) => {
                    console.log(response);
                    response.data.forEach((row, index) => {
                        fullData = [];

                        const addLineBreaks = (str) => {
                            let result = '';
                            while (str.length > 0) {
                                result += `${str.substring(0, 35)  }\n`;
                                str = str.substring(10);
                            }
                            return result.trim();
                        };

                        // Push to Temp
                        fullData.push({text: index + 1, style: 'tableHeaderAppNo'})
                        fullData.push({text: row.id, style: 'tableHeaderAppNo'})
                        fullData.push({text: moment(row?.reciptDate).format('DD-MM-YYYY'), style: 'tableHeader'})
                        fullData.push({text: row?.refNo, style: 'tableHeaderAppNo'})
                        fullData.push({text: row?.bankName?.name, style: 'tableHeaderAppNo'})
                        fullData.push({text: row?.phoneNo, style: 'tableHeaderAppNo'})
                        fullData.push({text: addLineBreaks(row?.address), style: 'tableHeaderAppNo'})
                        fullData.push({text: addLineBreaks(row?.builderName), style: 'tableHeaderAppNo'})
                        fullData.push({text: row?.handledByName?.name, style: 'tableHeaderAppNo'})
                        fullData.push({text: moment(row?.DateofDeposit).format('DD-MM-YYYY'), style: 'tableHeader'})
                        fullData.push({text: row?.AckReceived, style: 'tableHeaderAppNo'})
                        fullData.push({text: addLineBreaks(row?.AckFiled), style: 'tableHeaderAppNo'})
                        fullData.push({text: row?.statusValue, style: 'tableHeaderAppNo'})
                        fullData.push({text: addLineBreaks(row?.remarks), style: 'tableHeaderAppNo'})

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
                            'Transection No': row.id,
                            'Receipt date': row.reciptDate ? moment(row.reciptDate).format('DD-MM-YYYY') : '',
                            'Bank Ref': row.refNo,
                            'Bank ': row?.bankName?.name,
                            'Branch': row?.branchName?.name,
                            'Customer name': row.customerBorrower,
                            'Payment details': row.paymentDetails,
                            'Property Address': row.address,
                            'Builder name': row.builderName,
                            'Phone No': row.phoneNo,
                            'Executive Name': row?.handledByName?.name,
                            'Date of Deposit': row.DateofDeposit ? moment(row.DateofDeposit).format('DD-MM-YYYY') : '',
                            'Receipt Particulars': row.Receiptparticulars,
                            'Date receipt sent to Bank': row.dateReceiptSentToBank ? moment(row.dateReceiptSentToBank).format('DD-MM-YYYY') : '',
                            'Case close': row.CaseClosed,
                            'Acknowledgment received': row.AckReceived,
                            'Acknowledgment': row.AckFiled,
                            'Status': row.statusValue,
                            'Volume number': row.volNo,
                            'Serial number': row.sn,
                            'Remarks': row.remarks,
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
