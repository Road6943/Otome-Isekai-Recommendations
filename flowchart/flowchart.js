function formatDataForOrgChart(stories, questions) {
    function makeOrgChartDataForNode(nodeName, nodeData, nodeType) {
        const retVal = {
            name: nodeName,
            title: nodeName,
            type: nodeType,
            children: [],
        };

        if (nodeType === "story") {
            retVal.anilist_id = nodeData.anilist_id;
        }
    
        for (const [choice, choiceData] of Object.entries(nodeData.choices)) {
            retVal.children.push({
                name: choice,
                title: choice,
                type: "choice",
                children: [
                    ...choiceData.stories.map(story => makeOrgChartDataForNode(story, stories[story], "story")),
                    ...choiceData.questions.map(question => makeOrgChartDataForNode(question, questions[question], "question"))
                ]
            })
            
        }
    
        return retVal;
    }

    return makeOrgChartDataForNode("Start", questions.Start);
}


function makeFlowchart(anilistData) {
    (function($) {
        $(function() {
            const orgChartData = formatDataForOrgChart(stories, questions);

            const nodeTemplate = function(data) {
                const hasAnilistData = ("anilist_id" in data) && (data.anilist_id !== null);
                let storyHTML = "";
                if (hasAnilistData) {
                    const storyData = anilistData[data.anilist_id].data.Media;
                    storyHTML = `
                        <p><a href="${storyData.siteUrl}">Anilist Link</a></p>
                        <br>
                        <img src="${storyData.coverImage.medium}">
                        <br>
                        <div><em>${storyData.genres.join(", ")}</em></div>
                        <p>${storyData.description}</p>
                    `;
                }

                return `
                    <!-- <div class="title">${data.name}</div> --><!-- The colored bars at the top -->
                    <div class="content ${data.type}">
                        <p><strong>${data.title}</strong></p>
                        ${storyHTML}
                    </div>
                `;
            }

            const OC = $('#chart-container').orgchart({
                data : orgChartData,
                nodeContent: 'title',
                nodeTemplate: nodeTemplate,
                //pan: true, // this removes the scrolling and might make the experience worse tbh
                verticalLevel: 2,
                visibleLevel: 2,

            });
        });
    })(jQuery);
}
