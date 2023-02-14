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
            <p>5% per month</p>
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
            <p>20,000</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>720</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>250</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>2</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>19,280</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>729</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>241</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>3</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>18,552</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>738</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>232</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>4</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>17,814</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>747</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>223</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>5</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>17,067</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>756</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>213</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>6</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>16,310</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>766</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>204</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>7</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>15,544</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>775</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>194</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>8</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>14,769</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>785</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>185</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>9</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>13,984</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>795</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>175</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>10</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>13,189</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>805</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>165</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>11</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>12,384</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>815</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>155</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>12</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>11,569</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>825</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>145</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>13</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>10,744</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>835</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>134</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>14</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>9,909</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>846</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>124</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>15</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>9,063</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>856</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>113</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>16</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>8,206</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>867</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>103</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>17</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>7,339</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>878</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>92</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>18</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>6,461</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>889</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>81</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>19</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>5,572</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>900</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>70</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>20</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>4,672</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>911</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>58</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>21</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>3,761</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>923</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>47</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>22</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>2,838</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>934</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>35</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>23</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>1,904</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>946</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>24</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
    <tr>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>24</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>958</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>958</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>12</p>
        </td>
        <td style="border: 1px solid black; border-collapse: collapse;">
            <p>970</p>
        </td>
    </tr>
</tbody>
</table>
<p>&nbsp;</p>
<p>&nbsp;</p>`
};

export default kfs;
