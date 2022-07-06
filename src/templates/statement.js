function formatAmount(x = 0) {
    x = Number(x);
    return '₦' + x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function amountSpent(carryOver, aggBalance)
{
    return parseFloat(carryOver) + parseFloat(aggBalance);
}


function formatDate(dateTme) {

    let date = new Date(dateTme);
    let dd = date.getDate();
    if (dd < 10) {
        dd = '0' + dd;
    }
    let mm = date.getMonth() + 1;
    if (mm < 10) {
        mm = '0' + mm;
    }
    let yyyy = date.getFullYear();

    return `${yyyy}-${mm}-${dd}`;

}


const expense = (transactions) => {
    if (transactions?.length > 0) {

        let stmt = `
<div class="transactions">
                <div class="heading topic">
                    <div class="left bold title sub-title">Your transactions</div>
                    <div class="right note right-text">* For a detailed breakdown of the transactions on each card, log in to the Company Business dashboard.</div>
                </div>
                <hr>
                <div class="data-row">
                    <span class="th">Post Date</span>
                    <span class="th">Trans Date</span>
                    <span class="th">Category</span>
                    <span class="th">Transaction Description</span>
                    <span class="th">Amount (₦)</span>
                </div>
                <hr>
                ${loopExpense(transactions)}
            </div>
		`;

        function loopExpense(arr) {
            let str = '';
            arr.forEach(el => {
                str += `
                <div class="data-row">
                    <span class="tdata text">${formatDate(el.created_at)}</span>
                    <span class="tdata text">${formatDate(el.date)}</span>
                    <span class="tdata text">${el.category}</span>
                    <span class="tdata text text-height">${el.description}</span>
                    <span class="tdata text">
                        ${(el.type.toLowerCase() === 'credit') ? '+' : '-'}
                        ${formatAmount(el.amount)}
                    </span>
                </div>
                <hr>
	        `
            });
            return str;
        }

        return stmt;
    }
    return `<span></span>`;
}


module.exports = (data) => {

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <style>
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed,
        figure, figcaption, footer, header, hgroup,
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure,
        footer, header, hgroup, menu, nav, section {
            display: block;
        }
        body {
            line-height: 1;
        }
        ol, ul {
            list-style: none;
        }
        blockquote, q {
            quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
            content: '';
            content: none;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }
        @font-face {
            font-family: ax;
            font-style: normal;
            font-weight: 300;
            /* src: local('Axiforma-Regular'); */
            src: url('./fonts/Axiforma-Regular.otf');
        }
        @font-face {
            font-family: axl;
            font-style: normal;
            font-weight: 400;
            /* src: local('Axiforma-Light'); */
            src: url('./fonts/Axiforma-Light.otf');
        }
        @font-face {
            font-family: axt;
            font-style: normal;
            font-weight: 400;
            /* src: local('Axiforma-Thin'); */
            src: url('./fonts/Axiforma-Thin.otf');
        }
        @font-face {
            font-family: axb;
            font-style: normal;
            font-weight: 700;
            /* src: local('Axiforma-Bold'); */
            src: url('./fonts/Axiforma-Bold.otf');
        }
        @font-face {
            font-family: axsb;
            font-style: normal;
            font-weight: 700;
            /* src: local('Axiforma-SemiBold'); */
            src: url('./fonts/Axiforma-SemiBold.otf');
        }
        @font-face {
            font-family: axm;
            font-style: normal;
            font-weight: 700;
            /* src: local('Axiforma-Medium'); */
            src: url('./fonts/Axiforma-Medium.otf');
        }

        body {
            /*background-color: #eceff3;*/
            background-color: #e5e5e5;
            display: flex;
            justify-content: center;
            align-items: center;
            /*width: 760px;*/
        }
        .bold {
            font-family: axsb;
        }
        .title  {
            color: #274FED;
        }
        .sub-title {
            font-size: 13.4px;
        }
        .topic {
            padding-bottom: 8px;
            padding-bottom: 8px;
        }
        hr {
            border-top: .1px solid #e8e8e8;
            border-bottom: 0;
            border-right: 0;
            border-left: 0;
            border-radius: 4px;

        }
        .text {
            font-size: 10px;
        }
        .container {
            background-color: white;
            font-family: ax;
            width: 800px;
            /* width: 210mm; */
            /*height: 297mm;*/
        }
        header {
            display: flex;
            flex-direction: column;
            padding-left: 40px;
            padding-right: 40px;
            background-color: #f2f4fe;
            border-top: 12px solid #274FED;
            border-bottom: 2px solid #274FED;
        }
        .image-container {
            width: 100%;
            padding-top: 40px;
            padding-bottom: 40px;
        }
        .image-container .image {
            width: 18%;
        }
        .heading {
            display: flex;
            justify-content: space-between;
        }
        .name-email {
            width: 50%;
        }
        .name-email .name {
            font-family: axsb;
            font-size: 18.4px;
        }
        .name-email .email {
            padding-top: 20px;
            padding-bottom: 20px;
            font-size: 12px;
        }
        .name-date {
            width: 45%;
        }
        .name-date .name {
            font-family: axsb;
            font-size: 17px;
        }
        .name-date .date {
            padding-top: 20px;
            padding-bottom: 20px;
            font-size: 10px;
        }
        section {
            padding-left: 40px;
            padding-right: 40px;
        }
        .div-table {
            display: flex;
            justify-content: space-between;
        }
        .div-table .cell {
            display: flex;
            flex-direction: column;
            width: 40%;
        }
        .th {
            font-size: 10px;
            font-family: axsb;
        }
        .td {
            font-size: 9px;
            padding-top: 11px;
            padding-bottom: 8px;
        }
        .thead{
            display: flex;
            justify-content: space-between;
            padding-top: 6px;
            padding-bottom: 6px;
        }
        .tdata {
            width: 32%;
            padding-top: 2px;
            padding-bottom: 2px;
        }

        .payment .left .td {
            font-size: 9px;
            padding-top: 6px;
            padding-bottom: 5px;
        }

        .left {
            width: 50%;
        }
        .right {
            width: 40%;
        }

        .info-summary {
            display: flex;
            padding-top: 50px;
            padding-bottom: 50px;
            justify-content: space-between;
        }
        .rewards-disclaimer {
            display: flex;
            padding-top: 20px;
            padding-bottom: 1px;
            justify-content: space-between;
        }
        .rewards-disclaimer .left {
           width: 50%;
        }
        .rewards-disclaimer .right {
            width: 45%;
        }
        .note {
            font-size: 8.2px;
            padding-top: 5px;
            font-family: axl;
        }
        .right-text{
            text-align: right;
        }
        .text-height {
            line-height: 18px;
        }
        .transactions {
            padding-top: 70px;
            padding-bottom: 30px;
            justify-content: space-between;
        }
        .transactions .heading {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .transactions .heading .left {
            width: 20%;
        }
        .transactions .heading .right {
            width: 65%;
        }
        .transactions .data-row {
            display: flex;
            justify-content: space-between;
            padding-top: 5px;
            padding-bottom: 5px;
        }

        .transactions .data-row span:first-child,
        .transactions .data-row span:nth-child(2),
        .transactions .data-row span:nth-child(5),
        .transactions .data-row span:nth-child(3) {
            width: 11%;
        }

        .transactions .data-row span:nth-child(4) {
            width: 45%;
        }

        .transactions .text-height {
            line-height: 14.7px;
        }

        .info-summary .right:nth-child(2)  {
            width: 45%;
        }

        .conclusion {
            padding-bottom: 70px;
        }
        @page {
            margin-top: 50px;
            margin-bottom: 80px;
        }


    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="image-container">
                <div class="image">
                    <div style="height: 50px; width: 50px;"></div>
                </div>
            </div>
            <div class="heading">
                <div class="name-email">
                    <div class="name">
                        <span>${data?.statement?.user?.name?.toUpperCase()} ${data?.statement?.user?.last_name?.toUpperCase()}</span>
                    </div>
                    <div class="email">
                        <span style="font-family: axl;">${data?.statement?.user?.email?.toLowerCase()}</span>
                    </div>
                </div>
                <div class="name-date">
                    <div class="name title">
                        <span>Personal Credit Statement</span>
                    </div>
                    <div class="date">
                        <span class="bold">From: </span>
                        <span style="font-family: axl;">${data?.download?.start_date_day}</span>
                        <span> - </span>
                        <span style="font-family: axl;">${data?.download?.end_date_day}</span>
                    </div>
                </div>
            </div>
        </header>
        <section>
            <div class="info-summary">
                <div class="left">
                    <div class="topic"><span class="bold title sub-title">Statement Information</span></div>
                    <hr>
                    <div class="div-table">
                        <div class="cell">
                            <span class="th">Billing Date</span>
                            <span class="td">${data?.date?.billing_date}th</span>
                        </div>
                        <div class="cell">
                            <span class="th">Due Date</span>
                            <span class="td">${data?.download?.payment_due_date}</span>
                        </div>
                        <div class="cell">
                            <span class="th">Total Balance</span>
                            <span class="td">${formatAmount(data?.summary?.total_outstanding)}</span>
                        </div>
                    </div>
                    <hr>
                    <div class="div-table">
                        <div class="cell">
                            <span class="th">Opening Balance</span>
                            <span class="td">${formatAmount(data?.statement?.opening_balance)}</span>
                        </div>
                        <div class="cell">
                            <span class="th">Payment Made</span>
                            <span class="td">${formatAmount(data?.summary?.payments) || 0}</span>
                        </div>
                        <div class="cell">
                            <span class="th">Net Outstanding</span>
                            <span class="td">${formatAmount(data?.summary?.net_outstanding)}</span>
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="right">
                    <div class="topic"><span class="bold title sub-title">Account Summary</span></div>
                    <hr>
                    <div class="div-table">
                        <div class="cell">
                            <span class="th">Card Limit</span>
                            <span class="td">${formatAmount(data?.statement?.personal_account?.credit_card_limit)}</span>
                        </div>
                        <div class="cell">
                            <span class="th">Available Credit</span>
                            <span class="td">${formatAmount(data?.statement?.personal_account?.available_credit)}</span>
                        </div>
                    </div>
                    <hr>
                    <div class="div-table">
                        <div class="cell">
                            <span class="th">Amount Spent</span>
                            <span class="td">${formatAmount(amountSpent(data?.statement?.carry_over_balance, data?.statement?.agg_balance))}</span>
                        </div>
                        <div class="cell">
                            <span class="th">Interest</span>
                            <span class="td">${formatAmount(data?.summary?.interest)}</span>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
            <div class="rewards-disclaimer">
                <div class="left">
                    <div class="topic"><span class="bold title sub-title">Rewards Summary</span></div>
                    <hr>
                    <div class="th thead sub-title">
                        <span class="tdata">Statement credit</span>
                        <span class="tdata title">Credit balance</span>
                        <span class="tdata title">***</span>
                    </div>
                    <hr>
                    <div class="thead">
                        <span class="tdata text">Previous credit earned</span>
                        <span class="tdata text">Credits earned</span>
                        <span class="tdata text">Credits redeemed</span>
                    </div>
                    <div class="thead">
                        <span class="tdata text">***</span>
                        <span class="tdata text">***</span>
                        <span class="tdata text">***</span>
                    </div>
                    <hr>
                    <div class="th thead sub-title">
                        <span class="tdata">Company points</span>
                        <span class="tdata title">Points balance</span>
                        <span class="tdata title">***</span>
                    </div>
                    <hr>
                    <div class="thead">
                        <span class="tdata text">Previous credit earned</span>
                        <span class="tdata text">Credits earned</span>
                        <span class="tdata text">Credits redeemed</span>
                    </div>
                    <div class="thead">
                        <span class="tdata text">***</span>
                        <span class="tdata text">***</span>
                        <span class="tdata text">***</span>
                    </div>
                </div>
                <div class="right">
                    <div class="topic"><span class="bold title sub-title">Disclaimer</span></div>
                    <hr>
                    <div>
                        <span class="text">
                            Kindly examine this statement immediately. If no discrepancy is reported within 7 days from the statement date, the account will be considered as correct.
                            Please settle this statement promptly.
                            <br><br>
                            If the minimum payment is not received by the due date, a late repayment charge of --% of your outstanding balance will be charged to your card account.
                            <br><br>
                            This will be calculated on a daily basis on the outstanding balance amount on this current statement.
                        </span>

                    </div>
                </div>
            </div>
            <hr>


            ${expense(data?.statement?.transactions)}

            <div class="info-summary payment">
                <div class="left">
                    <div class="topic"><span class="bold title sub-title">Payment Summary</span></div>
                    <hr>
                    <div class="div-table">
                        <div class="th">Past due</div>
                        <div class="td right-text">${formatAmount(data?.statement?.opening_balance)}</div>
                    </div>
                    <hr>
                    <div class="div-table">
                        <div class="th">Payments</div>
                        <div class="td right-text">${formatAmount(data?.statement.payment?.total_amount || 0)}</div>
                    </div>
                    <hr>
                    <div class="div-table">
                        <div class="th">Total due</div>
                        <div class="td right-text">${formatAmount(data?.statement?.total_outstanding)}</div>
                    </div>
                    <hr>
                </div>
                <div class="right">
                    <div class="topic"><span class="bold sub-title" style="color: white">Summary</span></div>
                    <hr>
                    <div class="div-table">
                        <div class="cell">
                            <span class="th">Credit Limit</span>
                            <span class="td">${formatAmount(data.statement?.personal_account?.credit_card_limit)}</span>
                        </div>
                        <div class="cell">
                            <span class="th">Cash Advance Limit</span>
                            <span class="td">***</span>
                        </div>
                    </div>
                    <hr>
                    <div class="div-table">
                        <div class="cell">
                            <span class="th">Interest on purchase</span>
                            <span class="td">${formatAmount(data?.statement?.interest)}</span>
                        </div>
                        <div class="cell">
                            <span class="th">Interest on cash advance</span>
                            <span class="td">***</span>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
            <div class="conclusion">
                <div class="topic bold title sub-title">Payment Point</div>
                <hr>
                <div class="bold text text-height">
                    Payments for your credit balance will be automatically debited from your repayment debit card added on the Company Personal platform.
                    Payments can also be made via bank transfer to the Company Business account as displayed on your dashboard.
                </div>
                <br>
                <div class="text text-height" style="font-family: axl;">
                    Notify us immediately of any changes in your billing address or telephone number by filling in your new address in the coupon on the reverse of the statement or via your dashboard on Company Business.
                </div>
            </div>
        </section>

    </div>
</body>
</html>


`;


}
