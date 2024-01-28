import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AnswerForm.css';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const AnswerForm = () => {
  const { id: QuestionId } = useParams();
  const [submittedAnswer, setSubmittedAnswer] = useState('');
  const [question, setQuestion] = useState({ id: '', name: '', contents: '', reply: ''});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        if(QuestionId){
          const response = await axios.get(`http://localhost:3001/api/questions/select/${QuestionId}`);
          const { id, name, contents, reply } = response.data[0];

          setQuestion({ id, name, contents, reply });
        }
      } catch (error) {
        console.error('ERROR fetchQuestion:' + {error}, error);
      }
    };
    fetchQuestion();
  }, [QuestionId]);

  const handleAnswerSubmit = async () => {
    try {
      await axios.post(`http://localhost:3001/api/questions/reply/${QuestionId}`, { reply: question.reply });
      setSubmittedAnswer(question.reply);
      console.log(question.reply);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleReplyChange = (e) => {
    // reply 값만 업데이트
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      reply: e.target.value,
    }));
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  return (
    <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1, marginBottom: -1 }}>
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
          <Typography m={1}variant="h4" component="div" sx={{ flexGrow: 1 }}>
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
      </Box>
      <h2 style={{ marginBottom: '0' }}>Question Detail</h2>
      <Stack spacing={0} sx={{ border: '1px solid #bcdafa', borderRadius: '8px' }}>
      <p style={{ textAlign: 'center' }}>{QuestionId}  {question.name}</p>
      <Box sx={{ width: '100%'}}>
      <Item>{question.contents}</Item>
     </Box>
     </Stack>
     
     <h2 style={{ marginBottom: '0' }}>Answer Detail</h2>
     <Stack spacing={0} sx={{ border: '1px solid #bcdafa', borderRadius: '8px' }}>
     <Box sx={{ width: '100%'}}>
      <Item>{question.reply}</Item>
     </Box>
     <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 2},
      }}
      >
       <TextField           
          multiline
          rows={2}
          onChange={(e) => setQuestion({ ...question, reply: e.target.value })}
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
          <Button size="large" variant="outlined" onClick={handleGoBack}>Back</Button>
          <Button size="large" variant="outlined" onClick={handleAnswerSubmit}>Answer</Button>
        </ButtonGroup>
      </Box>
      </Stack>
      {submittedAnswer && (
        <Alert severity="info" sx={{ mt: 0 }}>
          {submittedAnswer}
        </Alert>
      )}  
    </Container>
  );
};

export default AnswerForm;
