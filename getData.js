async function getData(
    sheetURL,
    nameCol, // column with story names or question text
    anilistIDCol = null, // only used for Stories
    answerChoiceCol,
    leftmostNextCol, // this column and everything rightwards hold the next steps after clicking an answer choice
) {
    /*
        Ignore first two rows, actual data starts from row 3
        layout is complicated to explain, just look at the actual sheet
    */
    const sheetURL = "https://spreadsheets.google.com/feeds/cells/1N0LXVTNCtFBf_lD_TsU3IZBolMQHqJiHHYFANP1r9js/1/public/basic?alt=json"
    const jsonResponse = await fetch(sheetURL).then(r => r.json());
    const data = jsonResponse.feed.entry;

    const StoriesData = {};

    for (const item of data) {
        const cell = item.title.$t; // something like A3 or B2
        const column = cell[0];
        const row = parseInt( cell.slice(1) );
        

        // Story Name in column A

        // Anilist ID in column B

        // Transition text in column C (text on "arrows", aka the answer choices you pick to go to the next step)

        // Next in column D and everything rightwards (The next steps after the current story)
        
        console.log(column + " - " + row)
        console.log(item)
    }
}

getStoriesData()
