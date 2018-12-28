(async () => {
    const person = await populateData();

    function postsByAuthor(a) {
        return j.match({
            type: 'Blog.Post',
            author: a
        });
    }
    
    const posts = await j.query(person, j.for(postsByAuthor));

    // Notice how all of these posts have the same author.
    console.log(JSON.stringify(posts, null, 2));
})();

// I put some data in here for you to query.
// I even put in a post from a different user so you can see that it's not returned.
async function populateData() {
    const person = await j.fact({
        type: 'Jinaga.User',
        publicKey: '---IF THIS WERE A REAL USER, THEIR PUBLIC KEY WOULD BE HERE---'
    });

    await j.fact({
        type: 'Blog.Post',
        author: person,
        title: 'What is Historical Modeling?'
    });

    await j.fact({
        type: 'Blog.Post',
        author: person,
        title: 'Idempotency'
    });

    await j.fact({
        type: 'Blog.Post',
        author: person,
        title: 'What Two Generals Can Teach Us About Web APIs'
    });

    await j.fact({
        type: 'Blog.Post',
        author: {
            type: 'Jinaga.User',
            publicKey: '---SOME OTHER USER---'
        },
        title: 'Pandas Eating Things'
    });

    return person;
}