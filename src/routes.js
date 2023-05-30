import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Master from './pages/master';
import MasterList from './pages/master/MasterList';

import RegistrarOffice from './pages/master/RegistrarOffice/RegistrarOffice';
import EntryFormRO from './pages/master/RegistrarOffice/EntryForm';
import HandledBy from './pages/master/HandledBy/HandledBy';
import EntryFormHB from './pages/master/HandledBy/EntryForm';
import Del from './pages/master/Del/Del';
import EntryFormD from './pages/master/Del/EntryForm';
import Remarks from './pages/master/Remarks/Remarks';
import EntryFormR from './pages/master/Remarks/EntryForm';
import Bank from './pages/master/Bank/Bank';
import EntryFormB from './pages/master/Bank/EntryForm';
import DSA from './pages/master/Dsa/Dsa';
import EntryFormDSA from './pages/master/Dsa/EntryForm';
import Branch from './pages/master/Branch/Branch';
import EntryFormBR from './pages/master/Branch/EntryForm';
import Fee from './pages/master/Fee/Fee';
import EntryFormFEE from './pages/master/Fee/EntryForm';

import BuilderPayment from './pages/BuilderPayment/BuilderPayment';
import EntryFormBF from './pages/BuilderPayment/EntryForm';

import OptionList from './pages/Option/OptionList';
import PrepareReports from './pages/Option/PrepareReports/PrepareReports';
import EntryFormPR from './pages/Option/PrepareReports/EntryForm';
import DuDupe from './pages/Option/DeDupe/DeDupe';

import DisbursalList from './pages/Disbursal/DisbursalList';
import Registration from './pages/Disbursal/Registration/Registration';
import ListRegistration from './pages/Disbursal/Registration/ListRegistration';
import BT from './pages/Disbursal/BT/BT';
import ListBT from './pages/Disbursal/BT/ListBT';

import BillList from './pages/Bill/BillList';
import ProfessionalFee from './pages/Bill/ProfessionalFee/ProfessionalFee';
import PDFRenderBill from './pages/Bill/ProfessionalFee/PDFRenderBill';
import PDFRenderSupportings from './pages/Bill/ProfessionalFee/PDFRenderSupportings';
import Expenses from './pages/Bill/Expenses/Expenses';
import PDFRenderBillExpenses from './pages/Bill/Expenses/PDFRenderBillExpenses';
import PDFRenderSupportingsExpenses from './pages/Bill/Expenses/PDFRenderSupportingsExpenses';

import ReportBuilderPayList from './pages/ReportBuilderPay/ReportBuilderPayList';
import ExecutiveWiseMISReport from './pages/ReportBuilderPay/ExecutiveWiseMISReport/ExecutiveWiseMISReport';
import PDFRenderExecutiveWiseMISReport from './pages/ReportBuilderPay/ExecutiveWiseMISReport/PDFRenderExecutiveWiseMISReport';
import PaymentLedger from './pages/ReportBuilderPay/PaymentLedger/PaymentLedger';
import PDFRenderPaymentLedger from './pages/ReportBuilderPay/PaymentLedger/PDFRenderPaymentLedger';

import ReportOpinionList from './pages/ReportOpinion/ReportOpinionList';
import BankWiseMISReport from './pages/ReportOpinion/BankWiseMISReport/BankWiseMISReport';
import PDFRenderBankWiseMISReport from './pages/ReportOpinion/BankWiseMISReport/PDFRenderBankWiseMISReport';
import StatusWiseMISReport from './pages/ReportOpinion/StatusWiseMISReport/StatusWiseMISReport';
import PDFRenderStatusWiseMISReport from './pages/ReportOpinion/StatusWiseMISReport/PDFRenderStatusWiseMISReport';
import ExecutiveWiseReport from './pages/ReportOpinion/ExecutiveWiseMISReport/ExecutiveWiseMISReport';
import PDFRenderExecutiveWiseMISReportTwo from './pages/ReportOpinion/ExecutiveWiseMISReport/PDFRenderExecutiveWiseMISReportTwo';
import TypeWiseMISReport from './pages/ReportOpinion/TypeWiseMISReport/TypeWiseMISReport';
import PDFRenderTypeWiseMISReport from './pages/ReportOpinion/TypeWiseMISReport/PDFRenderTypeWiseMISReport';

