import * as React from 'react';
import Box from '@mui/material/Box'; 
//  import { render } from 'react-dom'; //Added
//  import { CheckBox } from '@mui/icons-material';
//  import Button from '@mui/material/Button';
//  import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { gql } from "@apollo/client";
import { useQuery } from '@apollo/client';
import Table from './table';
import TextField from '@mui/material/TextField';
//  import Checkbox from '@mui/material/Checkbox';
//import FormLabel from '@mui/material/FormLabel';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import FormControl from '@mui/material/FormControl';
//import RadioGroup from '@mui/material/RadioGroup';
//import Radio from '@mui/material/Radio';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const GET_GEN_3 = gql`
query Resources3D($search: String!) {
  resources3D(search: $search) {
    description
    id
    issued
    keyword
    landingPage
    license
    title
    publisher {
      accessUrl
      id
      name
    }
  }
}
`;
const DATA_COUNT_ALERT_THRESDHOLD=20
const TRANSLATION_SERVER = "http://140.203.154.194:2999"

const style = {
  position:'absolute',
  padding:'20px',
  top:'10%',
  left:'10%',
  
  display:'block',
  width: '1300px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};


export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [_, setSearch] = React.useState('nokia');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, error, data, refetch  } = useQuery(GET_GEN_3, {
    variables: { search: "nokia" },
  });
  //console.log(data);
// check this https://www.apollographql.com/docs/react/data/queries
   let onchange = (e)=>{
    if (e.target.value.length>=3)
    {
    setSearch(e.target.value);
    console.log("search", e.target.value)
    refetch({ search: e.target.value })
  //  console.log("111111111111111111111111");
    console.log(data)
    ///////////////// Now log language options //////////////////////////////////////////////
    /*
    console.log('EnglishCheck:'+document.getElementById('English-check').checked);
    console.log('FrenchCheck:'+document.getElementById('French-check').checked);
    console.log('DutchCheck:'+document.getElementById('Dutch-check').checked);
    console.log('GermanCheck:'+document.getElementById('German-check').checked);
    console.log('AnyCheck:'+document.getElementById('Any-check').checked);
    */
    ////////////////////////////////////////////////////////////////////////////////////////////DO TRANSLATION
  /// Request transltion server ********************************************Start
  // Using Fetch API
    // create a new XMLHttpRequest
//    const url = "https://dog.ceo/api/breeds/list/all";
// ENGLISH
if (document.getElementById('English-check').checked){
  const url = TRANSLATION_SERVER +"/?content="+ e.target.value;
  fetch(url)
    .then(
      response => response.json() // .json(), .blob(), etc.
    ).then(
      text => {
        console.log(">Translated \""+e.target.value +"\" to English______________________"+text["en"]+"\"") // Handle here     /// Got the English translation
        console.log("Now search for~~~~~~~~~~~~"+ text["en"]);
        console.log() 
        setSearch(text["en"]);
        refetch({ search: text["en"]});
        
      //  Give a warning if there are too few results
      try {
      if (data.resources3D !== undefined){
        if (data.resources3D.length<DATA_COUNT_ALERT_THRESDHOLD){
        /*
          alert("█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
          + "\n (ง •̀_•́)ง  You may want to change your query or the targeted language")
          */
        document.getElementById("warning-box").textContent="█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
        document.getElementById("suggest-box").textContent = "\n (ง •̀_•́)ง  You may want to change your query or the targeted language"
        }
      } else {
        document.getElementById("suggest-box").display= "none";
      }
        console.log(data);
      } catch (error) {}
  }
  );

  
}
// FRENCH
if (document.getElementById('French-check').checked){
  const url = TRANSLATION_SERVER +"/?content="+ e.target.value;
  fetch(url)
    .then(
      response => response.json() // .json(), .blob(), etc.
      
    ).then(
      text => {
        console.log(">Translated \""+e.target.value +"\" to French______________________\""+text["fr"]+"\"") // Handle here     /// Got the English translation
        console.log("Now search for~~~~~~~~~~~~"+ text["fr"]);
        console.log() 
        setSearch(text["fr"]);
        refetch({ search: text["fr"]});
        //  Give a warning if there are too few results
        try {
          if (data.resources3D !== undefined){
            if (data.resources3D.length<DATA_COUNT_ALERT_THRESDHOLD){
            /*
              alert("█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
              + "\n (ง •̀_•́)ง  You may want to change your query or the targeted language")
              */
            document.getElementById("warning-box").textContent="█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
            document.getElementById("suggest-box").textContent = "\n (ง •̀_•́)ง  You may want to change your query or the targeted language"
            }
          } else {
            document.getElementById("suggest-box").display= false
          }
            console.log(data);
          } catch (error) {}
  }
  );

  
}
// DUTCH
if (document.getElementById('Dutch-check').checked){
  const url = TRANSLATION_SERVER +"/?content="+ e.target.value;
  fetch(url)
    .then(
      response => response.json() // .json(), .blob(), etc.
      
    ).then(
      text => {
        console.log(">Translated \""+e.target.value +"\" to Dutch______________________"+text["nl"]+"\"") // Handle here     /// Got the English translation
//        let trans = text["nl"];
        console.log("Now search for~~~~~~~~~~~~"+ text["nl"]);
        console.log() 
        setSearch(text["nl"]);
        refetch({ search: text["nl"]});
                //  Give a warning if there are too few results
                try {
                  if (data.resources3D !== undefined){
                    if (data.resources3D.length<DATA_COUNT_ALERT_THRESDHOLD){
                    /*
                      alert("█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
                      + "\n (ง •̀_•́)ง  You may want to change your query or the targeted language")
                      */
                    document.getElementById("warning-box").textContent="█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
                    document.getElementById("suggest-box").textContent = "\n (ง •̀_•́)ง  You may want to change your query or the targeted language"
                    }
                  } else {
                    document.getElementById("suggest-box").display= false
                  }
                    console.log(data);
                  } catch (error) {}
        
  }
  );

  
}
// DUTCH
if (document.getElementById('German-check').checked){
  const url = TRANSLATION_SERVER +"/?content="+ e.target.value;
  fetch(url)
    .then(
      response => response.json() // .json(), .blob(), etc.
      
    ).then(
      text => {
        console.log(">Translated \""+e.target.value +"\" to German______________________"+text["de"]+"\"") // Handle here     /// Got the English translation
  //      let trans = text["de"];
        console.log("Now search for~~~~~~~~~~~~"+ text["de"]);
        console.log() 
        setSearch(text["nl"]);
        refetch({ search: text["nl"]});
                //  Give a warning if there are too few results
                try {
                  if (data.resources3D !== undefined){
                    if (data.resources3D.length<DATA_COUNT_ALERT_THRESDHOLD){
                    /*
                      alert("█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
                      + "\n (ง •̀_•́)ง  You may want to change your query or the targeted language")
                      */
                    document.getElementById("warning-box").textContent="█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
                    document.getElementById("suggest-box").textContent = "\n (ง •̀_•́)ง  You may want to change your query or the targeted language"
                    }
                  } else {
                    document.getElementById("suggest-box").display= false
                  }
                    console.log(data);
                  } catch (error) {}
  }
  );

  
}
// GERMAN
if (document.getElementById('Italian-check').checked){
  const url = TRANSLATION_SERVER +"/?content="+ e.target.value;
  fetch(url)
    .then(
      response => response.json() // .json(), .blob(), etc.
      
    ).then(
      text => {
        console.log(">Translated \""+e.target.value +"\" to Italian______________________: \""+text["it"]+"\"") // Handle here     /// Got the English translation
  //      let trans = text["it"];
        console.log("Now search for~~~~~~~~~~~~"+ text["it"]);
        console.log() 
        setSearch(text["it"]);
        refetch({ search: text["it"]});
                //  Give a warning if there are too few results
                try {
                  if (data.resources3D !== undefined){
                    if (data.resources3D.length<DATA_COUNT_ALERT_THRESDHOLD){
                    /*
                      alert("█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
                      + "\n (ง •̀_•́)ง  You may want to change your query or the targeted language")
                      */
                    document.getElementById("warning-box").textContent="█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
                    document.getElementById("suggest-box").textContent = "\n (ง •̀_•́)ง  You may want to change your query or the targeted language"
                    }
                  } else {
                    document.getElementById("suggest-box").display= false
                  }
                    console.log(data);
                  } catch (error) {}
  }
  );

  
}
// IRISH
if (document.getElementById('Irish-check').checked){
  const url = TRANSLATION_SERVER +"/?content="+ e.target.value;
  fetch(url)
    .then(
      response => response.json() // .json(), .blob(), etc.
      
    ).then(
      text => {
        console.log(">Translated \""+e.target.value +"\" to Irish______________________\""+text["ga"]+"\"") // Handle here     /// Got the English translation

        console.log("Now search for~~~~~~~~~~~~"+ text["ga"]);
        console.log() 
        setSearch(text["ga"]);
        refetch({ search: text["ga"]});
                //  Give a warning if there are too few results
                try {
                  if (data.resources3D !== undefined){
                    if (data.resources3D.length<DATA_COUNT_ALERT_THRESDHOLD){
                    /*
                      alert("█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
                      + "\n (ง •̀_•́)ง  You may want to change your query or the targeted language")
                      */
                    document.getElementById("warning-box").textContent="█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
                    document.getElementById("suggest-box").textContent = "\n (ง •̀_•́)ง  You may want to change your query or the targeted language"
                    }
                  } else {
                    document.getElementById("suggest-box").display= false
                  }
                    console.log(data);
                  } catch (error) {}
  }
  );

  
}
// SPANISH
if (document.getElementById('Spanish-check').checked){
  const url = TRANSLATION_SERVER +"/?content="+ e.target.value;
  fetch(url)
    .then(
      response => response.json() // .json(), .blob(), etc.
      
    ).then(
      text => {
        console.log(">Translated\" "+e.target.value +"\" to Spanish______________________\""+text["es"]+"\"" ) // Handle here     /// Got the English translation

        console.log("Now search for~~~~~~~~~~~~"+ text["es"]);
        console.log() 
        setSearch(text["es"]);
        refetch({ search: text["es"]});
        //  Give a warning if there are too few results
        try {
          if (data.resources3D !== undefined){
            if (data.resources3D.length<DATA_COUNT_ALERT_THRESDHOLD){
            /*
              alert("█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
              + "\n (ง •̀_•́)ง  You may want to change your query or the targeted language")
              */
            document.getElementById("warning-box").textContent="█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
            document.getElementById("suggest-box").textContent = "\n (ง •̀_•́)ง  You may want to change your query or the targeted language"
            }
          } else {
            document.getElementById("suggest-box").display= false
          }
            console.log(data);
          } catch (error) {}
        console.log(data);
  }
  );

  
}
// ANY SIMPLE
if (document.getElementById('AnyLangSim-check').checked){
  const url = TRANSLATION_SERVER +"/?content="+ e.target.value;
  fetch(url)
    .then(
      response => response.json() // .json(), .blob(), etc.
      
    ).then(
      text => {
        let anysim = text["en"]+ " "+ text["fr"]+ " "+ text["de"]+ " "+  text["es"]+ " "+ text["it"]+ " "+ text["nl"]+ " "+ text["pl"]+ " "+ text["ga"]
        console.log("Any-Simple______________________"+anysim) // Handle here     /// Got the English translation

        console.log("Now search for~~~~~~~~~~~~"+ anysim);
        console.log() 
        setSearch(anysim);
        refetch({ search: anysim});
        //  Give a warning if there are too few results
        try {
          if (data.resources3D !== undefined){
            if (data.resources3D.length<DATA_COUNT_ALERT_THRESDHOLD){
            /*
              alert("█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
              + "\n (ง •̀_•́)ง  You may want to change your query or the targeted language")
              */
            document.getElementById("warning-box").textContent="█▬█ █ ▀█▀  We found only " + data.resources3D.length + " records."
            document.getElementById("suggest-box").textContent = "\n (ง •̀_•́)ง  You may want to change your query or the targeted language"
            }
          } else {
            document.getElementById("suggest-box").display= false
          }
            console.log(data);
          } catch (error) {}

  }
  );

  
}
          // ANY LANGUAGE ADVANCE COMES HERE

  }


  
////////**********************************************************************End
  }

  return (
    
    <div>
      <center><img src="images/sharepair-logo.png" height="150" alt="Sharepair" class="center"></img></center>
        <center>
        <Fab color="secondary" variant="extended"  onClick={handleOpen}>
        <NavigationIcon sx={{ mr: 1 }} 
       
         />
        ORDP explorer
      </Fab> </center>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box
      sx={{
        
        maxWidth: '80%',
      }}
    >
                <center><img src="images/sharepair-logo.png" height="100" alt="Sharepair" class="center"></img></center>
                <p><h3>Targeted Language :</h3>
          <div class="container">
          |<input type="radio" value="Eng" name="language" onchange={onchange}id="English-check" defaultChecked/> <font size="4">  English </font>
          ┋<input type="radio" value="Fr" name="language" onchange={onchange} id="French-check"/> <font size="4">  Français </font>
          ┋<input type="radio" value="Fr" name="language" onchange={onchange} id="Spanish-check"/> <font size="4">  Español </font>
          ┋<input type="radio" value="Nl" name="language" id="Dutch-check"/> <font size="4"> Nederlands </font>
          ┋<input type="radio" value="De" name="language" id="German-check"/> <font size="4"> Deutsch </font>
          ┋<input type="radio" value="It" name="language" id="Italian-check"/> <font size="4"> Italiano </font>
          ┋<input type="radio" value="Ga" name="language" id="Irish-check"/> <font size="4"> Gaeilge </font>
          ┋<input type="radio" value="Other" name="language" id="AnyLangSim-check"/> <font size="3"> Any  (Simple) </font>
          ┋<input type="radio" value="Other" name="language" id="AnyLangAdv-check" disabled/> <font size="3">Any  (Advanced)</font> 
        </div>
        <hr></hr>
        <Stack sx={{ width: '100%' }} spacing={2}>
        
         
       <Alert severity="warning" id="warning-box">█▬█ █ ▀█▀ </Alert>
  
       <Alert severity="info"id="suggest-box">(ง •̀_•́)ง </Alert>
        </Stack>
        <TextField color="secondary" id="outlined-basic" label="Search" fullWidth variant="outlined" onChange={onchange}/>
          
        <Box/>
      

  
        </p>
        
        </Box>
            <Table data={data} error={error} loading={loading}/>
        </Box>
      </Modal>
    </div>
  );
}


// 
