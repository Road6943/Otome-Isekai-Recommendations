// for loop through all question[] and story[] to make sure that theres no typos and that
// every string actually exists as a key of the question/story dict
function validateConfigs(stories, questions) {
    const validateChoices = (obj) => {
        for (const key in obj) {
            const choices = obj[key].choices;
            for (const c in choices) {
                for (const question of choices[c].questions) {
                    if (!(question in questions)) {
                        const errorMsg = `This question:\n${question}\nfrom this choice:\n${c}\nof\n${key}\nwas not found in questions`;
                        console.error(errorMsg);
                        return errorMsg;
                    }
                }
                for (const story of choices[c].stories) {
                    if (!(story in stories)) {
                        const errorMsg = `This story:\n${story}\nfrom this choice:\n${c}\nof\n${key}\nwas not found in stories`;
                        console.error(errorMsg);
                        return errorMsg;
                    }
                }
            }
        }
        return "";
    };

    const storiesErrorMsg = validateChoices(stories);
    if (storiesErrorMsg !== "") {
        return storiesErrorMsg;
    }

    const questionsErrorMsg = validateChoices(questions);
    if (questionsErrorMsg !== "") {
        return questionsErrorMsg;
    }

    console.log("Config validation complete. Everything looks good!");
    return "";
}
