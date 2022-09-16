import React, {useState} from 'react'
import {Header} from '../../component';
import {TextField, Checkbox, Box, Table, TableBody,TableCell, TableContainer,TableHead,TableRow} from '@mui/material';
import { BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs';
import { Container } from '@mui/system';


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
      <Container maxWidth="lg">
      <Header title = "접수" />
    
    <Box sx={{marginTop:3, display:'flex', justifyContent:"right", alignItems:"center"}}>
      <TextField sx={{marginRight:2}}
      id="standard-basic"
      label = "이름"
      value={searched}
      onChange={(event) => requestSearch(event.target.value)}
      >
      </TextField>
    </Box>
    
    <TableContainer sx= {{}}component={Container}>
      <Table sx={{ }} aria-label="dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">이름</TableCell>
            <TableCell align="center">전화번호</TableCell>
            <TableCell align="center">LC</TableCell>
            <TableCell align="center">접수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.phoneNumber}</TableCell>
              <TableCell align="center">{row.LC}</TableCell>
              <TableCell align="center">{<Checkbox 
              checked ={row.submit}
              onChange = {(event)=>handleCheckBox(event, row.id, row)}
              icon={<BsSuitHeartFill />} checkedIcon={<BsSuitHeart />}/>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    </Container>
    </React.Fragment>
  );
}