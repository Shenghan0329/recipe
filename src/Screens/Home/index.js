import { Typography } from "antd";
import Gallery from "../../Components/Gallery";
import RecipeList from "../../Components/List/RecipeList";
import { useDataContext } from "../../Contexts/DataContext";
import { useState, useEffect } from "react";
import { storeImg,  getFileFromUrl} from "../../Helpers/store";
const { Title } = Typography;
// 2117
const Home = () => {
  const {
    data,
    easyData,
    singleData,
    bakeData,
  } = useDataContext();
  const [flag,setFlag] = useState(false);
  useEffect(()=>{
    console.log(data);
    if(data.length>0 && flag==true) {
      // let f = getFileFromUrl(data[2]?.img);
      // for(let i = 0; i<data.length; i++){
      //   storeImg(data[i]);
      // }
      // let url = "https://i3.meishichina.com/atta/recipe/2018/02/04/20180204151772976277994310735710.JPG?x-oss-process=style/p800";
      // url = "https://i3.meishichina.com/atta/recipe/2018/02/04/20180204151772976277994310735710.JPG"
      // let f = getFileFromUrl(url);
      // scrape(1639,1700,data);
      // scrape(1701,1750,data);
      // scrape(1751,1800,data);
      // scrape(1801,1850,data);
      // scrape(1851,1900,data);
      // scrape(1901,1950,data);
      // scrape(1951,2000,data);
      // scrape(501,1000,data);
      // scrape(1001,1500,data);
      // scrape(1501,2000,data);
      // scrape(2001,2500,data);
      // scrape(2501,3000,data);
      // scrape(3001,3500,data);
      // scrape(3500,3964,data);
    }
  },[flag])
  function f(){
    setFlag(!flag);
  }
  async function scrape(left,right,data){
    for(let i=left; i<right; i++){
      await storeImg(data[i]);
    }
  }
  return (
    <>
      <button onClick={f}>Start Scraping Images</button>
      <Title level={2}>Today's Favourites</Title>
      <Gallery data={data.slice(0,8)} />
      <Title level={2}>Beginners Friendly</Title>
      <RecipeList data={easyData} pageSize={6} />
      <Title level={2}>Enjoy Alone</Title>
      <RecipeList data={singleData} pageSize={6} />
      <Title level={2}>Baking</Title>
      <RecipeList data={bakeData} pageSize={6} />
      <Title level={2}>All Recipes</Title>
      <RecipeList data={data} pageSize={6} />
    </>
  );
};

export default Home;
