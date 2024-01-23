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
        try {
            axios.post(`${JSON_CONST.DB_URL}depositOfPayment/registrationGlobalREport`, paramsData)
                .then((response) => {
                    console.log(response);
                    response.data.forEach((row) => {
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
                        fullData.push({text: row?.id, style: 'tableHeaderAppNo'})
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
                    console.log('pushToMain', pushToMain);
                    console.log('fullData', fullData);
                    console.log('dd 2 ', dd);

                    setResData(response.data)
                    
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

            <center mt={5}>
                <LoadingButton size="large" type="button" onClick={(e) => exportToPdf(dd)} variant="contained" color="error" > EXPORT PDF </LoadingButton>
                &nbsp; &nbsp;&nbsp;
                <LoadingButton size="large" type="button" onClick={(e) => exportToExcel(e)} variant="contained" color="success" > EXPORT XLSX </LoadingButton>
                <br/>
            </center>
        </>
    )
}
