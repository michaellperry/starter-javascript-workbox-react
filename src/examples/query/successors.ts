(async () => {
    const person = await populateData();

    function postsByAuthor(a) {
        return j.match({
            type: 'Blog.Post',
            author: a
        });
    }
    
    const posts = await j.query(person, j.for(postsByAuthor));

    console.log(JSON.stringify(posts, null, 2));
})();

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

    return person;
}