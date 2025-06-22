const baseUrl = 'http://localhost:3000/posts';
const postList = document.getElementById('post-list');
const postDetail = document.getElementById('post-detail');
const newPostForm = document.getElementById('new-post-form');

function displayPosts() {
  fetch(baseUrl)
    .then(res => res.json())
    .then(posts => {
      postList.innerHTML = '';
      posts.forEach(post => {
        const item = document.createElement('div');
        item.textContent = post.title;
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => handlePostClick(post.id));
        postList.appendChild(item);
      });
    });
}

function handlePostClick(id) {
  fetch(`${baseUrl}/${id}`)
    .then(res => res.json())
    .then(post => {
      postDetail.innerHTML = `
        <h2>${post.title}</h2>
        <h4>By ${post.author}</h4>
        <p>${post.content}</p>
      `;
    });
}

function addNewPostListener() {
  newPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPost = {
      title: document.getElementById('new-title').value,
      author: document.getElementById('new-author').value,
      content: document.getElementById('new-content').value
    };

    // Append to DOM (for now, not persisting to db.json)
    const item = document.createElement('div');
    item.textContent = newPost.title;
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      postDetail.innerHTML = `
        <h2>${newPost.title}</h2>
        <h4>By ${newPost.author}</h4>
        <p>${newPost.content}</p>
      `;
    });
    postList.appendChild(item);
    newPostForm.reset();
  });
}

function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);
document.getElementById('edit-post-form').classList.remove('hidden');

document.getElementById('edit-title').value = post.title;
document.getElementById('edit-content').value = post.content;


const editForm = document.getElementById('edit-post-form');

editForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const updatedTitle = document.getElementById('edit-title').value;
  const updatedContent = document.getElementById('edit-content').value;

  // You’ll need to know which post to update—store its ID globally or in a data attribute
  fetch(`http://localhost:3000/posts/${currentPostId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: updatedTitle,
      content: updatedContent
    })
  })
  .then(res => res.json())
  .then(updatedPost => {
    // Re-display updated content, refresh list, etc.
    displayPosts();
    handlePostClick(updatedPost.id);
    editForm.classList.add('hidden');
  });
});

document.getElementById('cancel-edit').addEventListener('click', () => {
  document.getElementById('edit-post-form').classList.add('hidden');
});
