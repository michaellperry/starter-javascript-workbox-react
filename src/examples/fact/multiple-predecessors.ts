(async () => {
    const person = await j.fact({
        type: 'Jinaga.User',
        publicKey: '---IF THIS WERE A REAL USER, THEIR PUBLIC KEY WOULD BE HERE---'
    });
    const post = await j.fact({
        type: 'Blog.Post',
        created: new Date(),
        author: person
    });
    const tagReact = await createTag('React');
    const tagCss = await createTag('CSS');
    const tagMicroFrontends = await createTag('Micro-Frontends');

    const tags = await j.fact({
        type: 'Blog.Post.Tags',
        post: post,
        tags: [tagReact, tagCss, tagMicroFrontends]
    });

    // Multiple predecessors are just an array of JSON objects.
    console.log(JSON.stringify(tags, null, 2));
})();

// I created this helper function to simplify the example.
// A real application would have a ton of these things.
async function createTag(name) {
    return await j.fact({
        type: 'Blog.Tag',
        name
    });
}
