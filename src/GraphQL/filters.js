
const filters = {
    beginner: "level: {contains: \"Novice\"}",
    single: "peopleNum: {eq: 1}",
    bake:"method: {eq: BAKE}",

    func: {
        data: recipe => recipe,
        easyData: (recipe) => recipe.level.contains("Novice"),
        singleData: (recipe) => recipe.peopleNum.eq(1),
        bakeData: (recipe) => recipe.method.eq("BAKE"),
    }
}

export default filters;