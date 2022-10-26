const agreement = {
  html: `
<img src="https://freopay.com/wp-content/uploads/2022/04/Liquiloans-logo-for-FP.png" width="200" height="200"/>
<p>Ref: Digital Credit Facility (Application number) Date: <span>{todayDate}</span> </p>


<p>Mr./Mrs./Ms. <span>{panName}</span></p>
<p><span>{aadhaarAddress}</span></p>
<p>Email: <span>{email}</span></p>
<p>Registered Mobile Number: <span>{mobile}</span></p>

<p>Dear Sir/Madam,</p>

<p>Re: Sanction of Digital Credit Facility through Unipe to You Application no: <span>{loanAccountNumber}</span> Dated: <span>{todayDate}</span>	</p>

<p>We are pleased to inform you that on the basis of information submitted online by you via our Approved Digital Platform, <strong>Unipe </strong>for a Credit Facility of <span>{loanAmount}</span> vide application no. <strong><span>{loanAccountNumber}</span></strong><strong>, </strong>the same is approved, subject to your acceptance/complying with the terms and conditions as stated herein below:</p>


<table style="border: 1px solid black; border-collapse: collapse;">
    <tr>
      <th style="border: 1px solid black; border-collapse: collapse;">Product Description</th>
      <th style="border: 1px solid black; border-collapse: collapse;">Earned Salary Linked Line of Credit</th>
    </tr>
    <tr>
      <td style="border: 1px solid black; border-collapse: collapse;">Facility Sanction Amount</td>
      <td style="border: 1px solid black; border-collapse: collapse;">₹ <span>{loanAmount}</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid black; border-collapse: collapse;">Sublimit/Draw limit</td>
      <td style="border: 1px solid black; border-collapse: collapse;">Calculated based on the Amount of salary earned or accrued up to the date of request for Disbursement less amounts withdrawn in the current salary cycle. Total amount withdrawn between 2 salary dates cannot exceed the Facility Sanction Amount.</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; border-collapse: collapse;">Number of Disbursements per month</td>
      <td style="border: 1px solid black; border-collapse: collapse;">Multiple</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; border-collapse: collapse;">Validity of Facility</td>
      <td style="border: 1px solid black; border-collapse: collapse;">12 months from the date of this agreement.</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; border-collapse: collapse;">Disbursement Fee (Including GST)</td>
      <td style="border: 1px solid black; border-collapse: collapse;">₹ <span>{processingFees}</span> /- (incl GST)</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; border-collapse: collapse;">Transaction charges</td>
      <td style="border: 1px solid black; border-collapse: collapse;">NIL</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; border-collapse: collapse;">Interest Rate</td>
      <td style="border: 1px solid black; border-collapse: collapse;">Not chargeable until the term of the loan and subject to other charges</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; border-collapse: collapse;">Drawdown Date</td>
      <td style="border: 1px solid black; border-collapse: collapse;">Anytime in the salary cycle</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; border-collapse: collapse;">Repayment Due Date</td>
      <td style="border: 1px solid black; border-collapse: collapse;">
        <ul>
          <li>Where Employer deducts from salary: Salary credit date</li>
          <li>Where Client is responsible for the repayment: 5th of the subsequent month</li>
      </ul>
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid black; border-collapse: collapse;">Amount to be Repaid</td>
      <td style="border: 1px solid black; border-collapse: collapse;">
        <ul>
          <li>Where Employer deducts from the salary: Amount outstanding on salary credit date</li>
          <li>Where Client is responsible for the repayment: Amount outstanding on 5th of the month</li>
      </ul>
      </td>
    </tr>
    <tr>
      <td style="border: 1px solid black; border-collapse: collapse;">ECS/Auto debit/NACH Bounce Charges</td>
      <td style="border: 1px solid black; border-collapse: collapse;">₹ 100 /- for every ECS/Auto Debit/NACH bounce. Inclusive of all applicable taxes.</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; border-collapse: collapse;">Late payment- fees and charges</td>
      <td style="border: 1px solid black; border-collapse: collapse;">
        <ul>
          <li>NA- where the repayment is made through deduction from salary by the employer and payment is made within the stipulated tenure.</li>
          <li>(Refer to Section-1 on “Late payment fees and charges”) - for all clients who are responsible for their own repayment And clients for whom the Employer is not able to deduct from the Salary due to the Employee having quit the job and payroll is no longer processed by the Employer.</li>
      </ul>
      </td>
    </tr>
  </table>


<p><strong>Section 1: Late payment Fees and Charges(INR)  (Inclusive of all applicable taxes)</strong></p>

<table style="border: 1px solid black; border-collapse: collapse;">
  <tr>
    <th style="border: 1px solid black; border-collapse: collapse;">Outstanding amount (INR)</th>
    <th style="border: 1px solid black; border-collapse: collapse;">Due date +15 days</th>
    <th style="border: 1px solid black; border-collapse: collapse;">Due date +30 days</th>
    <th style="border: 1px solid black; border-collapse: collapse;">Due date +60 days</th>
    <th style="border: 1px solid black; border-collapse: collapse;">Due date +90 days</th>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">&lt=1000</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">1001-5000</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">5001-10,000</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">10,001-25,000</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">25,001-50,000</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">&gt50,000</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
  </tr>
</table>

<p>The late payment fee is a cumulative charge based on Days past the Due date, as per the table above and is exclusive of interest (if applicable) which may be charged on total outstanding in case the amount remains at default.</p>
<p>As an example:</p>
<p><strong>User 1-</strong> Outstanding amount INR 6000, pays post 16 Days past the Due Date, he will be charged a late payment fee of INR 150. </p>
<p><strong>User 2-</strong> Outstanding amount INR 6000, pays post 65 Days past the Due Date, he will be charged a late payment fee of INR 600. </p>


<p>The disbursements under this Facility shall be directly disbursed into your Bank Account No. (<span>{accountNumber}</span>), <span>{ifsc}</span>. disclosed by you in the digital application made via the Unipe Platform, subject to your acceptance of the above terms and conditions, and on execution of the Facility Agreement below, digitally. </p>

<p>The facility agreement is the basis for this sanction letter. And shall be governed by its terms and conditions. All disputes shall be subject to jurisdiction, terms and conditions as mentioned under facility agreement agreed by you while applying for said facility. </p>

<p>We advise you to download the Facility Agreement before digitally agreeing to the Terms and Conditions of the Facility Agreement.</p>

<p>This is a system generated document, hence no signature required</p>

<p>Yours sincerely,</p>
<p>For “NDX P2P PRIVATE LIMITED (Liquiloans )”</p>



<p><strong>Facility	Agreement <span>{loanAccountNumber}</span></strong></p>


<p>This <strong>FACILITY AGREEMENT </strong>made at Mumbai, Maharashtra on the date <span>{todayDate}</span> hereto (the "Agreement")</p>

<p>BETWEEN</p>

<p><strong>“NDX P2P Private Limited (Liquiloans)”, </strong>a Company incorporated under the provisions of the Companies Act, 1956, domiciled in 1st Floor, B-104, The Qube, Hasan Pada Rd, Mittal Industrial Estate, Marol Andheri (East), Mumbai, Maharashtra 400059 (the "Lender" which expression shall, unless it be repugnant to the context or meaning thereof, be deemed to mean and include its respective successors, transferees, and assigns)<strong>,</strong></p>

<p>AND</p>

<p>Name of Borrower: <span>{panName}</span></p>
<p>Facility Number:	<strong><span>{loanAccountNumber}</span></strong></p>

<p>PAN Number: <span>{panName}</span></p>

<p>Permanent Address: <span>{aadhaarAddress}</span></p>

<p>Mobile Phone: <span>{mobile}</span></p>
<p>Email Address: <span>{email}</span></p>

<p>Bank A/c No:	<span>{accountNumber}</span></p>
<p>IFSC Code: <span>{ifsc}</span></p>

<p>(The "<strong>Borrower</strong>" which expression shall, unless it be repugnant to the context or meaning thereof, be deemed to mean and include its successors). The Lender and the Borrower are hereinafter collectively referred to as the "<strong>Parties</strong>" and individually as "<strong>Party</strong>".</p>

<p><strong>WHEREAS</strong>Lender is providing a short term credit facility (“Facility”) to the Borrower through the mobile app, an approved digital platform, on the terms and conditions as agreed herein below</p>

<p>By clicking the ‘I agree’ to the terms and conditions check box, Borrower confirms that he has agreed to be legally bound by all stipulations mentioned under this agreement as amended from time to time for availing funds under the “Facility</p>

<p>These terms and conditions constitute a legal agreement between the Lender and Borrower and will be enforceable under all applicable laws prevalent in the Republic of India (hereinafter referred to as the “Applicable Laws”) to the same extent as if it was a physical contract.</p>

<p>Notwithstanding the aforesaid, Lender further agree to execute all such necessary documents including without limitation of any letter agreement, declaration or any other instrument as may be required by Lender to give effect to the terms and conditions as below.</p>


<p><strong>Subject of the Agreement</strong></p>

<p>On the basis of this Agreement and upon the representations and information provided by the Borrower in the digital application submitted via Unipe, the Lender shall provide the Borrower with a Facility in the manner and according to the terms and condition set out in this agreement. The execution of this agreement shall be deemed to be executed at Mumbai, Maharashtra by the parties.</p>

<p>The Facility shall be granted for the purpose of personal use by the Borrower, considering that for its issuance and usage the Borrower undertakes to pay all fees applied by the Lender, including transaction processing fees, disbursement fees and interest (if any applied) and late fees along with Goods & Service tax (GST) as specified in facility summary Schedule of this Agreement, (hereinafter referred to as the “<strong>Fees</strong>”). Thus, Borrower agrees to repay the balance outstanding under the Facility and all applied Fees on the repayment date (hereinafter referred to as the “Repayment Date”) together with all statutory taxes and levies as made applicable from time to time.</p>

<p>The Lender will charge Disbursement Fees (“Disbursement Fees”) as mentioned in the Facility Summary Schedule. The Disbursement Fees shall be paid by the Borrower to the Lender on the Drawdown Date. Any tax that arises in relation to this Facility will be to the account of the Borrower. The Borrower agrees that amounts shall be disbursed after deduction of aforesaid Disbursement Fees charged by Lender.</p>

<p>The principal amount outstanding under the Facility excluding interest (if any applied) and applicable fees, GST and other applicable taxes shall be transferred by the Lender, directly to the Borrower in their bank account as mentioned under this agreement.</p>

<p>This agreement cannot be terminated by Borrower at their discretion. Thus, this agreement shall be effective from the date of execution of this agreement and shall continue to be in full force and effective until the Facility is in place and until all repayments have been made and there is a zero amount outstanding under this facility including interest (if any applied) & charges as stipulated (hereinafter referred to as “the satisfaction date”).</p>

<p>The parties have agreed that interest shall not be charged until the tenure of the facility as fixed fee and charges are being levied by the lender. </p>

<p><strong>Conditions Precedent</strong></p>

<p>Unless the Borrower has successfully completed the Know Your Customer (KYC) procedures along with its credit evaluation in accordance with the Applicable Law, the Lender has no obligation to extend the Facility under this Agreement. The Lender reserves the right to request additional information from the Borrower, which it deems necessary in order to confirm the identity or income of the Borrower, including copies of documents confirming the identity and amount of income of the Borrower.</p>

<p>The Borrower hereby authorises the Lender to access and update information such as personal data including sensitive personal data relating to Borrower credit history available with Credit Information Companies (Bureaus) or any other agency authorised in this context by RBI.</p>

<p>Thus Borrower accepts, confirms and consents to the disclosure and sharing by the Lender of all or any information and personal data including sensitive data relating to the Borrower, the facilities, any other transactions that the Borrower has with the Lender, the Borrower’s account, and the agreements and documents related to the facilities and transactions, including but not limited to information relating to default, if any, committed by the Borrower, in the discharge of the Borrower’s obligations in relation to the facilities or other transactions, as the Lender may deem appropriate and necessary to disclose and furnish, to RBI and/or to Credit Information Companies (Bureaus) and/or to any other agency or body as authorized in this behalf by RBI, and/or to other banks and lenders including assignees and potential assignees, and/or to its professional advisers, underwriters and consultants and to its service providers and other relevant third parties, and/or as required, whether under Applicable Law, or at the order of a court of law or parties which the Lender deems fit therein.</p>

<p>The Borrower also consents to the Lender for sharing such information with its third-party affiliates including credit evaluation agencies and service providers to carry out the processes necessary for the sanction and disbursements under the Facility and maintenance of the Facility, in accordance with Applicable Law.</p>


<p><strong>Rights and Obligations of Parties</strong></p>

<p>The Borrower agrees to immediately notify the Lender for any change of address or update the particulars submitted by the Borrower at the time of the Facility application including, inter alia change in employment, bank account details, phone number, email id, and other contact details, also including any event which affects the Borrower of his ability to perform his obligation under this agreement.)</p>

<p>Borrower Authorizes Lender to conduct test runs for verifications of its bank account including other modes which Lender may adopt to check the authentication of Borrower as it may deem fit.</p>

<p>The Lender has the right to retain the Facility application form along with the information provided in the application by the Borrower for the purpose of regulatory compliance in terms of Applicable Law.</p>

<p>The Borrower hereby authorizes the Lender at the cost of the Borrower to engage one or more person(s) / agencies to verify any fact or information furnished by, concerning and pertaining to the Borrower and collect the outstanding amount and / or to enforce any security and may furnish to such person/s such documents, information, facts and figures as it may deem fit.</p>

<p>Nothing contained in this Agreement shall prejudice or in any way affect the rights vested in the Lender under Applicable Law.</p>

<p>The Borrower shall not under any circumstance withhold the payment of monies as liable by borrower to Lender as mentioned under this agreement.</p>


<p><strong>Fees, Charges, Repayment and Extension of Repayment Date</strong></p>

<p>The Borrower undertakes to repay the amounts outstanding under the Facility in full amount on the Repayment Date, as well as the stipulated Fees together with the applicable taxes under the Sanction letter and facility summary schedule in this agreement, if any, incurred during the course of the Agreement on Repayment Date or satisfaction date as agreed by the parties. </p>

<p>Any payment received from the borrower under the facility which stands due on the Repayment Date shall be deemed to be late if its re-payment is beyond 24 hours of the Repayment Date or any other date as agreed. Thus, the same shall be considered as a late payment and applicable late fees, interest and charges shall automatically apply and the Borrower unconditionally agrees to pay the same to the lender. In case the Repayment Date would fall on a weekend or on a bank holiday in Mumbai, Maharashtra, the payment shall be due on the next Business Day (‘Business Day’ means any day on which government banks are open for business in Maharashtra).</p>

<p>Interest (if any applied) will be computed on the basis of the actual number of days elapsed. Thus, Borrower hereby confirms and agrees that the interest (if any applied) shall be applied on the principal amount including the Disbursement Fees up to the date of full repayment by the Borrower, on a daily basis and agrees to the method of computation of final repayment as mentioned under the Facility summary schedule of this agreement.(GK: As clarified above in Sanction letter)</p>

<p>The Borrower is also liable to pay bounce charges, late payment fee/charges on non-payment of outstanding or balance amount on the Repayment Date, as per the Late payment fee and charges table in the Facility Sanction letter and the Facility summary schedule of this agreement. </p>

<p>Lender holds unilateral authority to change the rate of interest (if any applied) or the Disbursement Fees on Facility undertaken by Borrower, other charges and fees such as bounce charge, late payment fee/Penal interest etc. and further shall inform the Borrower of said change prior to implementation of change in interest (if any applied) rates. These changes will be effective only prospectively and due notice of the same is provided to the customers, through the acceptable means of communication. The customer should be bound by such revision made by the Lender and shall be governed by this Agreement terms and conditions and terms applicable through Facility sanction letter and Facility summary schedule of this agreement. The Borrower shall also be liable to bear other costs including the collection & legal cost, as associated with the failure of discharge of its obligations under the Facility as specified in the Agreement.</p>

<p>In the case where the Employer has agreed to deduct the amounts due from the salary of the Borrower, consent having been provided to the Employer by the Borrower, and paid to Lender, the Lender will credit the account of the Borrower with the funds received. In the event of non-payment or a balance shortfall, the Borrower will be responsible to make the payment to settle the account for all the amounts due.</p>

<p>All payments due from the Borrower to the Lender under this Agreement will be made by direct transfer to the bank account using ENACH, online payment gateway or any other electronic means into the bank account of the Lender.</p>

<p>The ECS/ NACH mandate or any other electronic or other clearing mandate given by the Customer shall be valid throughout the respective date of such ECS/ NACH mandate or such other mandate given by the Customer and the same shall be valid for the initial Facility as well as the subsequent facilities availed or to be availed by the Customer, from time to time, under the Agreement. The Lender shall present such mandate from time to time in the Customer’s bank account towards the payment of the Outstanding, with or without advance intimation to the Customer and the Customer shall not claim that the ECS/ NACH mandate or such other mandate given by the Customer is invalid due to any reason whatsoever. The Customer shall ensure availability of sufficient funds in the bank account on which ECS/NACH mandate or such other mandate has been given by the Customer in favour of the Lender and the Customer shall not at any time close such bank account and/ or issue any notice instructing the Lender to suspend the ECS/ NACH mandate or instruct the relevant bank to terminate or revoke the ECS/NACH mandate. The Customer shall ensure that the bank account shall be debited towards the Outstanding amounts and in case bank account has not been debited, the Customer shall be obliged to inform the Lender in this regard within 3 (three) days from the due date. </p>

<p>The Customer agrees, confirms and understands that the Lender shall, at its sole discretion, at multiple occasions on different dates, present in the Customer’s bank account, the ECS/ NACH mandate or any other electronic or other clearing mandate (given by the Customer in favour of the Lender covering all the Outstanding) which returns unpaid, for recovering the outstanding dues from the Customer. The Customer shall not dispute, complain or object to such presentation by the Lender. Any dispute or difference of any nature whatsoever shall not entitle the Customer to withhold or delay payment under the Facility agreement and the ECS/ NACH mandate or any other electronic or other clearing mandate shall be presented to the designated bank on the respective due dates.</p>

<p>The Borrower shall bear all costs and other expenses incurred in relation to the completion of this Agreement and in complying with the terms and conditions, including any and all costs incurred in connection with this Agreement such as stamp duty and any other similar taxes payable in respect of this Agreement.</p>

<p>The Borrower holds the responsibility to make the payment to Lenders. The clearance of payment via modes provided by Lender on Repayment Date shall be sole responsibility of Borrower. Any default shall be the sole responsibility of Borrower and Lender holds all authority to charge bounce charges, late payment fee/penal interest, charges and fee as mentioned under this agreement. All payments made online should be cleared on the Repayment Date or satisfaction date, failure which applicable bounce charges, late fee, penal interest (if any applied) and other charges as detailed under this agreement shall be charged to the borrower.</p>

<p>The Lender may at its sole discretion change the mode and manner of payment of any or all amounts due. Thus, Borrower unconditionally agrees that he shall make payment in accordance with such manner and in such mode as may be directed by Lender from time to time.</p>

<p><strong>Closure of Facility</strong></p>

<p>The Borrower may exercise the option to close the Facility and may obtain information about payment options from the customer service of the Lender.</p>

<p><strong>Default</strong></p>

<p>The occurrence of any of the following events shall each constitute an event of default ("<strong>Event of Default</strong>")</p>

<p>Any breach of, or non-compliance by the Borrower of the terms & conditions of this Agreement or any other agreement entered into in respect of this Facility or any other financial assistance availed of by the Borrower from the Lender;</p>

<p>Any representation made by the Borrower under or in connection with this Agreement being proven to have been incorrect or misleading,</p>

<p>Non-adherence to the payment Schedule by the Borrower or his failure to pay the final re- payment or any part thereof in accordance with the terms of the Agreement;</p>

<p>Insolvency of the Borrower and inability of the Borrower to repay their debts;</p>

<p>Any concealment of any material document or event by the Borrower;</p>

<p>Submission of any forged document by the Borrower;</p>

<p>Any other event which in the sole opinion of the Lender would endanger the repayment of the amounts outstanding under the Facility.</p>

<p>Consequences of an Event of Default</p>

<p>Upon the occurrence of an Event of Default, the Lender may, without prejudice to any rights that it may have, take such action as it deems fit, including but not limited to:</p>

<p>Declare all amounts payable by the Borrower, including all interest (if any applied), charges, fees and taxes payable in terms of this Agreement, to be due and payable immediately.</p>

<p>Charge interest indicated in the facility summary schedule of this agreement.</p>

<p>Proceed against the Borrower and take any legal action for the recovery of the amounts outstanding under the Facility along with interest, charges and expenses.</p>

<p>Disclose and furnish to the Credit Information Companies (Bureaus) and/or RBI and any other agency authorised in this behalf by the RBI, the name of the Borrower.</p>

<p>Stipulate any additional conditions, including inter alia, revision in interest rate (if any applied), stipulation of additional obligations and recall of the amount outstanding under the Facility; and/or</p>

<p>Exercise any right available to the Lender under Applicable Law.</p>

<p>Seek repayment of loan from the employer as the same is to be either adjusted from his monthly payment or full and final settlement. </p>

<p>In addition to the rights specified in this Agreement, the Lender shall be entitled to take all or any action with or without intervention of the courts to recover the amount due and payable by the Borrower under this Agreement.</p>

<p>Notwithstanding any other rights available to the Lender under this Agreement, the Lender at its sole discretion shall be entitled close the Facility seeking immediate repayment as well as initiate criminal proceedings or take any other appropriate actions against the Borrower if at any time, the Lender has sufficient grounds to believe that the Borrower has made any misrepresentations and/ or submitted any forged documents or fabricated data to the Lender. Lender further holds absolute discretion to close the Facility and demand payment for the outstanding amount, as stipulated prior to the repayment date, if lender has sufficient grounds to believe that borrower shall be incapable to pay back the outstanding amount on repayment date.</p>

<p>All rights and powers conferred on the Lender under this Agreement shall be in addition and supplemental to any rights the Lender has as a creditor against the Borrower under Applicable Law and shall not be in derogation thereof.</p>

<p>In addition to the aforesaid legal actions for recovery, Lender shall have an unqualified right to disclose or publish the name and details of Borrower on event of default through any medium in its absolute discretion may think fit.</p>

<p>In the event of the death of Borrower, the legal heirs of Borrower shall be liable to discharge said amounts outstanding under the facility from assets of Borrower to Lender. This Agreement shall be binding on and inure to the benefit of the Parties and their respective successors and permitted assigns.</p>


<p><strong>Assignment</strong></p>

<p>It is expressly agreed that the Borrower shall not be entitled to assign, either directly or indirectly, the rights and obligations set out herein.</p>

<p>The Lender shall at any time, without reference to the Borrower be entitled to securitize, sell, assign, discount or transfer all or any of the Lender’s rights and obligations under this Agreement together to any person(s) of the choice of the Lender, in whole or in part and in such manner as the Lender may decide. Any such sale, assignment or transfer shall bind the Borrower, conclusively.</p>

<p>LiquiLoans is a non-banking financial company engaged in the business of providing peer to peer lending platform for enabling loan facilitation via online medium or otherwise, to a wide range of participants. LiquiLoans has conducted the requisite due diligence of the participants and credit assessment and risk profiling of the Borrower and has disclosed the same to the investors in the platform.  The investors in the platform being satisfied with the information furnished by the LiquiLoans, have agreed to grant the Loan, on the terms and conditions as contained in this Agreement.</p>

<p>   The borrower and investor both understand that the investor is earning up to 12% interest (APR) on this loan AND the investor, <strong>being the person who has agreed to grant the loan</strong> to the Borrower through LiquiLoans.</p>

<p><strong>The borrower understands and agrees to limit his obligations to a maximum of INR 10 lakhs across all peer to peer platforms within India.- </strong></p>

<p><strong>Borrower agrees that they have not availed any loans through any other peer to peer lending platforms and any such loans will be availed with the prior written consent of the Lender</strong>.</p>
<p>     </p>
<p>    <strong>The Lender shall at any time, at its absolute discretion have the right to combine or consolidate or divide any of the accounts of the Borrower with the Lender towards part or full satisfaction of the liabilities of the Borrower on any other account or in any respect</strong></p>

<p>     The Borrower agrees to produce any documents / additional documents as may be required by the Lender from time to time. Further, the Borrower hereby agrees to permit the Lender, the LiquiLoans and their authorized representatives to contact / meet the Borrower at their place of residence and / or employment and / or any other place for collection of dues under this Agreement.</p>
<p> </p>
<p><strong>Severability</strong></p>

<p>If any provision in this Agreement shall be found or be held to be invalid, void or unenforceable, then the meaning of said provision shall be construed, to the extent feasible, so as to render the provision enforceable, and, if not feasible the interpretation would save such provision, it shall be severed from the remainder of this Agreement and the remaining Agreement shall in no way be affected, impaired or invalidated and in such an event, the Parties shall use best efforts to negotiate, in good faith, a substitute, valid and enforceable provision or agreement, which most nearly reflects the Parties’ intent in entering into this Agreement.</p>


<p><strong>Notices, Complaints and communication</strong></p>

<p>Every notice, request, demand or other communication under this Agreement shall:</p>

<p>be in writing, and unless otherwise stated, may be made by electronic mail or letter, or any other mode as decided by the Lender,</p>

<p>be sent to the Borrower to the address mentioned in this agreement and to the Lender at its office address first herein above mentioned and to the address mentioned this agreement, or to such other address as either Party may in writing hereafter notify to the other Party.</p>

<p>be through mobile application i.e SMS or Email registered with Service Provider</p>

<p>Any other mode as permitted by statutory authorities including modes permitted or accepted through judgment or rulings of Courts of India from time to time.</p>

<p>The notice deemed to have been received when delivered personally or at the time so delivered and if given by registered post/speed post, 48 hours after it has been put into post or deemed delivered electronically, the moment it has been sent by Lender on activated on the registered mobile number or any other contact number provided by Borrower.</p>

<p>Complaints and grievances should be submitted in writing to the postal address of the Lender, or by sending an e-mail to the Lender pursuant to the Grievance Redressal Policy made available on the Lender’s website. The Lender will consider the complaint and provide resolution within 10-30 days for all complaints.</p>

<p>In case the 30 days term will not be met due to the complexity of the claim, the Lender shall notify the Borrower indicating the reasons for the inability to meet the deadline of 30 days, and additional details if any.</p>

<p>The Lender may (but is not obliged to) send short message services (SMS) or call the Borrower to intimate him on any outstanding dues payable by him and under the Agreement. The Borrower hereby specifically authorizes the Lender to make such phone calls or send SMS or emails.</p>


<p><strong>Final Provisions</strong></p>

<p>This Agreement shall be deemed to be executed at Mumbai, Maharashtra and be governed by, and construed in accordance with, the laws of India and Courts at Mumbai, Maharashtra shall have exclusive jurisdiction to settle all disputes arising out of this agreement.</p>

<p>The non-exercise of a right by either Party under this Agreement shall not constitute a waiver of such right of such Party, at any time thereafter, to insist upon performance by the other, in accordance with the terms thereof.</p>

<p>The Borrower shall within 7 business days of demand, indemnify the Lender against any cost, loss or liability incurred by that Lender as a result of the occurrence of any event of default, any information produced or approved by the Borrower being or being alleged to be misleading and or deceptive in any respect, any enquiry, investigation, subpoena (or similar order) or litigation with respect to the transactions contemplated or financed under this agreement.</p>

<p>This agreement and the other documents attached hereto or referred to herein integrate all the terms and conditions mentioned herein and or incidental hereto, supersede all oral negotiations and prior writing in respect of the subject matter hereof if any. In the event of any conflict between the terms & conditions and stipulation of this agreement and any agreement or documents executed hereto or referred to herein, then in such event, the stipulations of this agreement shall prevail.</p>




<p>THIS AGREEMENT IS AN ELECTRONIC RECORD IN TERMS OF THE INFORMATION TECHNOLOGY ACT, 2000 AND APPLICABLE RULES THEREUNDER, AS AMENDED FROM TIME TO TIME. THIS ELECTRONIC RECORD IS GENERATED BY A COMPUTER SYSTEM AND DOES NOT REQUIRE ANY PHYSICAL OR DIGITAL SIGNATURES</p>


<p><strong>CREDIT FACILITY SUMMARY SCHEDULE</strong></p>

<p><strong>COMMERCIAL DETAILS OF FACILITY AMOUNT, INTEREST, FEES, PENALTIES AND </strong></p>

<p><strong>EXTENSION OF REPAYMENT DATE FOR FACILITY UNDERTAKEN BY BORROWER</strong></p>

<table style="border: 1px solid black; border-collapse: collapse;">
  <tr>
    <th style="border: 1px solid black; border-collapse: collapse;">Product Description</th>
    <th style="border: 1px solid black; border-collapse: collapse;">Earned Salary Linked Line of Credit</th>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">Facility Sanction Amount</td>
    <td style="border: 1px solid black; border-collapse: collapse;">₹ <span>{loanAmount}</span></td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">Sublimit/Draw limit</td>
    <td style="border: 1px solid black; border-collapse: collapse;">Calculated based on the Amount of salary earned or accrued up to the date of request for Disbursement less amounts withdrawn in the current salary cycle. Total amount withdrawn between 2 salary dates cannot exceed the Facility Sanction Amount.</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">Number of Disbursements per month</td>
    <td style="border: 1px solid black; border-collapse: collapse;">Multiple</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">Validity of Facility</td>
    <td style="border: 1px solid black; border-collapse: collapse;">12 months from the date of this agreement.</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">Disbursement Fee (Including GST)</td>
    <td style="border: 1px solid black; border-collapse: collapse;">₹ <span>{processingFees}</span> /- (incl GST)</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">Transaction charges</td>
    <td style="border: 1px solid black; border-collapse: collapse;">NIL</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">Interest Rate</td>
    <td style="border: 1px solid black; border-collapse: collapse;">Not chargeable until the term of the loan and subject to other charges</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">Drawdown Date</td>
    <td style="border: 1px solid black; border-collapse: collapse;">Anytime in the salary cycle</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">Repayment Due Date</td>
    <td style="border: 1px solid black; border-collapse: collapse;">
      <ul>
        <li>Where Employer deducts from salary: Salary credit date</li>
        <li>Where Client is responsible for the repayment: 5th of the subsequent month</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">Amount to be Repaid</td>
    <td style="border: 1px solid black; border-collapse: collapse;">
      <ul>
        <li>Where Employer deducts from the salary: Amount outstanding on salary credit date</li>
        <li>Where Client is responsible for the repayment: Amount outstanding on 5th of the month</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">ECS/Auto debit/NACH Bounce Charges</td>
    <td style="border: 1px solid black; border-collapse: collapse;">₹ 100 /- for every ECS/Auto Debit/NACH bounce. Inclusive of all applicable taxes.</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">Late payment- fees and charges</td>
    <td style="border: 1px solid black; border-collapse: collapse;">
      <ul>
        <li>NA- where the repayment is made through deduction from salary by the employer and payment is made within the stipulated tenure.</li>
        <li>(Refer to Section-1 on “Late payment fees and charges”) - for all clients who are responsible for their own repayment And clients for whom the Employer is not able to deduct from the Salary due to the Employee having quit the job and payroll is no longer processed by the Employer.</li>
    </ul>
    </td>
  </tr>
</table>


<p><strong>Section 1 : Late payment fees and Charges (INR) (Inclusive of all applicable taxes)</strong></p>

<table style="border: 1px solid black; border-collapse: collapse;">
  <tr>
    <th style="border: 1px solid black; border-collapse: collapse;">Outstanding amount (INR)</th>
    <th style="border: 1px solid black; border-collapse: collapse;">Due date +15 days</th>
    <th style="border: 1px solid black; border-collapse: collapse;">Due date +30 days</th>
    <th style="border: 1px solid black; border-collapse: collapse;">Due date +60 days</th>
    <th style="border: 1px solid black; border-collapse: collapse;">Due date +90 days</th>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">&lt=1000</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">1001-5000</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">5001-10,000</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">10,001-25,000</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">25,001-50,000</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; border-collapse: collapse;">&gt50,000</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
    <td style="border: 1px solid black; border-collapse: collapse;">xxxx</td>
  </tr>
</table>

<p>The late payment fee is a cumulative charge based on Days past the Due date, as per the table above and is exclusive of interest (if applicable) which may be charged on total outstanding in case the amount remains at default.</p>
<p>As an example:</p>
<p><strong>User 1-</strong> Outstanding amount INR 6000, pays post 16 Days past the Due Date, he will be charged a late payment fee of INR 150. </p>
<p><strong>User 2-</strong> Outstanding amount INR 6000, pays post 65 Days past the Due Date, he will be charged a late payment fee of INR 600. </p>`,
};

export default agreement;
