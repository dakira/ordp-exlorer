import * as React from 'react';
import Box from '@mui/material/Box'; 
import { render } from 'react-dom'; //Added
import { CheckBox } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { gql } from "@apollo/client";
import { useQuery } from '@apollo/client';
import Table from './table';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';


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
  const [search, setSearch] = React.useState('nokia');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, error, data, refetch  } = useQuery(GET_GEN_3, {
    variables: { search: "nokia" },
  });
  console.log(data);
// check this https://www.apollographql.com/docs/react/data/queries
   let onchange = (e)=>{
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
if (document.getElementById('English-check').checked){
  const url = "http://localhost:2999/?content="+ e.target.value;
  fetch(url)
    .then(
      response => response.json() // .json(), .blob(), etc.
      
    ).then(
      text => {
        console.log("English______________________"+text["en"]) // Handle here     /// Got the English translation
        let en_trans = text["en"];
        console.log("Now search for~~~~~~~~~~~~"+ en_trans);
        console.log() //////////////// The translation is here:IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII<!><!>IIIIIIIIIIIIIIIIII
        setSearch(en_trans);
        refetch({ search: en_trans});
        console.log(data);
  }
  );

  
}
if (document.getElementById('French-check').checked){
  const url = "http://localhost:2999/?content="+ e.target.value;
  fetch(url)
    .then(
      response => response.json() // .json(), .blob(), etc.
      
    ).then(
      text => {
        console.log("French______________________"+text["fr"]) // Handle here     /// Got the English translation
        let fr_trans = text["fr"];
        console.log("Now search for~~~~~~~~~~~~"+ fr_trans);
        console.log() //////////////// The translation is here:IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII<!><!>IIIIIIIIIIIIIIIIII
        setSearch(fr_trans);
        refetch({ search: fr_trans});
        console.log(data);
  }
  );

  
}
  
////////**********************************************************************End
  }

  return (
    <div>
        <Fab color="secondary" variant="extended"  onClick={handleOpen}>
        <NavigationIcon sx={{ mr: 1 }} 
       
         />
        ORDP explorer
      </Fab>
      
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
        <TextField color="secondary" id="outlined-basic" label="Search" fullWidth variant="outlined" onChange={onchange}/>
        <Box/>
      
          <p><h3>Language options:</h3>
        <Checkbox {...'English'} defaultChecked id="English-check"/> English
        <Checkbox {...'French'} id="French-check"/> Français
        <Checkbox {...'Dutch'}  id="Dutch-check"/> Nederlands
        <Checkbox {...'German'}  id="German-check"/> Deutsch
        <Checkbox {...'AnyLang'}  checked id="Any-check"/> Any languages A..文
        
        </p>
        
        </Box>
            <Table data={data} error={error} loading={loading}/>
        </Box>
      </Modal>
    </div>
  );
}
async function get_translations(keyword) {
  // Get all translations
  const res = await fetch("https://libretranslate.com/translate", {
	method: "POST",
	body: JSON.stringify({
		q: keyword,
		source: "en",
		target: "nl",
		format: "text",
		api_key: ""
	}),
	headers: { "Content-Type": "application/json" }
});
console.log("----------------------------------------");
console.log(await res.json());
}

