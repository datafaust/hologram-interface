import React, {useState} from 'react';
import classes from './app.module.css'
import sun from './assets/pics/sol.png'
import genre from './assets/pics/girlPointing.png'
import song from './assets/pics/guyListening.png'
import search from './assets/pics/nuclearCowboy.png'
import Processing from './Processing';


const api = "http://192.168.0.128:5000"
//const api = "songapi:5000"

const App = () => {

  const [request, setRequest] = useState([]);
  const [songColor, setsongColor] = useState("#b29700");
  const [genreColor, setgenreColor] = useState("#b29700");
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState([])


  const getSong = async () => {
    console.log('getting song stuff...')
    setsongColor("#aec6cf");
    //setLoading(true)

    let response = await fetch(`${api}/recognize`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        console.log(res.text)
        //console.log(res["videos"][0])
        setName(res.text)
        return res.text
      })
      .catch((error) => {
        console.log(error)
      });

    if(response) {
      setsongColor("#b29700")
      //setLoading(false)
    } 
  }

  const getGenre = async () => {
    console.log('getting song stuff...')
    setgenreColor("#aec6cf");

    let response = await fetch(`${api}/recognize`)
      .then(res => res.json())
      .then(res => {
        console.log(res["videos"][0])
        return res["videos"][0]["url_suffix"]
      })
      .catch((error) => {
        console.log(error)
      });

    if(response) {
      console.log(response)
      setgenreColor("#b29700")
    } 
  } 



  return (
    <div className={classes.container}>
  
        <div>
        {/** BRAND */}
        <div className={classes.brandContainer}>
          <div className={classes.brandMain}>
            <img src={sun} height={80} width={80} />
            <p>FAUSTTEK INDUSTRIES</p>
          </div>
          <p className={classes.brandSub}>For A Brighter Tomorrow</p>
        </div>



        <br />
        {/** OPTIONS */}
        {/* <div className={classes.title}>Choose your mode below</div> */}
        <div 
        //className={classes.choiceContainer}
        >
          <div onClick={()=>getSong()} className={classes.choice} style={{backgroundColor: songColor}}>
            <img className={classes.choiceImg} style={{marginTop:'5%'}} src={song} height={180} width={180} />
            <p className={classes.choiceText}>RECOGNIZE SONG</p>
          </div>
          
        </div>

           {name ? <div className={classes.name}>{name}</div> : <div></div>}
          
        </div> 
      
    </div>
  );
};

export default App;



/**
 * 
 * 
 * 
 *           <div onClick={()=>getGenre()} className={classes.choice} style={{backgroundColor: genreColor }}>
          <img className={classes.choiceImg} src={genre} height={190} width={150} />
            <p className={classes.choiceText}>RECOGNIZE GENRE</p>
          </div>
          <div onClick={()=>getGenre()} className={classes.choice} style={{backgroundColor: genreColor }}>
          <img className={classes.choiceImg} src={search} height={190} width={270} style={{ marginLeft: "-2%"}} />
            <p className={classes.choiceText}>EXPLORE</p>
          </div>
 */