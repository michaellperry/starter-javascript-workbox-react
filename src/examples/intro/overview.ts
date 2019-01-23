async function dataIsStoredAsFacts() {
    console.log('In Jinaga, data is stored in terms of facts.');
    console.log('A fact is an immutable JSON object with a type:');

    const qedcode = await j.fact({
        type: 'Blog.Site',
        domain: 'qedcode.com'
    });

    console.log(JSON.stringify(qedcode, null, 2));
    console.log('');

    return qedcode;
}

async function factsHavePredecessors(qedcode) {
    console.log('A fact can refer to other facts.');
    console.log('When it does, those other facts are called *predecessors*:');

    const post = await j.fact({
        type: 'Blog.Post',
        createdAt: new Date(),
        site: qedcode
    });

    console.log(JSON.stringify(post, null, 2));
    console.log('');

    return post;
}

async function queryForSuccessors(qedcode) {
    console.log('To find a set of related facts, run a query.');
    console.log('The query starts from a predecessor, and uses a template function');
    console.log('to describe the shape of the desired successors:');

    const posts = await j.query(qedcode, j.for(postInSite));

    console.log(JSON.stringify(posts, null, 2));
    console.log('Notice how every time you run the code, a new post appears.');
    console.log('');
}

function postInSite(s) {
    return j.match({
        type: 'Blog.Post',
        site: s
    });
}

async function mutablePropertiesAreSuccessors(post) {
    console.log('Since facts are immutable, you can\'t store mutable properties in them.');
    console.log('The blog post as defined above has no title.');
    console.log('That\'s because the author should be able to change the title.');
    console.log('In Jianga, we represent mutable properties as successors');

    const title = await j.fact({
        type: 'Blog.Post.Title',
        value: 'Required Reading: Pat Helland, Immutability Changes Everything',
        post: post
    });

    console.log(JSON.stringify(title, null, 2));
    console.log('');

    return title;
}

async function changeThePropertyByCreatingANewFact(post, title) {
    console.log('To modify the value of a mutable property, you have to create a new fact.');
    console.log('This fact should refer back to the previous version.');
    console.log('We typically do this in an array:');

    const newTitle = await j.fact({
        type: 'Blog.Post.Title',
        value: 'I Really Think You Should Read Pat\'s Paper',
        post: post,
        prior: [title]
    });

    console.log(JSON.stringify(newTitle, null, 2));
    console.log('');
}

async function queryForTheCurrentValue(post) {
    console.log('To get the current value of a mutable property, you run a query.');
    console.log('That query searches for facts that do *not* appear as predecessors:');
    
    const title: any = await j.query(post, j.for(titleOfPost));

    console.log(JSON.stringify(title.map(t => t.value), null, 2));
    console.log('Notice that the result is returned as an array, but it only has the');
    console.log('recent version.');
    console.log('Can you think of a scenario in which you could get more than one value?');
    console.log('');
}

function titleOfPost(p) {
    return j.match({
        type: 'Blog.Post.Title',
        post: p
    }).suchThat(titleIsCurrent);
}

function titleIsCurrent(t) {
    return j.notExists({
        type: 'Blog.Post.Title',
        prior: [t]
    });
}

(async () => {
    const qedcode = await dataIsStoredAsFacts();
    const post = await factsHavePredecessors(qedcode);
    await queryForSuccessors(qedcode);
    const title = await mutablePropertiesAreSuccessors(post);
    await changeThePropertyByCreatingANewFact(post, title);
    await queryForTheCurrentValue(post);
})();