import ReportDisbursalList from './pages/ReportDisbursal/ReportDisbursalList';
import RegistrationBank from './pages/ReportDisbursal/RegistrationBank/RegistrationBank';
import PDFRenderRegistrationBank from './pages/ReportDisbursal/RegistrationBank/PDFRenderRegistrationBank';
import RegistrationLedger from './pages/ReportDisbursal/RegistrationLedger/RegistrationLedger';
import PDFRenderRegistrationLedger from './pages/ReportDisbursal/RegistrationLedger/PDFRenderRegistrationLedger';
import LoanBank from './pages/ReportDisbursal/LoanBank/LoanBank';
import PDFRenderLoanBank from './pages/ReportDisbursal/LoanBank/PDFRenderLoanBank';
import LoanLedger from './pages/ReportDisbursal/LoanLedger/LoanLedger';
import PDFRenderLoanLedger from './pages/ReportDisbursal/LoanLedger/PDFRenderLoanLedger';
import PendingReport from './pages/ReportDisbursal/PendingReport/PendingReport';
import PDFRenderPendingReport from './pages/ReportDisbursal/PendingReport/PDFRenderPendingReport';
import LoanTakenOver from './pages/ReportDisbursal/LoanTakenOver/LoanTakenOver';
import PDFRenderLoanTakenOver from './pages/ReportDisbursal/LoanTakenOver/PDFRenderLoanTakenOver';
import LoanRegistrationCaseHandledBy from './pages/ReportDisbursal/LoanRegistrationCaseHandledBy/LoanRegistrationCaseHandledBy';
import PDFRenderLoanRegistrationCaseHandledBy from './pages/ReportDisbursal/LoanRegistrationCaseHandledBy/PDFRenderLoanRegistrationCaseHandledBy';
import CaseByDSAWise from './pages/ReportDisbursal/CaseByDSAWise/CaseByDSAWise';
import PDFRenderCaseByDSAWise from './pages/ReportDisbursal/CaseByDSAWise/PDFRenderCaseByDSAWise';
import CaseByDELWise from './pages/ReportDisbursal/CaseByDELWise/CaseByDELWise';
import PDFRenderCaseByDELWise from './pages/ReportDisbursal/CaseByDELWise/PDFRenderCaseByDELWise';
import CaseByRemarksWise from './pages/ReportDisbursal/CaseByRemarksWise/CaseByRemarksWise';
import PDFRenderCaseByRemarksWise from './pages/ReportDisbursal/CaseByRemarksWise/PDFRenderCaseByRemarksWise';
import DsaList from './pages/ReportDisbursal/DsaList/DsaList';
import ExutivePeformanceSummary from './pages/ReportDisbursal/ExutivePeformanceSummary/ExutivePeformanceSummary';
import PDFRenderExutivePeformanceSummary from './pages/ReportDisbursal/ExutivePeformanceSummary/PDFRenderExutivePeformanceSummary';
import AccountSummary from './pages/ReportDisbursal/AccountSummary/AccountSummary';
import PDFRenderAccountSummary from './pages/ReportDisbursal/AccountSummary/PDFRenderAccountSummary';

