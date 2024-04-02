import "../index.css";
import "../styles/reimburse.css"
import Navbar from "./Navbar";
import { Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { IRootState } from "../App";
import { useDispatch } from 'react-redux';
import { displayReceipt, displayBankStatement, uploadBankStatement, uploadReceipt, saveReminbursement, submitReminbursement } from "../redux/reimbursement";
import { Upload } from "./PDFUpload";
import { useState } from "react";

const Reimburse = () => {
	const dispatch = useDispatch();
	const [viewReceipt, setViewReceipt] = useState<boolean>(true);
	const selectedColor = "selectedColor";
	const unselectedColor = "unselectedColor";
	const [receiptTabColor, setReceiptTabColor] = useState(selectedColor);
	const [BSTabColor, setBSTabColor] = useState(unselectedColor);
	const [receiptFile, setReceiptFile] = useState<File | undefined>(undefined);
  
	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		setReceiptFile(event?.target?.files?.[0]);
	};
  
	const onUpload = () => {
		console.log(receiptFile);
	};

	const receiptTabSelected = () => {
		setReceiptTabColor(selectedColor);
		setBSTabColor(unselectedColor);
		setViewReceipt(true);
	};

	const BSTabSelected = () => {
		setReceiptTabColor(unselectedColor);
		setBSTabColor(selectedColor);
		setViewReceipt(false);
	};
	
	//const [saved, setSaved] = useState<boolean>(false);
	//const [uploadedReceipt, setUploadedReceipt] = useState<boolean>(false);
	//const [displayReceipt, setDisplayReceipt] = useState<boolean>(false);
	//const [uploadedBankStatement, setUploadedBankStatement] = useState<boolean>(false);
	//const [displayBankStatement, setDisplayBankStatement] = useState<boolean>(false);
	
	//TODO: use callbacks to trigger feedbacks () =>

	return (
	
		<div className="darkmode min-h-screen">
			<Navbar title="Reimburse" needbuttons={true} isofficerpage={true} needtitle={true}/>
			<div className="receipt-name-input-group">
				<label htmlFor="receipt-name">Reimbursement Name:</label>
				<div className="input-group mb-3">
					<input type="text" className="receipt-name" aria-describedby="basic-addon2"/>
				</div>
			</div>

			<div className="tabGroup">
				<button className={`tab ${receiptTabColor}`} onClick={receiptTabSelected}>Receipt</button>
				<button className={`tab ${BSTabColor}`} onClick={BSTabSelected}>Bank Statement</button>
			</div>
			<div className="PDFPreviewBackground"></div>

			<div className="buttonGroup">
				{viewReceipt && (<Button id="UploadReceipt" className='button-d9c4e3-24px-OpenSans' type="button" aria-pressed="true" onClick={() => dispatch(uploadReceipt(""))}>
					Upload Receipt
				</Button>)}
				{!viewReceipt && (<Button id="UploadBank" className='button-d9c4e3-24px-OpenSans' type="button" aria-pressed="true" onSelect={() => dispatch(uploadBankStatement(""))}>
					Upload Bank Statement
				</Button>)}
				<Button id="Save" className='button-d9c4e3-24px-OpenSans' type="button" aria-pressed="true">
					New Reimbursement
				</Button>
				<Button id="Save" className='button-d9c4e3-24px-OpenSans' type="button" aria-pressed="true" onClick={() => dispatch(saveReminbursement(""))}>
					Save
				</Button>
				<Button id="Submit" className='button-d9c4e3-24px-OpenSans' type="button" aria-pressed="true" onSelect={() => dispatch(submitReminbursement(""))}>
					Submit
				</Button>
			</div>
			

		</div>
		
		
	
    
  );
};

export default Reimburse;
