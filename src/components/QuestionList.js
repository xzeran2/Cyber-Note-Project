import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/QuestionList.css';
import {
  AppBar, Box, Button, ButtonGroup, Container, Dialog, Alert, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Paper, Stack, styled, TextField, Toolbar, Typography} from '@mui/material';

import {
  Delete as DeleteIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';

  const QuestionList = () => {
  const [question, setQuestion] = useState({
    id: '',
    name: '',
    contents: '',
    reply: '',
  });

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const navigate = useNavigate();
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
    
  }

  const closeDrawer = () => {
    setState({ ...state, 'top': false });
    // Drawer가 닫힐 때 추가적인 로직 수행
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Instructor Info', 'Lecture Notes', 'Send email', 'Contact'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
      <ListItem key={'Exit'} disablePadding onClick={() => toggleDrawer(anchor, false)}>
            <ListItemButton  onClick={closeDrawer}>
              <ListItemIcon>
                <DeleteIcon/>
              </ListItemIcon>
              <ListItemText primary={'Exit'} />
            </ListItemButton>
      </ListItem>
      </List>
    </Box>
  );

  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#bcdafa' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1.5),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'pre-wrap', 
  }));

  
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/questions/list');
      setQuestions(response.data);
      setStatus('List up OK!');
    } catch (error) {
      setStatus('List up Fail!!', error);
    }
  };

  const handleAddQuestion = () => {
    const newQuestion = { ...question };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    saveQuestionToDatabase(newQuestion);
  };

  const saveQuestionToDatabase = async (newQuestion) => {
    try {
      await axios.post('http://localhost:3001/api/questions/add', newQuestion);
      await fetchQuestions();
      setStatus('Questions Add OK!');
    } catch (error) {
      setStatus('Questions Add Error!!');
    }
  };

  const handleClearQuestions = () => {
    setOpen(true);
  };

  const handleClearQuestionsClose = () => {
    setPassword('');
    setOpen(false);
  };

  const checkPasswordAndDelete = async () => {
    if (password === '1234') {
      try {
        await axios.delete('http://localhost:3001/api/questions/delete');
        fetchQuestions();
        handleClearQuestionsClose();
        setStatus('Delete OK!');
      } catch (error) {
        setStatus('Error deleting questions:', error);
      }
    } else {
      setStatus('Incorrect Password!!');
    }
  };

  const getAnswerStatus = (reply) => {
    return reply === '' ? 'Waitng' : 'Done';
  };

  const getAnswerStatusColor = (reply) => {
    return reply === '' ? '#f08888' : '#8997e7';
  };

  const handleMenuClick = () => {
    const anchor = 'top';
    console.log(anchor);
    setState({ ...state, [anchor]: true });
  };

  return (
  <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
          <SwipeableDrawer
            anchor="top"
            open={state['top']}
            onClose={toggleDrawer('top', false)}
            onOpen={toggleDrawer('top', true)}
            closeDrawer={state['top']}
          >
        {list('top')}
      </SwipeableDrawer>
          <MenuIcon/>
          </IconButton>
          <Typography m={1}variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Cyber Note
          </Typography>
          <Button color="inherit" component={Link} to="/students">
              Students
          </Button>
        </Toolbar>
      </AppBar>
      </Box>
      <Box sx={{ width: '100%'}}>
      <Stack spacing={0}>
        {questions.map((question, index) => (
            <Item key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link to={`/answer/${question.id}`}>{question.id} ({question.name}) : {question.contents}</Link>
              <span style={{ color: getAnswerStatusColor(question.reply) }}>{getAnswerStatus(question.reply)}</span>
            </Item>
        ))}
      </Stack>
     </Box>

     <Stack spacing={0} sx={{ border: '1px solid #bcdafa', borderRadius: '8px' }}>
      <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 4},
        height: '110px',
      }}
      >
        <TextField
          helperText="Please enter your id ex) A-1"
          id="demo-helper-text-aligned"
          label="ID"
          value={question.id}
          onChange={(e) => setQuestion({ ...question, id: e.target.value })}
     
      />
        <TextField
          helperText="Please enter your name"
          id="demo-helper-text-aligned"
          label="NAME"
          value={question.name}
          onChange={(e) => setQuestion({ ...question, name: e.target.value })}
        />
      </Box>
      <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1},
        
      }}
      >
       <TextField    
          helperText="If you have any questions, ask me!"      
          multiline
          rows={2} 
          value={question.contents}
          onChange={(e) => setQuestion({ ...question, contents: e.target.value })}
          fullWidth
          label="Contents"
          id="fullWidth"
        />
      </Box>
      <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > :not(style)': { m: 1},
      }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button size="large" variant="outlined" onClick={handleAddQuestion}>Question</Button>
          <Button size="large" variant="outlined" onClick={handleClearQuestions}>ALL Delete</Button>
          <Button size="large" variant="outlined" onClick={fetchQuestions}>DATA Load</Button>
        </ButtonGroup>
      </Box>
      </Stack>
      {status && (
        <Alert severity="info" sx={{ mt: 1 }}>
          {status}
        </Alert>
      )}          
      <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClearQuestionsClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClearQuestionsClose();
          },
        }}
      >
        <DialogTitle>ALL DATA DELETE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please enter admin password here. you
            will delete all data immediately.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearQuestionsClose}>Cancel</Button>
          <Button onClick={checkPasswordAndDelete} type="submit">DELETE</Button>
        </DialogActions>
        </Dialog>
      </React.Fragment>
  </Container>
  );
};

export default QuestionList;