import MISReportList from './pages/MISReport/MISReportList';
import BankWiseMIS from './pages/MISReport/BankWiseMIS/BankWiseMIS';
import PDFRenderBankWiseMIS from './pages/MISReport/BankWiseMIS/PDFRenderBankWiseMIS';
import ExecutiveWiseMIS from './pages/MISReport/ExecutiveWiseMIS/ExecutiveWiseMIS';
import PDFRenderExecutiveWiseMIS from './pages/MISReport/ExecutiveWiseMIS/PDFRenderExecutiveWiseMIS';
import Logout from './pages/Logout';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([


    // App Start
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <DashboardApp /> }, // Dashboard Main
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },

        // Master Start
        { path: 'master', element: <MasterList /> },  // Master List

        { path: 'master/registrarOffice', element: <RegistrarOffice /> },  // Master RegistrarOffice
        { path: 'master/registrarOffice/newEntry/:data', element: <EntryFormRO /> },  // Master RegistrarOffice

        { path: 'master/handledBy', element: <HandledBy /> },  // Master HandledBy
        { path: 'master/handledBy/newEntry/:data', element: <EntryFormHB /> },  // Master HandledBy

        { path: 'master/del', element: <Del /> },  // Master del
        { path: 'master/del/newEntry/:data', element: <EntryFormD /> },  // Master del

        { path: 'master/remarks', element: <Remarks /> },  // Master remarks
        { path: 'master/remarks/newEntry/:data', element: <EntryFormR /> },  // Master remarks

        { path: 'master/bank', element: <Bank /> },  // Master bank
        { path: 'master/bank/newEntry/:data', element: <EntryFormB /> },  // Master bank

        { path: 'master/dsa', element: <DSA /> },  // Master dsa
        { path: 'master/dsa/newEntry/:data', element: <EntryFormDSA /> },  // Master dsa

        { path: 'master/branch', element: <Branch /> },  // Master branch
        { path: 'master/branch/newEntry/:data', element: <EntryFormBR /> },  // Master branch
        
        { path: 'master/fee', element: <Fee /> },  // Master fee
        { path: 'master/fee/newEntry/:data', element: <EntryFormFEE /> },  // Master fee
        // Master End

        { path: 'builerPayment', element: <BuilderPayment /> }, // BuilderPayment
        { path: 'builerPayment/newEntry/:data', element: <EntryFormBF /> }, // BuilderPayment

        // Option Start
        { path: 'option', element: <OptionList /> },  // Option List

        { path: 'option/prepareReports', element: <PrepareReports /> },  // Option Prepare Reports
        { path: 'option/prepareReports/newEntry/:data', element: <EntryFormPR /> },  // Option Prepare Reports
        { path: 'option/duDupe', element: <DuDupe /> },  // Option DuDupe

        // Option End
        
        // Disbursal Start
        { path: 'disbursal', element: <DisbursalList /> },  // Disbursal List

        { path: 'disbursal/registration/list/', element: <ListRegistration /> },  // Disbursal Registration
        { path: 'disbursal/registration/newEntry/:data', element: <Registration /> },  // Disbursal Registration
        { path: 'disbursal/bt/newEntry/:data', element: <BT /> },  // Disbursal BT
        { path: 'disbursal/bt/list/', element: <ListBT /> },  // Disbursal BT

        // Disbursal End
        
        // Bill Start
        { path: 'bill', element: <BillList /> },  // Bill List

        { path: 'bill/professionalFee/:data', element: <ProfessionalFee /> },  // Bill Registration
        { path: 'bill/professionalFee/PDFRenderBill/:data', element: <PDFRenderBill /> },  // Bill Registration
        { path: 'bill/professionalFee/PDFRenderSupportings/:data', element: <PDFRenderSupportings /> },  // Bill Registration
        { path: 'bill/expenses/:data', element: <Expenses /> },  // Bill BT
        { path: 'bill/expenses/PDFRenderBillExpenses/:data', element: <PDFRenderBillExpenses /> },  // Bill Registration
        { path: 'bill/expenses/PDFRenderSupportingsExpenses/:data', element: <PDFRenderSupportingsExpenses /> },  // Bill Registration
        // Bill End
        
        // Report Builder Start
        { path: 'reportBuilderPay', element: <ReportBuilderPayList /> },  // Bill List
        
        { path: 'reportBuilderPay/paymentLedger/:data', element: <PaymentLedger /> },  // Bill Registration
        { path: 'reportBuilderPay/paymentLedger/PDFRenderPaymentLedger/:data', element: <PDFRenderPaymentLedger /> },  // Bill Registration
        { path: 'reportBuilderPay/executiveWiseMISReport/:data', element: <ExecutiveWiseMISReport /> },  // Bill BT
        { path: 'reportBuilderPay/executiveWiseMISReport/PDFRenderExecutiveWiseMISReport/:data', element: <PDFRenderExecutiveWiseMISReport /> },  // Bill Registration
        // Report Builder End
        
        // Report (Opinion) Start
        { path: 'reportOpinion', element: <ReportOpinionList /> },  // Bill List

        { path: 'reportOpinion/bankWiseMISReport/:data', element: <BankWiseMISReport /> },  // Bill Registration
        { path: 'reportOpinion/bankWiseMISReport/PDFRenderBankWiseMISReport/:data', element: <PDFRenderBankWiseMISReport /> },  // Bill Registration
        { path: 'reportOpinion/statusWiseMISReport/:data', element: <StatusWiseMISReport /> },  // Bill BT
        { path: 'reportOpinion/statusWiseMISReport/PDFRenderStatusWiseMISReport/:data', element: <PDFRenderStatusWiseMISReport /> },  // Bill BT
        { path: 'reportOpinion/executiveWiseMisReport/:data', element: <ExecutiveWiseReport /> },  // Bill BT
        { path: 'reportOpinion/executiveWiseMisReport/PDFRenderExecutiveWiseMISReport/:data', element: <PDFRenderExecutiveWiseMISReportTwo /> },  // Bill BT
        { path: 'reportOpinion/typeWiseMISReport/:data', element: <TypeWiseMISReport /> },  // Bill BT
        { path: 'reportOpinion/typeWiseMISReport/PDFRenderTypeWiseMISReport/:data', element: <PDFRenderTypeWiseMISReport /> },  // Bill BT
        // Report (Opinion) End

        // Report (Disbursal) Start
        { path: 'reportDisbursal', element: <ReportDisbursalList /> },  // Bill List

        { path: 'reportDisbursal/registrationBank/:data', element: <RegistrationBank /> },  // Bill Registration
        { path: 'reportDisbursal/registrationBank/PDFRenderRegistrationBank/:data', element: <PDFRenderRegistrationBank /> },  // Bill Registration
        { path: 'reportDisbursal/registrationLedger/:data', element: <RegistrationLedger /> },  // Bill BT
        { path: 'reportDisbursal/registrationLedger/PDFRenderRegistrationLedger/:data', element: <PDFRenderRegistrationLedger /> },  // Bill BT
        { path: 'reportDisbursal/loanBank/:data', element: <LoanBank /> },  // Bill BT
        { path: 'reportDisbursal/loanBank/PDFRenderLoanBank/:data', element: <PDFRenderLoanBank /> },  // Bill BT
        { path: 'reportDisbursal/loanLedger/:data', element: <LoanLedger /> },  // Bill BT
        { path: 'reportDisbursal/loanLedger/PDFRenderLoanLedger/:data', element: <PDFRenderLoanLedger /> },  // Bill BT
        { path: 'reportDisbursal/pendingReport/:data', element: <PendingReport /> },  // Bill BT
        { path: 'reportDisbursal/PDFRenderPendingReport/:data', element: <PDFRenderPendingReport /> },  // Bill BT
        { path: 'reportDisbursal/loanTakenOver/:data', element: <LoanTakenOver /> },  // Bill BT
        { path: 'reportDisbursal/loanTakenOver/PDFRenderLoanTakenOver/:data', element: <PDFRenderLoanTakenOver /> },  // Bill BT
        { path: 'reportDisbursal/loanRegistrationCaseHandledBy/:data', element: <LoanRegistrationCaseHandledBy /> },  // Bill BT
        { path: 'reportDisbursal/loanRegistrationCaseHandledBy/PDFRenderLoanRegistrationCaseHandledBy/:data', element: <PDFRenderLoanRegistrationCaseHandledBy /> },  // Bill BT
        { path: 'reportDisbursal/caseByDSAWise/:data', element: <CaseByDSAWise /> },  // Bill BT
        { path: 'reportDisbursal/caseByDSAWise/PDFRenderCaseByDSAWise/:data', element: <PDFRenderCaseByDSAWise /> },  // Bill BT
        { path: 'reportDisbursal/caseByDELWise/:data', element: <CaseByDELWise /> },  // Bill BT
        { path: 'reportDisbursal/caseByDELWise/PDFRenderCaseByDELWise/:data', element: <PDFRenderCaseByDELWise /> },  // Bill BT
        { path: 'reportDisbursal/caseByRemarksWise/:data', element: <CaseByRemarksWise /> },  // Bill BT
        { path: 'reportDisbursal/caseByRemarksWise/PDFRenderCaseByRemarksWise/:data', element: <PDFRenderCaseByRemarksWise /> },  // Bill BT
        { path: 'reportDisbursal/dsaList/:data', element: <DsaList /> },  // Bill BT
        { path: 'reportDisbursal/exutivePeformanceSummary/:data', element: <ExutivePeformanceSummary /> },  // Bill BT
        { path: 'reportDisbursal/exutivePeformanceSummary/PDFRenderExutivePeformanceSummary/:data', element: <PDFRenderExutivePeformanceSummary /> },  // Bill BT
        { path: 'reportDisbursal/accountSummary/:data', element: <AccountSummary /> },  // Bill BT
        { path: 'reportDisbursal/accountSummary/PDFRenderAccountSummary/:data', element: <PDFRenderAccountSummary /> },  // Bill BT
        // Report (Disbursal) End

        // MIS Report Start
        { path: 'misReport', element: <MISReportList /> },  // Bill List

        { path: 'misReport/bankWiseMis/:data', element: <BankWiseMIS /> },  // Bill Registration
        { path: 'misReport/bankWiseMis/PDFRenderBankWiseMIS/:data', element: <PDFRenderBankWiseMIS /> },  // Bill Registration
        { path: 'misReport/executiveWiseMis/:data', element: <ExecutiveWiseMIS /> },  // Bill BT
        { path: 'misReport/executiveWiseMis/PDFRenderExecutiveWiseMIS/:data', element: <PDFRenderExecutiveWiseMIS /> },  // Bill BT
        // MIS Report End

        
      ],
    },
    // App End

    // Auth Start
    {
      path: 'logout',
      element: <Logout />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: '404', element: <NotFound /> },
        // { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
    // Auth End
  ]);
}
