import { useParams, useRoutes } from "react-router-dom";
import { Typography, Row, Col } from "antd";
import Image from "../../Components/Image";
import TextList from "../../Components/List/TextList";
import IngredientListCard from "../../Components/Card/IngredientListCard";
import StepCard from "../../Components/Card/StepCard";
import recipes from "../../data/recipes.json";
import { useState, useEffect } from "react";
import { DataStore } from "aws-amplify/lib-esm";
import { Recipes, User } from "../../models";

const { Title, Text } = Typography;

const styles = {
  middle: { fontSize: "1.2rem" },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
    marginBottom: "20px",
  },
  textBox: { width: "33.3%", fontSize: "1.2em", textAlign: "left" },
};
const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState({});
  const [scrapyTime, setScrapyTime] = useState("");
  const [func, setFunc] = useState("");

  useEffect(() => {
    console.log(id);
    DataStore.query(Recipes, id).then((result) => {
      console.log(result);
      setRecipe(result);
    });
  }, []);
  useEffect(() => {
    const tags = recipe?.tags;
    console.log(tags);
    let f = "";
    if (tags) {
      for (let i = 0; i < tags.length; i++) {
        f = f + tags[i] + " | ";
        if (i === 3) {
          break;
        }
      }

      setFunc(f);
    }
    let time;
    try {
      time = recipe?.scrapyTime?.subString(0, 10);
    } catch (e) {
      time = "Default Time";
    }
    setScrapyTime(time);
    setUserID(recipe?.userID);
  }, [recipe]);
  useEffect(() => {
    DataStore.query(User, (item) => item.id.eq(userID)).then((results) => {
      setUser(results[0]);
    });
  }, [userID]);

  return (
    <>
      <Title level={1}>{recipe?.name}</Title>
      <Text strong style={styles.middle}>
        Author:{" "}
      </Text>
      <Text style={styles.middle}>{user?.name}</Text>
      <Image
        width={400}
        height={400}
        src={recipe?.img}
        margins={[30, 30, 0, 0]}
      />
      <Text strong style={styles.middle}>
        Benefits:{" "}
      </Text>
      <Text style={styles.middle}>{func ? func : "It is delicious"}</Text>

      <div style={styles.container}>
        <div style={styles.textBox}>
          <b>Prepare Time </b>
          {recipe?.prepareTime}
        </div>
        <div style={styles.textBox}>
          <b>Cook Time </b>
          {recipe?.cookTime}
        </div>
        <div style={styles.textBox}>
          <b>Servings </b>
          {recipe?.peopleNum}
        </div>
      </div>

      <Title level={3}>{"Ingredients"}</Title>
      <Row>
        <Col span={12} align="left">
          <TextList
            style={{ marginRight: 20 }}
            data={recipe?.mainIngredient || []}
            header="Materials"
            listItem={IngredientListCard}
          />
        </Col>
        <Col span={12} align="right">
          <TextList
            style={{}}
            data={recipe?.accessories || []}
            header="Accessories"
            listItem={IngredientListCard}
          />
        </Col>
      </Row>

      <Title level={3}>Steps</Title>
      <TextList data={recipe?.measure || []} listItem={StepCard} />

      <Title level={3}>Techniques</Title>
      <Text style={styles.middle}>{recipe?.techniques}</Text>
    </>
  );
};

export default Recipe;
