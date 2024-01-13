// component
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

let session = []

if(localStorage.getItem('session') !== null) {
  session = JSON.parse(localStorage.getItem('session'))
}

const permissionSet = typeof session.permission === 'undefined' ? [] : JSON.parse(session?.permission.permissionSet)



const logout = () => {
  localStorage.clear();
};

const navConfig = [
  {
    title: 'dashboard',
    path: '/app/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
    permission: permissionSet === [] ? 0 :permissionSet.dashboard,
  },

  // {
  //   title: 'builder payment',
  //   path: '/app/builerPayment',
  //   icon: getIcon('eva:people-fill'),
  //   permission: permissionSet === [] ? 0 :permissionSet.builerPayment,
  // },

  // -------------------------------Transection START--------------------------------- //
  {
    title: 'Transection',
    path: '#', 
    icon: getIcon('eva:people-fill'),
    permission: permissionSet === [] ? 0 :permissionSet.builerPayment,
    children: [
      // { 
      //   head: '',
      //   title: 'Builder Pay',
      //   path: '#',
      //   icon: getIcon(''),
      // },
      // {
      //   head: 'builderpayment',
      //   title: 'builder payment',
      //   path: '/app/builerPayment',
      //   icon: getIcon(''),
      // },
      // -------------------------------Option START--------------------------------- //

      // { 
      //   head: '',
      //   title: 'Opinion',
      //   path: '/app/option/prepareReports',
      //   icon: getIcon(''),
      // },

      {
        head: 'prepareReports',
        title: 'Opinion',
        path: '/app/option/prepareReports',
        icon: getIcon(''),
      },
      // {
      //   head: 'duDupe',
      //   title: 'Du Dupe',
      //   path: '/app/option/duDupe',
      //   icon: getIcon(''),
      // },
      // -------------------------------Option END--------------------------------- //
      // -------------------------------Disbursal START--------------------------------- //
      // { 
      //   head: '',
      //   title: 'Disbursal',
      //   path: '/app/disbursal/registration/list/',
      //   icon: getIcon(''),
      // },
      { 
        head: 'registration',
        title: 'Registration',
        path: '/app/disbursal/registration/list/',
        icon: getIcon(''),
      },
      { 
        head: 'bt',
        title: 'BT',
        path: '/app/disbursal/bt/list/',
        icon: getIcon(''),
      },

      {
        head: 'AuthorityLetters',
        title: 'Authority Letters',
        path: '/app/format/AuthorityLetters/list',
        icon: getIcon(''),
      },
      {
        head: 'DepositOfPayment',
        title: 'Deposit Of Payment',
        path: '/app/format/DepositOfPayment/list',
        icon: getIcon(''),
      },

      // -------------------------------Disbursal END--------------------------------- //
      // -------------------------------Bill START--------------------------------- //
      // { 
      //   head: '',
      //   title: 'Bill',
      //   path: '/app/bill/professionalFee/0',
      //   icon: getIcon(''),
      // },
      // { 
      //   head: 'professionalFee',
      //   title: 'Professional Fee',
      //   path: '/app/bill/professionalFee/0',
      //   icon: getIcon(''),
      // },
      // { 
      //   head: 'expenses',
      //   title: 'Expenses',
      //   path: '/app/bill/expenses/0',
      //   icon: getIcon(''),
      // },
      // -------------------------------Bill END--------------------------------- //

    ]
  },
  // -------------------------------Transection END--------------------------------- //


  // {
  //   title: 'Format',
  //   path: '#', 
  //   icon: getIcon('eva:people-fill'),
  //   permission: permissionSet === [] ? 0 :permissionSet.builerPayment,
  //   children: [
  //     { 
  //       head: '',
  //       title: 'Format',
  //       path: '/app/format/AuthorityLetters',
  //       icon: getIcon(''),
  //     },
  //     {
  //       head: 'AuthorityLetters',
  //       title: 'Authority Letters',
  //       path: '/app/format/AuthorityLetters',
  //       icon: getIcon(''),
  //     },
  //     {
  //       head: 'DepositOfPayment',
  //       title: 'Deposit Of Payment',
  //       path: '/app/format/DepositOfPayment',
  //       icon: getIcon(''),
  //     },

  //   ]
  // },

    // -------------------------------Option START--------------------------------- //
    // {
    //   title: 'Option',
    //   path: '/app/option', 
    //   icon: getIcon('eva:people-fill'),
    //   permission: permissionSet === [] ? 0 :permissionSet.option,
    //   children: [
    //     {
    //       head: 'prepareReports',
    //       title: 'Prepare Reports',
    //       path: '/app/option/prepareReports',
    //       icon: getIcon(''),
    //     },
    //     {
    //       head: 'duDupe',
    //       title: 'Du Dupe',
    //       path: '/app/option/duDupe',
    //       icon: getIcon(''),
    //     }

    //   ]
    // },
    // -------------------------------Option END--------------------------------- //

    // -------------------------------Disbursal START--------------------------------- //
  // {
  //   title: 'disbursal',
  //   path: '/app/disbursal', 
  //   icon: getIcon('eva:people-fill'),
  //   permission: permissionSet === [] ? 0 :permissionSet.disbursal,
  //   children: [
  //     { 
  //       head: 'registration',
  //       title: 'Registration',
  //       path: '/app/disbursal/registration/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'bt',
  //       title: 'BT',
  //       path: '/app/disbursal/bt/0',
  //       icon: getIcon(''),
  //     },
  //   ]
  // },
  
  // -------------------------------Disbursal END--------------------------------- //

  // -------------------------------Bill START--------------------------------- //
  // {
  //   title: 'bill',
  //   path: '/app/bill', 
  //   icon: getIcon('eva:people-fill'),
  //   permission: permissionSet === [] ? 0 :permissionSet.bill,
  //   children: [
  //     { 
  //       head: 'professionalFee',
  //       title: 'Professional Fee',
  //       path: '/app/bill/professionalFee/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'expenses',
  //       title: 'Expenses',
  //       path: '/app/bill/expenses/0',
  //       icon: getIcon(''),
  //     },
  //   ]
  // },
  
  // -------------------------------Bill END--------------------------------- //


  // -------------------------------Transection START--------------------------------- //
  {
    title: 'Opinion Reports',
    path: '#', 
    icon: getIcon('eva:people-fill'),
    permission: permissionSet === [] ? 0 :permissionSet.builerPayment,
    children: [
      // -------------------------------Report Builder START--------------------------------- //
      // { 
      //   head: '',
      //   title: 'Builder Pay',
      //   path: '#',
      //   icon: getIcon(''),
      // },
      // { 
      //   head: 'paymentLedger',
      //   title: 'Register',
      //   path: '/app/reportBuilderPay/paymentLedger/0',
      //   icon: getIcon(''),
      // },
      // { 
      //   head: 'reportBuilderPayList',
      //   title: 'Executive Wise',
      //   path: '/app/reportBuilderPay/executiveWiseMISReport/0',
      //   icon: getIcon(''),
      // },
      // -------------------------------Report Builder END--------------------------------- //
      { 
        head: 'bankWiseMISReport',
        title: 'Bank Wise MIS Report',
        path: '/app/reportOpinion/bankWiseMISReport/0',
        icon: getIcon(''),
      },
      { 
        head: 'statusWiseMISReport',
        title: 'Status Wise MIS Report',
        path: '/app/reportOpinion/statusWiseMISReport/0',
        icon: getIcon(''),
      },
      { 
        head: 'executiveWiseReport',
        title: 'Executive Wise MIS Report',
        path: '/app/reportOpinion/executiveWiseMisReport/0',
        icon: getIcon(''),
      },
      { 
        head: 'typeWiseMISReport',
        title: 'Type Wise MIS Report',
        path: '/app/reportOpinion/typeWiseMISReport/0',
        icon: getIcon(''),
      },
    ]
  },

  {
    title: 'Disbursal Report',
    path: '#', 
    icon: getIcon('eva:people-fill'),
    permission: permissionSet === [] ? 0 :permissionSet.reportBuilderPay,
    children: [
      { 
        head: 'registrationBank',
        title: 'Registration Bank',
        path: '/app/reportDisbursal/registrationBank/0',
        icon: getIcon(''),
      },
      { 
        head: 'registrationLedger',
        title: 'Registration Ledger',
        path: '/app/reportDisbursal/registrationLedger/0',
        icon: getIcon(''),
      },
      { 
        head: 'loanBank',
        title: 'Loan Bank',
        path: '/app/reportDisbursal/loanBank/0',
        icon: getIcon(''),
      },
      { 
        head: 'loanLedger',
        title: 'Loan Ledger',
        path: '/app/reportDisbursal/loanLedger/0',
        icon: getIcon(''),
      },
      // { 
      //   head: 'pendingReport',
      //   title: 'Pending Report',
      //   path: '/app/reportDisbursal/pendingReport/0',
      //   icon: getIcon(''),
      // },
      // { 
      //   head: 'loanTakenOver',
      //   title: 'Loan Taken Over',
      //   path: '/app/reportDisbursal/loanTakenOver/0',
      //   icon: getIcon(''),
      // },
      { 
        head: 'loanRegistrationCaseHandledBy',
        title: 'Case Handled By',
        path: '/app/reportDisbursal/loanRegistrationCaseHandledBy/0',
        icon: getIcon(''),
      },
      // { 
      //   head: 'caseByDSAWise',
      //   title: 'Case By DSA Wise',
      //   path: '/app/reportDisbursal/caseByDSAWise/0',
      //   icon: getIcon(''),
      // },
      // { 
      //   head: 'caseByDELWise',
      //   title: 'Case By DEL Wise',
      //   path: '/app/reportDisbursal/caseByDELWise/0',
      //   icon: getIcon(''),
      // },
      // { 
      //   head: 'caseByRemarksWise',
      //   title: 'Case By Remarks Wise',
      //   path: '/app/reportDisbursal/caseByRemarksWise/0',
      //   icon: getIcon(''),
      // },
      // { 
      //   head: 'dsaList',
      //   title: 'DSA LIST (PDF)',
      //   path: '/app/reportDisbursal/dsaList/0',
      //   icon: getIcon(''),
      // },
      // { 
      //   head: 'exutivePeformanceSummary',
      //   title: 'Exutive Peformance Summary',
      //   path: '/app/reportDisbursal/exutivePeformanceSummary/0',
      //   icon: getIcon(''),
      // },
      { 
        head: 'accountSummary',
        title: 'Account Summary',
        path: '/app/reportDisbursal/accountSummary/0',
        icon: getIcon(''),
      },
    ]
  },

  // {
  //   title: 'MIS Report',
  //   path: '/app/reportBuilderPay', 
  //   icon: getIcon('eva:people-fill'),
  //   permission: permissionSet === [] ? 0 :permissionSet.reportBuilderPay,
  //   children: [
  //     { 
  //       head: 'executiveWiseMis',
  //       title: 'Executive Wise MIS',
  //       path: '/app/misReport/executiveWiseMis/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'bankWiseMis',
  //       title: 'Bank Wise MIS',
  //       path: '/app/misReport/bankWiseMis/0',
  //       icon: getIcon(''),
  //     },
  //   ]
  // },


  // -------------------------------Transection END--------------------------------- //

  // -------------------------------Report Builder START--------------------------------- //
  // {
  //   title: 'report (Builder Pay)',
  //   path: '/app/reportBuilderPay', 
  //   icon: getIcon('eva:people-fill'),
  //   permission: permissionSet === [] ? 0 :permissionSet.reportBuilderPay,
  //   children: [
  //     { 
  //       head: 'paymentLedger',
  //       title: 'Register',
  //       path: '/app/reportBuilderPay/paymentLedger/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'reportBuilderPayList',
  //       title: 'Executive Wise',
  //       path: '/app/reportBuilderPay/executiveWiseMISReport/0',
  //       icon: getIcon(''),
  //     },
  //   ]
  // },
  
  // -------------------------------Report Builder END--------------------------------- //

  // -------------------------------Report (Opinion) START--------------------------------- //
  // {
  //   title: 'Report (Opinion)',
  //   path: '/app/reportOpinion', 
  //   icon: getIcon('eva:people-fill'),
  //   permission: permissionSet === [] ? 0 :permissionSet.reportOpinion,
  //   children: [
  //     { 
  //       head: 'bankWiseMISReport',
  //       title: 'Bank Wise MIS Report',
  //       path: '/app/reportOpinion/bankWiseMISReport/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'statusWiseMISReport',
  //       title: 'Status Wise MIS Report',
  //       path: '/app/reportOpinion/statusWiseMISReport/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'executiveWiseReport',
  //       title: 'Executive Wise MIS Report',
  //       path: '/app/reportOpinion/executiveWiseMisReport/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'typeWiseMISReport',
  //       title: 'Type Wise MIS Report',
  //       path: '/app/reportOpinion/typeWiseMISReport/0',
  //       icon: getIcon(''),
  //     },
  //   ]
  // },
  
  // -------------------------------Report (Opinion) END--------------------------------- //
  
  // -------------------------------Report (Opinion) START--------------------------------- //
  // {
  //   title: 'Report (Disbursal)',
  //   path: '/app/reportDisbursal', 
  //   icon: getIcon('eva:people-fill'),
  //   permission: permissionSet === [] ? 0 :permissionSet.reportDisbursal,
  //   children: [
  //     { 
  //       head: 'registrationBank',
  //       title: 'Registration Bank',
  //       path: '/app/reportDisbursal/registrationBank/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'registrationLedger',
  //       title: 'Registration Ledger',
  //       path: '/app/reportDisbursal/registrationLedger/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'loanBank',
  //       title: 'Loan Bank',
  //       path: '/app/reportDisbursal/loanBank/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'loanLedger',
  //       title: 'Loan Ledger',
  //       path: '/app/reportDisbursal/loanLedger/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'pendingReport',
  //       title: 'Pending Report',
  //       path: '/app/reportDisbursal/pendingReport/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'loanTakenOver',
  //       title: 'Loan Taken Over',
  //       path: '/app/reportDisbursal/loanTakenOver/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'loanRegistrationCaseHandledBy',
  //       title: 'Case Handled By',
  //       path: '/app/reportDisbursal/loanRegistrationCaseHandledBy/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'caseByDSAWise',
  //       title: 'Case By DSA Wise',
  //       path: '/app/reportDisbursal/caseByDSAWise/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'caseByDELWise',
  //       title: 'Case By DEL Wise',
  //       path: '/app/reportDisbursal/caseByDELWise/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'caseByRemarksWise',
  //       title: 'Case By Remarks Wise',
  //       path: '/app/reportDisbursal/caseByRemarksWise/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'dsaList',
  //       title: 'DSA LIST (PDF)',
  //       path: '/app/reportDisbursal/dsaList/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'exutivePeformanceSummary',
  //       title: 'Exutive Peformance Summary',
  //       path: '/app/reportDisbursal/exutivePeformanceSummary/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'accountSummary',
  //       title: 'Account Summary',
  //       path: '/app/reportDisbursal/accountSummary/0',
  //       icon: getIcon(''),
  //     },
  //   ]
  // },
  
  // -------------------------------Report (Opinion) END--------------------------------- //


  // -------------------------------MIS Report START--------------------------------- //
  // {
  //   title: 'MIS Report',
  //   path: '/app/misReport', 
  //   icon: getIcon('eva:people-fill'),
  //   permission: permissionSet === [] ? 0 :permissionSet.misReport,
  //   children: [
  //     { 
  //       head: 'executiveWiseMis',
  //       title: 'Executive Wise MIS',
  //       path: '/app/misReport/executiveWiseMis/0',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'bankWiseMis',
  //       title: 'Bank Wise MIS',
  //       path: '/app/misReport/bankWiseMis/0',
  //       icon: getIcon(''),
  //     },
  //   ]
  // },
  
  // -------------------------------MIS Report END--------------------------------- //

  
  
  




  // -------------------------------MASTER START--------------------------------- //
  { 
    head: 'master',
    title: 'Master',
    path: '#',
    icon: getIcon('eva:pie-chart-2-fill'),
    permission: permissionSet === [] ? 0 :permissionSet.master,
    children: [
      { 
        head: 'registrarOffice',
        title: 'Registrar Office',
        path: '/app/master/registrarOffice',
        icon: getIcon(''),
      },
      { 
        head: 'handledBy',
        title: 'Handled By',
        path: '/app/master/handledBy',
        icon: getIcon(''),
      },
      { 
        head: 'del',
        title: 'Del',
        path: '/app/master/del',
        icon: getIcon(''),
      },
      { 
        head: 'remarks',
        title: 'Remarks',
        path: '/app/master/remarks',
        icon: getIcon(''),
      },
      { 
        head: 'bank',
        title: 'Bank',
        path: '/app/master/bank',
        icon: getIcon(''),
      },
      { 
        head: 'dsa',
        title: 'DSA',
        path: '/app/master/dsa',
        icon: getIcon(''),
      },
      { 
        head: 'branch',
        title: 'Branch',
        path: '/app/master/branch',
        icon: getIcon(''),
      },
      { 
        head: 'fee',
        title: 'Fee',
        path: '/app/master/fee',
        icon: getIcon(''),
      },
      
    ]
  },

  { 
    title: 'user',
    path: '/app/master/user',
    icon: getIcon('eva:pie-chart-2-fill'),
    permission: permissionSet === [] ? 0 :permissionSet.dashboard,
  },
  {
    title: 'logout',
    path: '/logout',
    icon: getIcon('eva:pie-chart-2-fill'),
    logout: true,
    permission: true,
  },
  
  

    // -------------------------------MASTER END--------------------------------- //

  
  
  // {
  //   title: 'user',
  //   path: '/app/user',
  //   icon: getIcon('eva:people-fill'),
  // },
  // {
  //   title: 'product',
  //   path: '/app/products',
  //   icon: getIcon('eva:shopping-bag-fill'),
  // },
  // {
  //   title: 'blog',
  //   path: '/app/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
