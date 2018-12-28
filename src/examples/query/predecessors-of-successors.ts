(async () => {
    await populateData();

    function postTagsByTag(t) {
        return j.match({
            type: 'Blog.Post.Tags',
            tags: [t]
        });
    }

    function postForPostTag(pt) {
        pt.has('post');

        return j.match(pt.post);
    }

    const tag = createTag('REST');
    const posts = await j.query(tag, j
        .for(postTagsByTag)
        .then(postForPostTag));

    console.log(JSON.stringify(posts, null, 2));
})();

async function populateData() {
    const person = await j.fact({
        type: 'Jinaga.User',
        publicKey: '---IF THIS WERE A REAL USER, THEIR PUBLIC KEY WOULD BE HERE---'
    });

    await j.fact({
        type: 'Blog.Post.Tags',
        post: {
            type: 'Blog.Post',
            author: person,
            title: 'What is Historical Modeling?'
        },
        tags: [ createTag('Historical Modeling') ]
    });

    await j.fact({
        type: 'Blog.Post.Tags',
        post: {
            type: 'Blog.Post',
            author: person,
            title: 'Idempotency'
        },
        tags: [ createTag('Historical Modeling'), createTag('Math') ]
    });

    await j.fact({
        type: 'Blog.Post.Tags',
        post: {
            type: 'Blog.Post',
            author: person,
            title: 'What Two Generals Can Teach Us About Web APIs'
        },
        tags: [ createTag('Historical Modeling'), createTag('REST') ]
    });

    return person;
}

function createTag(name) {
    return {
        type: 'Blog.Tag',
        name
    };
}