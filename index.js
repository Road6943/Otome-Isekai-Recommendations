"use strict";


async function main() {
    const configValidationErrorMsg = validateConfigs(stories, questions);
    if (configValidationErrorMsg !== "") {
        document.write( configValidationErrorMsg.replaceAll("\n", "<br>") );
        return;
    }

    const anilistData = {};
    for (const [story, storyData] of Object.entries(stories)) {
        if (storyData.anilist_id === null) {
            continue;
        }
        anilistData[storyData.anilist_id] = await getAnilistData(storyData.anilist_id);
    }
    
    // clear out the initial message telling users to wait for a few secs
    document.querySelector("#chart-container").innerHTML = "";

    makeFlowchart(anilistData);
}

main();
