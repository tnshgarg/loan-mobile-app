const kfs = {
  html: `<img width="99" height="92"
    src="https://freopay.com/wp-content/uploads/2022/04/Liquiloans-logo-for-FP.png">
<p><strong>KEY FACT STATEMENT</strong></p>
<p>&nbsp;</p>
<p>
<p><strong>Date:&nbsp;</strong>{availedDate}</p>
<p><strong>Name of the Regulated entity:&nbsp;</strong>LiquiLoans</p>
<p><strong>Applicant Name:&nbsp;</strong>{panName}</p>
</p>

<p>&nbsp;</p>
<table style="border: 1px solid black; border-collapse: collapse;">
<tbody>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p><strong>Sr.No.</strong></p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p><strong>Parameter</strong></p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p><strong>Details (given for illustrative computation purposes only)</strong></p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(i)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Loan amount (amount disbursed/to be disbursed to the borrower) (in Rupees)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>{loanAmount}</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(ii)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Total interest charge during the entire tenor of the loan (in Rupees)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>-</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(iii)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Other up-front charges, if any (break-up of each component to be given below) (in Rupees)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>{processingFees}</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(a)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Processing fees, if any (in Rupees)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>{processingFees}</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(b)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Insurance charges, if any (in Rupees)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>-</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(c)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Others (if any) (in Rupees) (details to be provided)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>-</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(iv)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Net disbursed amount ((i)-(iii)) (in Rupees)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>{disbursedAmount}</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(v)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Total amount to be paid by the borrower (sum of (i), (ii) and (iii)) (in Rupees)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>{loanAmount}</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(vi)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Annual Percentage Rate - Effective annualized interest rate (in percentage) (computed on net
                disbursed amount using IRR approach and reducing balance method)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>{APR}%</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(vii)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Tenor of the Loan (in months/days)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>1 months</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(viii)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Repayment frequency by the borrower</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Monthly</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(ix)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Number of instalments of repayment</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>1</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(x)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Amount of each instalment of repayment (in Rupees)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>{loanAmount}</p>
        </td>
    </tr>
    <tr>
        <td colspan="3" width="100%">
            <p><strong>Details about Contingent Charges</strong></p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(xi)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Rate of annualized penal charges in case of delayed payments (if any)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>60%</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(xii)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>NACH/e-Mandate bounce charges</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>INR 100&nbsp;(inclusive of applicable taxes)</p>
        </td>
    </tr>
    <tr>
        <td colspan="3" width="100%">
            <p><strong>Other disclosures</strong></p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(xiii)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Cooling off/look-up period during which borrower shall not be charged any penalty on prepayment of loan</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>3 days</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(xiv)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Details of LSP acting as recovery agent and authorized to approach the borrower</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Payrocket Technology Private Limited</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>(xv)</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>Name, designation, address and phone number of nodal grievance redressal officer designated
                specifically to deal with FinTech/ digital lending related complaints/
                issues</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>For Payrocket Technology Private Limited&nbsp;</p>
            <p><strong>Name&nbsp;</strong> - Raunak Kumar Jha</p>
            <p><strong>Designation&nbsp;</strong>- Grievance &amp; Customer support officer</p>
            <p><strong>EmailId&nbsp;</strong>- cs@unipe.co</p>
            <p>&nbsp;</p>
        </td>
    </tr>
</tbody>
</table>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><strong>Detailed Repayment Schedule</strong></p>
<p>&nbsp;</p>
<table border="1" cellpadding="0" cellspacing="0">
<tbody>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p><strong>Instalment No.</strong></p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p><strong>Outstanding Principal (in Rupees)</strong></p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p><strong>Principal (in Rupees)</strong></p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p><strong>Interest (in Rupees)</strong></p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p><strong>Instalment (in Rupees)</strong></p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>1</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>{loanAmount}</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>{loanAmount}</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>0</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>{loanAmount}</p>
        </td>
    </tr>
</tbody>
</table>
<p>&nbsp;</p>
<p>&nbsp;</p>`
};

export default kfs;
