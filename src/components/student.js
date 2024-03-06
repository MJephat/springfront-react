import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {  useParams} from 'react-router-dom';
import axios from 'axios';

import { Container, Paper, Table,TableHead,TableRow, TableBody, TableCell, TableContainer} from '@mui/material';

export default function Student() {
    const paperStyle={padding: '50px 20px', width:750,margin:'10px auto'}
    const [name, setName]=useState('')
    const [percentage, setPercentage]= useState('')
    const [branch, setBranch]=useState('')
    const [students, setStudents]=useState([])
    const {rollNo}=useParams()


    useEffect(() =>{
        loadStudents();
    }, [])

    

    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,percentage,branch}
        console.log(student)
        fetch('http://localhost:8081/students/add',{
            method:'POST',
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(student)
          
        }).then(()=>{
            console.log("New Student added")
        })
        loadStudents();
    }


    const loadStudents = async () =>{
        const result = await axios.get("http://localhost:8081/students")
        setStudents(result.data)
    }
    // useEffect(()=>{
    //     fetch("http://localhost:8081/students")
    //     .then(res => res.json())
    //     .then((result)=>{
    //         setStudents(result);
    //         }
    //     )
    // }, []) 

   


    const deleteStudent=async (rollNo)=>{
        await axios.delete(`http://localhost:8081/student/delete/${rollNo}`);
        loadStudents()
    }
  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h2 style={{color:'#5d5555'}}><u>Add Student</u></h2>
    <Box
      component="form"
      sx={{'& > :not(style)': { m: 1,  },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="student name"    fullWidth
      value={name} onChange={(e)=>setName(e.target.value)}/>
      <TextField id="filled-basic" label="student percentage"  fullWidth
      value={percentage} onChange={(e)=>setPercentage(e.target.value)}/>
      <TextField id="standard-basic" label="student branch"  fullWidth
      value={branch} onChange={(e)=>setBranch(e.target.value)} />
       <Button style={{background:'#2a9df4'}} variant="contained" disableElevation onClick={handleClick}>
        Submit
    </Button>
    </Box>
    {/* {name}, */}
    {/* {percentage}, */}
    {/* {branch} */}
    </Paper>

    {/* <Paper elevation={3} style={paperStyle}>
    <h2 style={{color:'#0080bf'}}><u>All Students</u></h2>
        {students.map(student=>(
            <Paper elevation={6} style={{margin:'10px', padding:"15px", textAlign:"left"}} key={student.rollNo}>
                Id:{student.rollNo};
                Name:{student.name};
                Percentage:{student.percentage};
                Branch:{student.branch};
            </Paper>
        ))}

    </Paper> */}
    <Paper elevation={3} style={paperStyle}>
    <h2 style={{color:'#5d5555'}}><u>All Students</u></h2>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead style={{color:'black',fontWeight:'400'}}>
          <TableRow>
            <TableCell>ID (rollNo)</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Percentage</TableCell>
            <TableCell >Branch</TableCell>
            <TableCell >Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {students.map((student)=>(
                <TableRow key={student.rollNo}>
                    <TableCell component="th" scope="student">{student.rollNo}</TableCell>
                    <TableCell >{student.name}</TableCell>
                    <TableCell >{student.percentage}</TableCell>
                    <TableCell >{student.branch}</TableCell>
                    <IconButton onClick={()=>deleteStudent(student.rollNo)} aria-label="delete" size="small" style={{color:'#ff0000'}}>
                            <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton  aria-label="edit" size="small" style={{color:'#ffa500'}}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    
                </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
    </Paper>
    </Container>
  );
}


