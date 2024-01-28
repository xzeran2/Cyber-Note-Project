import * as React from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useParams, useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  display: 'flex',
  justifyContent: 'space-between', // Adjust spacing between items
  alignItems: 'center', // Center items vertically
  margin: theme.spacing(2), // Adjust margin for spacing
}));

export default function DirectionStack() {
    const navigate = useNavigate();
    const handleStudentClick = (studentId) => {
      // Redirect to the student page with the studentId
      navigate(`/student/${studentId}`);
    };
    const generateItems = (rowCount, colCount) => {
    const items = [];

    for (let row = 1; row <= rowCount; row++) {
      const rowItems = [];
      for (let col = 1; col <= colCount; col++) {
        const studentId = `${String.fromCharCode('A'.charCodeAt(0) + col - 1)}-${row}`;
        const studentName = 'Mohammad'; // Replace with actual name
        rowItems.push(
            <Item key={`${row}-${col}`} onClick={() => handleStudentClick(studentId)}>
            <Avatar sx={{ width: 40, height: 40, marginRight: 1, backgroundColor: '#bcdafa'}}>🧔</Avatar>
            <div>
              <div>{studentId}</div>
              <div>{studentName}</div>
            </div>
          </Item>
        );
      }
      items.push(
        <Stack key={row} direction="row" spacing={2}>
          {rowItems}
        </Stack>
      );
    }

    return items;
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column', // Set flexDirection to column
          alignItems: 'center', // Center items horizontally
          '& > :not(style)': { m: 1 },
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography m={1} variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Cyber Note
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="back"
              component={Link}
              to="/"
            >
              <ArrowBackIcon />
            </IconButton>
            <Button color="inherit" component={Link} to="/students">
              Students
            </Button>
          </Toolbar>
        </AppBar>
        
        {generateItems(4, 4)}
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button size="large" variant="outlined" >Empty 1</Button>
          <Button size="large" variant="outlined" >Empty 2</Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
}
