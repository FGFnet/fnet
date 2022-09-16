import React, {useState} from 'react'
import {Header} from '../../component';
import {TextField, Checkbox, Paper, Table, TableBody,TableCell, TableContainer,TableHead,TableRow} from '@mui/material';
import {BsSearch , BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs';


interface registerData {
  id : number;
  name : string;
  phoneNumber : number;
  LC : string;
  submit : boolean;
}

const createdata = (
  id : number,
  name : string,
  phoneNumber : number,
  LC : string,
  submit : boolean,
)=>{
  return { id , name, phoneNumber, LC, submit};
}


const originalRows : registerData[] = [
  {id : 1, name: "박민서", phoneNumber : 1243, LC : "LC23", submit : true},
  {id : 2, name: "이승준", phoneNumber : 5213, LC : "LC21", submit : true},
  {id : 3, name: "정노원", phoneNumber : 2567, LC : "LC96", submit : false},
  {id : 4, name: "심지연", phoneNumber : 3426, LC : "LC43", submit : true},
  {id : 5, name: "장선영", phoneNumber : 8245, LC : "LC63", submit : false},
  {id : 6, name: "이창준", phoneNumber : 1238, LC : "LC78", submit : true},
  {id : 7, name: "배성빈", phoneNumber : 1263, LC : "LC12", submit : false},
]


export default function RegisterScreen() {
  const [rows, setRows] = useState<registerData[]>(originalRows);
  const [searched, setSearched] = useState<string>("");

  const requestSearch = (SearchVal :string) => {
    setSearched(SearchVal)
    const filteredRows = originalRows.filter((row) => {
      return row.name.toLowerCase().includes(SearchVal.toLowerCase());
    });
  setRows(filteredRows);
};

 const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>, id: number, data :registerData ) => {
  const updatedRows = rows.map(data => {
    if (data.id == id){
      return {...data, submit: event.target.checked}
    }
    return data;
  })
  setRows(updatedRows);
 }

  return (
    <React.Fragment>
      <Header title = "접수" />
    <Paper>
    <>
    <TextField 
    id="standard-basic"
    label = "이름"
    value={searched}
    onChange={(event) => requestSearch(event.target.value)}
    >
    </TextField>
    <BsSearch/>
    </>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">#</TableCell>
            <TableCell align="right">이름</TableCell>
            <TableCell align="right">전화번호</TableCell>
            <TableCell align="right">LC</TableCell>
            <TableCell align="right">접수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right">{row.LC}</TableCell>
              <TableCell align="right">{<Checkbox 
              checked ={row.submit}
              onChange = {(event)=>handleCheckBox(event, row.id, row)}
              icon={<BsSuitHeartFill />} checkedIcon={<BsSuitHeart />}/>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </React.Fragment>
  );
}