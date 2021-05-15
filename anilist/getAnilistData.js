async function getAnilistData(anilist_id) {
    // Here we define our query as a multi-line string
    // Storing it in a separate .graphql/.gql file is also possible
    const query = `
        query ($id: Int) { # Define which variables will be used in the query (id)
            Media (id: $id, type: MANGA) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
                siteUrl
                genres
                coverImage {
                    medium
                }
                description(asHtml: true)
            }
        }
    `;

    // Define the config we'll need for our Api request
    const url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    id: anilist_id
                }
            })
        };

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    // Make the HTTP Api request
    const data = await fetch(url, options)
        .then(handleResponse)
        .catch(err => {console.error(err)});

    console.log(data)

    return data;
}
