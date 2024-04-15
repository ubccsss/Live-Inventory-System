import "../index.css";
import "../styles/reimburse.css"
import Navbar from "./Navbar";
import { Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { IRootState } from "../App";
import { useDispatch } from 'react-redux';
import { displayReceipt, displayBankStatement, uploadBankStatement, uploadReceipt, saveReminbursement, submitReminbursement } from "../redux/reimbursement";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
 


interface UploaderProps {
	fileType?: string | AcceptedFileType[];
  }
  
enum AcceptedFileType {
	Pdf = ".pdf"
}


const Reimburse  = (props: UploaderProps) => {
	
	const dispatch = useDispatch();
	const [viewReceipt, setViewReceipt] = useState<boolean>(true);
	const selectedColor = "selectedColor";
	const unselectedColor = "unselectedColor";
	const [receiptTabColor, setReceiptTabColor] = useState(selectedColor);
	const [BSTabColor, setBSTabColor] = useState(unselectedColor);
	const [uploadedReceiptFile, setUploadedReceiptFile] = useState<File | undefined>(undefined);
	const [uploadedBankStatementFile, setUploadedBankStatementFile] = useState<File | undefined>(undefined);
	const [preview, setPreview] = useState<string | undefined>(undefined);

	function triggerFileUpload() {
		document.getElementById('formFile')?.click();
	}
	
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if(viewReceipt){
			setUploadedReceiptFile(file);
		}else{
			setUploadedBankStatementFile(file);
		}
		
	};

	useEffect(() => {
		if(viewReceipt && !uploadedReceiptFile){
			setPreview(undefined);
			return;
		}else if(!viewReceipt && !uploadedBankStatementFile){
			setPreview(undefined);
			return;
		}else if(viewReceipt && uploadedReceiptFile){
			const receiptFileUrl = URL.createObjectURL(uploadedReceiptFile);
			setPreview(receiptFileUrl);
			return () => URL.revokeObjectURL(receiptFileUrl);
		}else if(!viewReceipt && uploadedBankStatementFile){
			const BSFileUrl = URL.createObjectURL(uploadedBankStatementFile);
			setPreview(BSFileUrl);
			return () => URL.revokeObjectURL(BSFileUrl);
		}
	}, [uploadedReceiptFile, uploadedBankStatementFile, viewReceipt]);

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

			<div className="previewBackground">
				{(uploadedReceiptFile || uploadedBankStatementFile) && <iframe className="preview" src={preview} />}
			</div>

			<div className="buttonGroup">
				<Form.Group controlId="formFile" className='formFile'>
					<Form.Control type="file" accept=".pdf, .png, .jpg, .jpeg" className="hiddenElement" onChange={handleFileChange} hidden />
					{viewReceipt && <Form.Control plaintext readOnly className='button-d9c4e3-21px-OpenSans' type="button" value="Upload Receipt" onClick={triggerFileUpload} aria-pressed="true"/>}
					{!viewReceipt && <Form.Control plaintext readOnly className='button-d9c4e3-21px-OpenSans' type="button" value="Upload Bank Statement" onClick={triggerFileUpload} aria-pressed="true"/>}
				</Form.Group>
				
				<Button id="Save" className='button-d9c4e3-21px-OpenSans' type="button" aria-pressed="true">
					New Reimbursement
				</Button>
				<Button id="Save" className='button-d9c4e3-21px-OpenSans' type="button" aria-pressed="true" onClick={() => dispatch(saveReminbursement(""))}>
					Save
				</Button>
				<Button id="Submit" className='button-d9c4e3-21px-OpenSans' type="button" aria-pressed="true" onSelect={() => dispatch(submitReminbursement(""))}>
					Submit
				</Button>
			</div>
		</div>
  );


};

export default Reimburse;
