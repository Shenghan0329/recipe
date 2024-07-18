
const data = (limit) => {
    return `query MyQuery {
        listRecipes(limit: ${limit}) {
          items {
            id
            cookTime
            accessories {
              imgUrl
              name
              weight
            }
            createdAt
            img
            level
            mainIngredient {
              imgUrl
              name
              weight
            }
            measure {
              des
              picture
              step
            }
            meauID
            method
            name
            peopleNum
            prepareTime
            scrapyTime
            tags
            taste
            techniques
            updatedAt
            url
            userID
          }
        }
      }`
} 

export {data};